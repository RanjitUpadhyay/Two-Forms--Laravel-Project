<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LodgeBookingRequest extends FormRequest
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
            'phone'=>'required|unique:LodgeBooking,phone|digits:10',
            'room_no'=>'required',
            'check_in'=>'required|date|after_or_equal:today',
            'check_out'=>'required|date|after_or_equal:check_in',
            'booking_status'=>'required'
        ];
    }
}
