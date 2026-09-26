<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class VehicleBookingRequest extends FormRequest
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
        "vehicle_id"=>"required",
        "customer_name"=>"required|min:3|max:20",
        "phone"=>"required|digits:10",
        "booking_date"=>"required|date",
        "booking_status"=>"required",
        ];
    }
}
