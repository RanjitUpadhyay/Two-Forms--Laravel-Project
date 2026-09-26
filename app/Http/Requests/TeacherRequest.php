<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TeacherRequest extends FormRequest
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
        "teacher_name"=>"required|min:3|max:20",
        "email"=>"required|email",
        "phone"=>"required|digits:10",
        "gender"=>"required|in:male,female",
        "department"=>"required",
        "status"=>"required"
        ];
    }
}
