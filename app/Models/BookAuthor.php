<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookAuthor extends Model
{
    protected $table="authors";
    protected $primaryKey = 'author_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        "author_name",
        "gender",
        "email",
        "phone",
        "country"
    ];

    public function boooks()
    {
        return $this->hasMany(Book_::class,'author_id','author_id');
    }

}
