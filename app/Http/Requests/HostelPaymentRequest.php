<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class HostelPaymentRequest extends FormRequest
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
            'booking_id'=>'required|integer|exists:hostel_booking,booking_id',
            'payment_status'=>'required|in:pending,cancelled,confirmed,refunded',
            'payment_mode'=>'required|in:cash,card,upi,net_banking',
            'total_bill'=>'required|numeric|min:0'
        ];
    }
}
//Your HostelPaymentRequest is correctly structured as a Laravel Form Request.
// It validates the incoming payment data before it reaches your controller.