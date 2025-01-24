<?php

namespace App\Traits;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;

trait ExceptionManagement
{
    protected array $statusCodeErrors = [
        'maxDuration' => ['code' => 101, 'message' => 'max_duration'],
        'maxQueue' => ['code' => 102, 'message' => 'max_queue']
    ];

    public function handleException($e): \Illuminate\Http\JsonResponse
    {
        $code = $e->getCode();
        if ($code = 400) {
            foreach ($this->statusCodeErrors as $codeError) {
                $message = sprintf('"code":%s', $codeError['code']);
                if (str_contains($e->getMessage(), $message) && $codeError['code'] == 102) {
                    return response()->json(['message' => Lang::get('validation.'.$codeError['message'])], 400);
                } else if (str_contains($e->getMessage(), $message) && $codeError['code'] == 101) {
                    $response = $e->getMessage();
                    $response = explode("\n", $response)[1];
                    $data = json_decode($response, true);
                    $duration = $data['duration'] ?? 31;

                    return response()->json(['message' => Lang::get('validation.'.$codeError['message'], ['duration' => $duration])], 400);
                }
            }
        }

        return response()->json(['error' => $e->getMessage()], 500);
    }
}