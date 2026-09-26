<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book_ extends Model
{
     protected $table="boooks";
    protected $primaryKey = 'boooks_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
       "author_id",
       "book_title",
       "publication_date",
       "price",
       "quantity"
    ];

    public function author()
    {
        return $this->belongsTo(BookAuthor::class,'author_id','author_id');
    }
}
