<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ChangePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = Auth::user();
        $passWord = $user->password;
        return [
            'password' => [
                'required',
                function ($attribute, $value, $fail) use ($passWord) {
                    if (!Hash::check($value, $passWord)) {
                        $fail('Mật khẩu hiện tại không đúng');
                    }
                },
            ],
            'new_password' => [
                'required',
                'max:128',
                function ($attribute, $value, $fail) use ($passWord) {
                    if (Hash::check($value, $passWord)) {
                        $fail(trans('validation.cant_equal'));
                    }
                },
                // 'regex:/^(?=.*[a-z])+(?=.*[A-Z])+(?=.*\d)+(?=.*[$~!#^()@$!%*?&])[A-Za-z\d$~!#^()@$!%*?&]{8,}/',
            ],
        ];
    }

    /**
     * assign attributes
     * @return array
     */
    public function attributes()
    {
        return [
            'password'      => trans('fields.password'),
            'new_password'  => trans('fields.new_password'),
        ];
    }
}
