<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LodgePaymentRequest extends FormRequest
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
            'booking_id'     => 'required',
           // or 'booking_id' => 'required|exists:LodgeBooking,booking_id',
            'payment_mode'=>'required',
            'payment_status'=>'required',
            'total_amount'=>'required'
        ];
    }
}
