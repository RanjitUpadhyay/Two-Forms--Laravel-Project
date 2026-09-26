<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table='books';
    protected $primaryKey='book_id';
    public $incrementing = true;
    protected $keyType='int';

    protected $fillable=
    [
    "book_name",
    "category",
    "price",
    "status"
    ];

    function issues()
    {
        return $this->hasMany(BookIssue::class, 'book_id','book_id');
    }
}
