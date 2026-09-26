<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class InsuranceRequest extends FormRequest
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
        "customer_name"=>"required|min:3|max:20",
        "email"=>"required|email",
        "phone"=>"required|digits:10",
        "DOB"=>"required|date:before_or_equal:today",
        "gender"=>"required|in:male,female",
        "address"=>"required",
        "customer_status"=>"required"
        ];
    }
}
