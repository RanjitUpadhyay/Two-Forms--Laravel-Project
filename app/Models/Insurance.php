<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insurance extends Model
{
    protected $table="insurance";
    protected $primaryKey = "customer_id";
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        "customer_name",
        "email",
        "phone",
        "DOB",
        "gender",
        "address",
        "customer_status"
    ];

    public function policiess()
    {
        return $this->hasMany(InsurancePolicy::class,"customer_id","customer_id");
    }
}
