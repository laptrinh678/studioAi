<?php

namespace App\Http\Controllers;

use App\Repositories\TransactionLogRepository;
use App\Repositories\UserRepository;
use App\Traits\PaymentManagement;
use App\Traits\PaymentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    use PaymentManagement, PaymentResponse;

    /**
     * Những tính năng liên quan đến xử lý hình ảnh
     *
     * @var int
     */
    protected int $genImage = 1;

    /**
     * Những tính năng tạo video từ mc
     *
     * @var int
     */
    protected int $genMC = 2;

    /**
     * Tất cả các tính năng hiện có
     *
     * @var int
     */
    protected int $allFeature = 9;

    /**
     * Trạng thái xử lý mua các tính năng
     */
    protected string $activate = 'ACTIVATE';
    protected string $extend = 'EXTEND';
    protected string $cancel = 'CANCEL';

    /**
     * Lưu thông tin thanh toán
     *
     * @var array
     */
    protected array $expiryDateBefore = [];
    protected array $expiryDateAfter = [];

    /**
     * Thông tin người dùng
     */
    protected string $email;
    protected array $originalPermission = [];

    protected UserRepository $userRepository;
    protected TransactionLogRepository $transactionLogRepository;

    public function __construct(
        UserRepository $userRepository,
        TransactionLogRepository $transactionLogRepository,
    )
    {
        $this->userRepository = $userRepository;
        $this->transactionLogRepository = $transactionLogRepository;
    }

    public function getUserByEmail(Request $request, $email): \Illuminate\Http\JsonResponse
    {
        try {
            if (!$this->isPartner($request->header('Partner-Id'))) {
                return response()->json(['message' => 'partner id is invalid'], 400);
            }

            $user = $this->userRepository->where('email', $email)->get();
            if ($user->isEmpty()) {
                return response()->json(['message' => 'User not found'], 404);
            }

            return response()->json(['user' => $user->first()]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server Error'], 500);
        }
    }

    public function syncUser(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            if (!$this->isPartner($request->header('Partner-Id'))) {
                return response()->json(['message' => 'partner id is invalid'], 400);
            }

            $dataRequest = $request->all();
            if (empty($dataRequest['email'])) {
                return response()->json(['message' => 'Email is required'], 400);
            }

            $user = $this->userRepository->where('email', $dataRequest['email'])->get();
            if ($user->isEmpty()) {
                $this->userRepository->create([
                    "email" => $dataRequest['email'],
                    "name" => $dataRequest['name'] ?? "",
                    "phone_number" => $dataRequest['phone_number'] ?? "",
                    "role" => "user",
                    "permissions" => json_encode([
                        "textToImage" => ["status" => false, "start_date" => "", "end_date" => ""],
                        "imageToImage" => ["status" => false, "start_date" => "", "end_date" => ""],
                        "virtualHuman" => ["status" => false, "start_date" => "", "end_date" => ""],
                        "virtualHumanV2" => ["status" => false, "start_date" => "", "end_date" => ""],
                    ])
                ]);
            }

            return response()->json(['message' => 'Success']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server Error'], 500);
        }
    }

    public function payment(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // Kiểm tra partner id truyền lên header
            if ($request->header('Partner-Id') != config('app.partner_id')) {
                return response()->json(['code' => 11, 'message' => 'partner id is invalid', 'data' => []], 400);
            }

            // Kiểm tra thông tin request
            $dataRequest = $request->all();
            $validate = $this->validateRequest($request);
            if ($validate->fails()) {
                return $this->errorResponse($this->getErrorMessage($validate->getMessageBag()->getMessages()), []);
            }

            // Kiểm tra user có tồn tại hay không
            $user = $this->userRepository->where('email', $dataRequest['email'])->get();
            if ($user->isEmpty()) {
                return response()->json(['code' => 10, 'message' => 'user does not exist', 'data' => []], 400);
            }

            // Lưu lại thông tin ban đầu của user
            $this->originalPermission = json_decode($user->first()->permissions, true);

            $this->email = $dataRequest['email'];
            $dataRes = [];
            foreach ($dataRequest['requests'] as $value) {
                // Xử lý validate các trường thông tin
                $validate = $this->validateRequestFields($value);
                if (is_array($validate)) {
                    // Rollback data nếu có lỗi xảy ra
                    $this->userRepository->updateMultiple('email', [$this->email], ['permissions' => json_encode($this->originalPermission)]);
                    return $this->successResponse($validate);
                }

                // Xử lý với request_type tương ứng
                if ($value['request_type'] == $this->activate) {
                    $dataRes[] = $this->handleActivate($value);
                } else if ($value['request_type'] == $this->extend) {
                    $dataRes[] = $this->handleExtend($value);
                } else if ($value['request_type'] == $this->cancel) {
                    $dataRes[] = $this->cancel($value);
                }
            }

            // Nếu có bất kì giao dịch nào bị lỗi => rollback data
            $errorRes = array_filter($dataRes, function ($result) {
                return $result['code'] != 0;
            });
            if (!empty($errorRes)) {
                $this->userRepository->updateMultiple('email', [$this->email], ['permissions' => json_encode($this->originalPermission)]);
                $this->expiryDateBefore = $this->expiryDateAfter = [json_encode($this->originalPermission)];
                $dataRes = reset($errorRes);
            } else {
                $dataRes = reset($dataRes);
            }

            // Lưu lại thông tin giao dịch
            $this->saveTransactionLog($dataRequest, $dataRes);

            return $this->successResponse($dataRes);
        } catch (\Exception $e) {
            Log::error('Payment fail: ' . $e->getMessage());
            return response()->json([
                'code' => 13,
                'message' => 'internal server error',
                'data' => []
            ], 500);
        }
    }

    /**
     * Kích hoạt chức năng tương ứng
     *
     * @param $data
     * @return array
     */
    protected function handleActivate($data): array
    {
        try {
            // Kiểm tra thông tin expiry_date
            if (empty($data['expiry_date'])) {
                return $this->errorField('expiry_date', trans('validation.expiry_date.empty'), $data['request_id']);
            }

            // Kiểm tra định dạng expiry_date => Y/m/d H:i:s
            $formatDate = \DateTime::createFromFormat('Y/m/d H:i:s', $data['expiry_date']);
            if (!$formatDate || $formatDate->format('Y/m/d H:i:s') != $data['expiry_date']) {
                return $this->errorField('expiry_date', trans('validation.expiry_date.invalid'), $data['request_id']);
            }

            // Kiểm tra thông tin expiry_date phải > hiện tại
            $expiryDate = Carbon::parse($data['expiry_date'])->format('Y/m/d H:i:s');
            if (Carbon::now()->diff($expiryDate)->invert == 1) {
                return $this->errorField('expiry_date', trans('validation.expiry_date.invalid'), $data['request_id']);
            }

            // Kiểm tra gói dịch vụ đã được kích hoạt hay chưa
            $user = $this->userRepository->where('email', $this->email)->first();
            $permissions = json_decode($user['permissions'], true);
            $fields = $this->getFieldByPackageType($data['package_type']);
            foreach ($fields as $field) {
                if ($permissions[$field]['status']) {
                    return $this->errorField('package', trans('validation.package.activate'), $data['request_id']);
                }

                $permissions[$field]['status'] = true;
                $permissions[$field]['start_date'] = Carbon::now()->format('Y/m/d H:i:s');
                $permissions[$field]['end_date'] = $data['expiry_date'];
            }

            // Lưu thời gian hết hạn trước và sau khi update
            $this->expiryDateBefore[] = $user['permissions'];
            $this->expiryDateAfter[] = json_encode($permissions);

            // Xử lý kích hoạt gói
            $this->userRepository->updateMultiple('email', [$this->email], ['permissions' => json_encode($permissions)]);

            return $this->successRequest($data['request_id']);
        } catch (\Exception $e) {
            Log::error(sprintf('Activate request_id %s fail: %s', $data['request_id'], $e->getMessage()));
            return $this->errorRequest($data['request_id']);
        }}

    /**
     * Gia hạn chức năng tương ứng
     *
     * @param $data
     * @return array
     */
    protected function handleExtend($data): array
    {
        try {
            // Kiểm tra extend_month phải > 0
            if (empty($data['extend_month'])) {
                return $this->errorField('extend_month', trans('validation.extend_month.empty'), $data['request_id']);
            }

            if (gettype($data['extend_month']) != 'integer' || $data['extend_month'] <= 0) {
                return $this->errorField('extend_month', trans('validation.extend_month.invalid'), $data['request_id']);
            }

            // Kiểm tra xem gói đã được kích hoạt hay chưa
            $user = $this->userRepository->where('email', $this->email)->first();
            $permissions = json_decode($user['permissions'], true);
            $fields = $this->getFieldByPackageType($data['package_type']);
            foreach ($fields as $field) {
                if (!$permissions[$field]['status']) {
                    return $this->errorField('package', trans('validation.package.not_active'), $data['request_id']);
                }

                // Nếu thời gian hết hạn < hiện tại => Lấy thời điểm hiện tại + thời gian thêm
                // Nếu thời gian hết hạn >= hiện tại => Lấy thời gian hết hạn + thời gian thêm
                $diffTime = Carbon::parse($permissions[$field]['end_date'])->diff(Carbon::now())->invert;
                // Thời gian > hiện tại
                if ($diffTime == 1) {
                    $newExpiryData = Carbon::parse($permissions[$field]['end_date'])->addMonths($data['extend_month'])->format('Y/m/d H:i:s');
                } else {
                    $newExpiryData = Carbon::now()->addMonths($data['extend_month'])->format('Y/m/d H:i:s');
                }

                $permissions[$field]['end_date'] = $newExpiryData;
            }

            // Lưu thời gian hết hạn trước và sau khi update
            $this->expiryDateBefore[] = $user['permissions'];
            $this->expiryDateAfter[] = json_encode($permissions);

            // Xử lý gia hạn gói dịch vụ
            $this->userRepository->updateMultiple('email', [$this->email], ['permissions' => json_encode($permissions)]);

            return $this->successRequest($data['request_id']);
        } catch (\Exception $e) {
            Log::error(sprintf('Extend request_id %s fail: %s', $data['request_id'], $e->getMessage()));
            return $this->errorRequest($data['request_id']);
        }
    }

    /**
     * Hủy các tính năng được chỉ định
     *
     * @param $data
     * @return array
     */
    public function cancel($data): array
    {
        try {
            $user = $this->userRepository->where('email', $this->email)->first();
            $permissions = json_decode($user['permissions'], true);
            $fields = $this->getFieldByPackageType($data['package_type']);
            $update = [];
            $expiryDateBefore = [];
            foreach ($fields as $field) {
//                $update[$field] = null;
//                $expiryDateBefore[$field] = $user[$field];
                $permissions[$field]['status'] = false;
            }

            // Lưu thời gian hết hạn trước và sau khi update
//            $this->expiryDateBefore[] = $expiryDateBefore;
//            $this->expiryDateAfter[] = $update;
            $this->expiryDateBefore[] = $user['permissions'];
            $this->expiryDateAfter[] = json_encode($permissions);

//            if (!empty($update)) {
//                $this->userRepository->updateMultiple('email', [$this->email], $update);
                $this->userRepository->updateMultiple('email', [$this->email], ['permissions' => json_encode($permissions)]);
//            }

            return $this->successRequest($data['request_id']);
        } catch (\Exception $e) {
            Log::error(sprintf('Cancel request_id %s fail: %s', $data['request_id'], $e->getMessage()));
            return $this->errorRequest($data['request_id']);
        }
    }

    /**
     * Lưu lịch sử giao dịch vào DB
     *
     * @param $data
     * @param $res
     * @return void
     */
    protected function saveTransactionLog($data, $res): void
    {
        try {
            $this->transactionLogRepository->create([
                'email' => $data['email'],
                'transaction_id' => $data['transaction_id'],
                'requests' => json_encode($data),
                'expiry_dates_before' => json_encode($this->expiryDateBefore),
                'expiry_dates_after' => json_encode($this->expiryDateAfter),
                'response' => json_encode($res),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        } catch (\Exception $e) {
            Log::error('Save transaction log fail: ' . $e->getMessage());
        }
    }
}
