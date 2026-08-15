<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_name'=>'required|string|min:3|max:20',
            'email'=>'required|email',
            'phone'=>'required|digits:10',
            'DOB'=>'required|date',
            'gender'=>'required',
            'address'=>'required',
            'status'=>'required'
        ];
    }
}
