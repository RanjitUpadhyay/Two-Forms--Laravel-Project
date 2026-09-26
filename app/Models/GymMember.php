<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GymMember extends Model
{
     protected $table="gym_membership";
    protected $primaryKey = 'membership_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
       "member_id",
       "memebership_type",
       "start_date",
       "end_date",
       "fee",
       "memebership_status"
    ];

    public function member()
    {
        return $this->belongsTo(Gym::class,'member_id','member_id');
    }
}
