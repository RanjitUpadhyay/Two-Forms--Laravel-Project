<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class HostelBookingRequest extends FormRequest
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
            'name'=>'required|min:3|max:20',
            'gender'=>'required',
            //'phone'=>'required|unique:hostel_booking,phone|digits:10',
            //'email'=>'required|email|unique:hostel_booking,email',
            'phone'=>'required|digits:10',
            'email'=>'required|email',
            'room_no'=>'required|numeric|min:0',
            'check_in'=>'required|date|after_or_equal:today',
            'check_out'=>'required|date|after_or_equal:check_in'
        ];
    }
}
