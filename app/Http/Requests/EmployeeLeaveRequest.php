<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class EmployeeLeaveRequest extends FormRequest
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
        "employee_id"=>"required",
       "leave_type"=>"required",
       "from_date"=>"required|date|after_or_equal:today",
       "to_date"=>"required|date|after_or_equal:from_date",
       "reason"=>"required",
       "leave_status"=>"required"
        ];
    }
}
