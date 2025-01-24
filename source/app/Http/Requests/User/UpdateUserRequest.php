<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'user_name'    => 'required|unique:users,user_name,' . $this->id ,
            'email'        => 'required|email|unique:users,email,' . $this->id,
            'phone'        => [
                'required',
                'regex:/^(84|0)+([0-9]{9,10})$/',
                'max:12',
                'unique:users,phone,' . $this->id
            ],
            'group_ids'    => 'array',
            'permissions'  => 'array',
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
            'permissions'  => trans('fields.permissions'),
            // 'status'       => trans('fields.status')
        ];
    }
}
