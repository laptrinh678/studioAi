<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

trait PaymentManagement
{
    protected function uniqueTransactionId(): \Illuminate\Validation\Rules\Unique
    {
        return Rule::unique('transaction_logs', 'transaction_id');
    }

    public function getFieldByPackageType($packageType): array
    {
        if ($packageType == $this->allFeature) {
            return ["textToImage", "imageToImage", "virtualHuman", "virtualHumanV2"];
//            return ['expiry_date_gen_image', 'expiry_date_gen_mc'];
        }

        if ($packageType == $this->genImage) {
            return ["textToImage", "imageToImage"];
//            return ['expiry_date_gen_image'];
        }

        if ($packageType == $this->genMC) {
            return ["virtualHuman", "virtualHumanV2"];
//            return ['expiry_date_gen_mc'];
        }

        return [];
    }

    public function validateRequest(Request $request): \Illuminate\Validation\Validator
    {
        $rules = [
            'email' => 'required|email',
            'transaction_id' => 'required|string|'.$this->uniqueTransactionId(),
            'requests' => 'required|array',
        ];

        $messages = [
            'email.required' => 'email is empty',
            'email.email' => 'email is invalid',
            'transaction_id.required' => 'transaction_id is empty',
            'transaction_id.unique' => 'transaction_id is existed',
            'requests.required' => 'requests is empty',
            'requests.array' => 'requests is invalid',
        ];

        return Validator::make($request->all(), $rules, $messages);
    }

    public function getErrorMessage($messages)
    {
        $errorMessage = '';
        foreach ($messages as $message) {
            if (is_array($message)) {
                $errorMessage = $message[0];
            } else {
                $errorMessage = $message;
            }
        }

        return $errorMessage;
    }

    public function isPartner($partnerId): bool
    {
        if ($partnerId != config('app.partner_id')) {
            return false;
        }

        return true;
    }
}