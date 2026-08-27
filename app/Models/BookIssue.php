<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookIssue extends Model
{
    protected $table='book_issue';
    protected $primaryKey='issue_id';
    public $incrementing = true;
    protected $keyType='int';

    protected $fillable=[
        'book_id',
        'student_name',
        'gender',
        'student_phone',
        'issue_date',
        'return_date',
        'issue_status'
        ];

    function book()
    {
        return $this->belongsTo(Book::class, 'book_id','book_id');
    }
}
