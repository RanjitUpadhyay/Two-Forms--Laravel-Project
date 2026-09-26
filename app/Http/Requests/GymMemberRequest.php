<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GymMemberRequest extends FormRequest
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
        "member_id"=>"required",
       "memebership_type"=>"required",
       "start_date"=>"required|after_or_equal:today",
       "end_date"=>"required|after_or_equal:start_date",
       "fee"=>"required",
       "memebership_status"=>"required"
        ];
    }
}
