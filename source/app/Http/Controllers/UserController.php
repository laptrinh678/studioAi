<?php

namespace App\Http\Controllers;

use App\Models\SceneModel;
use App\Repositories\AiGenerateRepository;
use App\Repositories\BackgroundRepository;
use App\Repositories\ImageDecorateRepository;
use App\Repositories\ShareAssetRepository;
use App\Repositories\UserAssetRepository;
use App\Repositories\UserLogRepository;
use App\Repositories\UserRepository;
use App\Traits\FileManagement;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use FileManagement;

    function __construct(
        protected UserRepository $userRepository,
        protected UserAssetRepository $userAssetRepository,
        protected BackgroundRepository $backgroundRepository,
        protected ImageDecorateRepository $imageDecorateRepository,
        protected AiGenerateRepository $aiGenerateRepository,
        protected ShareAssetRepository $shareAssetRepository,
        protected UserLogRepository $userLogRepository,
    )
    {
    }

    public function getImageAsset()
    {
        $session = session('user_logged_in');
        $email = $session['email'];
        $user = $this->userRepository->where('email', $email)->first();
        $userAssets = $this->userAssetRepository
            ->where('user_id', $user['id'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($userAssets);
    }

    public function upload(Request $request)
    {
        try {
            $session = session('user_logged_in');
            $email = $session['email'];
            $user = $this->userRepository->where('email', $email)->first();
            $dataAll = $request->all();

            // Xóa những file bị loại bỏ
            if (!empty($dataAll['remove_files'])) {
                $files = $this->userAssetRepository->whereIn('_id', $dataAll['remove_files'])->get()->toArray();
                $imagesPath = [];
                foreach ($files as $value) {
                    $imagesPath[] = $value['asset_path'];
                    $dataExplode = explode('/', $value['asset_path']);
                    $this->deleteImage(end($dataExplode));
                }

                $this->backgroundRepository->updateMultiple('background_path', $imagesPath, ['background_path' => '']);
                $this->imageDecorateRepository->updateMultiple('image_path', $imagesPath, ['image_path' => '']);
                $this->userAssetRepository->whereIn('_id', $dataAll['remove_files'])->delete();
            }

            // Upload những file mới
            if (!empty($dataAll['files'])) {
                foreach ($dataAll['files'] as $file) {
//                    $fileName = uniqid().'.'.$file->getClientOriginalExtension();
//                    $path = $this->uploadFile($file, $fileName);
                    $path = $this->uploadFile($file, '');
                    $this->userAssetRepository->create([
                        'user_id' => $user['id'],
                        'type' => 'image',
//                        'asset_path' => config('app.sub_domain_minio').$path,
                        'asset_path' => str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $path),
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                    ]);
                }
            }

            return response()->json(['message' => 'File successfully uploaded']);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function shareImage(Request $request)
    {
        $file = $request->file('image');
        if (empty($file)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        $path = $this->uploadFile($file, '');
        $convertPath = str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $path);

        return response()->json(['path' => $convertPath]);
    }

    public function shareGenerated(Request $request)
    {
        new SceneModel();
        // Save file result
        $file = $request->file('image');
        $path = $this->uploadFile($file, '');
        $convertPath = str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $path);
        $dataAll = json_decode($request->input('params'), true);
        if ($dataAll['type'] != 'text-to-image') {
            // Save file upload
            $fileUpload = $request->file('image_upload');
            $pathFileUpload = $this->uploadFile($fileUpload, '');
            $convertPathFile = str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $pathFileUpload);
            $dataAll['image_upload'] = $convertPathFile;
        }

        $session = session('user_logged_in');
        $email = $session['email'];
        $user = $this->userRepository->where('email', $email)->first();
        $this->shareAssetRepository->create([
            'user_id' => $user['id'],
            'user_name' => $user['name'],
            'type' => $dataAll['type'],
            'reused' => 0,
            'views' => 0,
            'likes' => 0,
            'shares' => 0,
            'attrs' => json_encode($dataAll),
            'status' => 1,
            'result_path' => $convertPath,
            'thumbnail_path' => $convertPath
        ]);

        return response()->json(['message' => 'Share successfully']);
    }

    public function getShareGenerated()
    {
        $user = user_logged_in();
        $dataShared = $this->shareAssetRepository->orderBy('created_at', 'desc')->limit(8)->get();
        $shareId = $dataShared->pluck('_id')->toArray();
        $userLogs = $this->userLogRepository->where('user_id', $user['id'])->whereIn('share_asset_id', $shareId)->get()->toArray();
        $convertUserLogs = [];
        foreach ($userLogs as $item) {
            $convertUserLogs[$item['share_asset_id']][] = $item['action'];
        }

        // Merge 2 array
        $result = [];
        $dataShared = $dataShared->toArray();
        foreach ($dataShared as $key => $value) {
            $result[] = array_merge($value, ['action' => $convertUserLogs[$value['_id']] ?? []]);
        }

        return response()->json($result);
    }

    public function interaction(Request $request)
    {
        $listAction = [
            'reuse' => 'reused',
            'view' => 'views',
            'like' => 'likes',
            'share' => 'shares',
        ];
        $user = user_logged_in();
        $shareId = $request->input('share_id') ?? null;
        $action = $request->input('action') ?? 'view';
        if (!empty($shareId) && array_key_exists($action, $listAction)) {
            $this->shareAssetRepository->getById($shareId)->increment($listAction[$action]);
            $this->userLogRepository->createOrUpdate(
                ['user_id' => $user['id'], 'share_asset_id' => $shareId, 'action' => $action],
                ['action' => $action]
            );
        }

        return response()->json(['message' => 'Successfully']);
    }
}
