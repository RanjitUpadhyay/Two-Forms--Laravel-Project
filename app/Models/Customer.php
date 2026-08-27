<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table="customers";
    protected $keyType="int";
    public $incrementing=true;
    protected $primaryKey="customer_id";

    protected $fillable=[
        "customer_name",
        "email",
        "phone",
        "gender",
        "DOB",
        "address",
        "status"
    ];

    public function accounts()
    {
         return $this->hasMany(Account::class,'customer_id','customer_id');
    }
}
