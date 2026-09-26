<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class InsurancePolicyRequest extends FormRequest
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
        "customer_id"=>"required|integer|exists:insurance,customer_id",
        "policy_number"=>"required",
        "policy_type"=>"required",
        "premium_amount"=>"required",
        "start_date"=>"required|date:after_or_equal:today",
        "end_date"=>"required",
        "policy_status"=>"required"
        ];
    }
}
