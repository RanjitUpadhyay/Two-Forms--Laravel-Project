<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table="accounts";
    protected $keyType="int";
    public $incrementing=true;
    protected $primaryKey="account_id";

    protected $fillable=[
       "customer_id",
       "account_number",
       "account_type",
       "balance",
       "opening_date"
    ];

    public function customer()
    {
         return $this->belongsTo(Customer::class,'customer_id','customer_id');
    }
}
