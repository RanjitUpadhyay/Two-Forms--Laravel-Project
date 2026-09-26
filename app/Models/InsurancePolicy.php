<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InsurancePolicy extends Model
{
     protected $table="insurance_policy";
    protected $primaryKey = "policy_id";
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        "customer_id",
        "policy_number",
        "policy_type",
        "premium_amount",
        "start_date",
        "end_date",
        "policy_status"
    ];

    public function insurance()
    {
        return $this->belongsTo(Insurance::class,"customer_id","customer_id");
    }
}
