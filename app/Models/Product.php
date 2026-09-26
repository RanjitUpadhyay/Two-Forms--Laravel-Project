<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table="products";
    protected $primaryKey="product_id";
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        "product_name",
        "product_code",
        "category",
        "price",
        "quantity",
        "status"
    ];

    public function productOrders()
    {
        return $this->hasMany(ProductOrder::class,'product_id','product_id');
    }
}
