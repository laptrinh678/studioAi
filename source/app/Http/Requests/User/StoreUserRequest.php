<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
        return [
            'display_name' => 'required',
            'user_name'    => 'required|unique:users',
            'email'        => 'required|email|unique:users',
            'phone'        => [
                'required',
                'regex:/^(84|0)+([0-9]{9,10})$/',
                'max:12',
                'unique:users'
            ],
            'password'   => [
                'required',
                'min:8',
                'max:100',
                // 'regex:/^(?=.*[a-z])+(?=.*[A-Z])+(?=.*\d)+(?=.*[$~!#^()@%*?&_/\-])[A-Za-z\d$~!#^()@%*?&_/\-]{8,}/',
                'confirmed'
            ],
            'group_ids'    => 'array',
            'permissions'  => 'array'
            // 'status'       => ''
        ];
    }

    public function attributes()
    {
        return [
            'display_name' => trans('fields.display_name'),
            'user_name'    => trans('fields.user_name'),
            'email'        => trans('fields.email'),
            'phone'        => trans('fields.phone'),
            'password'     => trans('fields.password'),
            'group_ids'    => trans('fields.group_ids'),
            'permissions'  => trans('fields.permissions')
            // 'status'       => trans('fields.status')
        ];
    }
}
