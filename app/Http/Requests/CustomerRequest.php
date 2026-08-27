<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
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
        "gender"=>"required|in:male,female",
        "DOB"=>"required|date",
        "address"=>"required",
        "status"=>"required"
        ];
    }
}
