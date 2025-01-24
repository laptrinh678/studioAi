<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
        $id = Auth::id();
        return [
            'display_name' => [
                'required',
                'max:100',
            ],
            'email' => [
                'required',
                'max:45',
                Rule::unique('users', 'email')->ignore($id)
            ],
            'phone'=>[
                'required',
                'max:12',
                'regex:/^[0-9!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]*$/',
                Rule::unique('users', 'phone')->ignore($id)
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
            'display_name'  => trans('fields.user_display_name'),
            'email'         => trans('fields.user_email'),
        ];
    }
}
