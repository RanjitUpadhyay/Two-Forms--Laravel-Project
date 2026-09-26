<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductOrder extends Model
{
     protected $table="product_order";
    protected $primaryKey="order_id";
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
       "product_id",
       "order_number",
       "order_quantity",
       "unit_price",
       "total_amount"
    ];

    public function product()
    {
        return $this->belongsTo(Product::class,'product_id','product_id');
    }
}
