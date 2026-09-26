<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gym extends Model
{
    protected $table="gym_member";
    protected $primaryKey = 'member_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        "memeber_name",
        "email",
        "Phone",
        "DOB",
        "gender",
        "address",
        "member_status"
    ];

    public function membership()
    {
        return $this->hasMany(GymMember::class,'member_id','member_id');
    }
}
