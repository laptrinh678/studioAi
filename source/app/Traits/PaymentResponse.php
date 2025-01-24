<?php

namespace App\Traits;

trait PaymentResponse
{
    protected function getErrorCodeByField($field): int
    {
        $codes = [
            'request_id' => 1,
            'request_type' => 2,
            'package_type' => 3,
            'expiry_date' => 4,
            'extend_month' => 4,
            'package' => 5,
        ];

        return $codes[$field];
    }

    public function successResponse($data): \Illuminate\Http\JsonResponse
    {
        $response = [
            'code' => 0,
            'message' => 'success',
            'data' => $data
        ];

        return $this->formatResponse($response, 200);
    }

    public function errorResponse($message, $data): \Illuminate\Http\JsonResponse
    {
        $response = [
            'code' => 3,
            'message' => $message,
            'data' => $data
        ];

        return $this->formatResponse($response, 422);
    }

    public function formatResponse($response, $statusCode): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'code' => $response['code'],
            'message' => $response['message'],
            'data' => $response['data'],
        ], $statusCode);
    }

    public function successRequest($request_id): array
    {
        return [
            'code' => 0,
            'message' => 'success',
//            'request_id' => $request_id,
        ];
    }

    public function errorRequest($requestId): array
    {
        return [
            'code' => 13,
            'message' => trans('validation.server_error'),
//            'request_id' => $requestId,
        ];
    }

    public function errorField($field, $message, $requestId): array
    {
        $errorCode = $this->getErrorCodeByField($field);

        return [
            'code' => $errorCode,
            'message' => $message,
//            'request_id' => $requestId,
        ];
    }

    public function validateRequestFields($fields): bool|array
    {
        if (empty($fields['request_id'])) {
            return $this->errorField('request_id', trans('validation.request_id.empty'), $fields['request_id']);
        }

        if (gettype($fields['request_id']) != 'string') {
            return $this->errorField('request_id', trans('validation.request_id.invalid'), $fields['request_id']);
        }

        if (empty($fields['request_type'])) {
            return $this->errorField('request_type', trans('validation.request_type.empty'), $fields['request_id']);
        }

        if (gettype($fields['request_type']) != 'string' || !in_array($fields['request_type'], ['ACTIVATE', 'EXTEND', 'CANCEL'])) {
            return $this->errorField('request_type', trans('validation.request_type.invalid'), $fields['request_id']);
        }

        if (empty($fields['package_type'])) {
            return $this->errorField('package_type', trans('validation.package_type.empty'), $fields['request_id']);
        }

        // $genImage = 1, $genMC = 2, $allFeature = 9
        if (gettype($fields['package_type']) != 'integer' || !in_array($fields['package_type'], [1, 2, 9])) {
            return $this->errorField('package_type', trans('validation.package_type.invalid'), $fields['request_id']);
        }

        return true;
    }
}
