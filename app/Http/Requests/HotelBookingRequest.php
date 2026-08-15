<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class HotelBookingRequest extends FormRequest
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
            'guest_name'=>'required|min:3|max:100',
            'email'=>'required|email|unique:hotel_booking,email',
            'phone'=>'required|digits:10',
            'room_no'=>'required|integer',
            'room_type'=>'required',
            'check_in'=>'required|after_or_equal:today',
            'check_out'=>'required|after_or_equal:check_in',
            'number_of_guests'=>'required|min:1',
            'booking_status'=>'required'
        ];
    }
}
