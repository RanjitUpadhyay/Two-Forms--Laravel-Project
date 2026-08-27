<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TableReservationRequest extends FormRequest
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
       "table_id"=>"required",
       "customer_name"=>"required|min:3|max:20",
       "phone"=>"required|digits:10",
       "reservation_date"=>"required",
       "number_of_guests"=>"required",
       "reservation_status"=>"required"
        ];
    }
}
