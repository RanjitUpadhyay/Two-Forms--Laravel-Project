<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class BookIssueRequest extends FormRequest
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
            'book_id'=>'required|exists:books,book_id',
            'student_name'=>'required|min:3|max:20',
            'gender'=>'required|in:male,female',
            'student_phone'=>'required|digits:10',
            'issue_date'=>'required|after_or_equal:today',
            'return_date'=>'required|after_or_equal:issue_date',
            'issue_status'=>'required'
    ];
    }
}
