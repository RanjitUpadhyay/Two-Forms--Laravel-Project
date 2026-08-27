<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
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
        "employee_name"=>"required",
        "email"=>"required|email",
        "phone"=>"required|digits:10",
        "gender"=>"required|in:male,female",
        "department"=>"required",
        "joining_date"=>"required|date",
        "status"=>"required"
        ];
    }
}
