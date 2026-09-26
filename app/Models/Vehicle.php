<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $table="vehicles";
    protected $primaryKey = "vehicle_id";
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        "vehicle_number",
        "vehicle_type",
        "brand",
        "model",
        "status"
    ];

    public function bookings()
    {
        return $this->hasMany(VehicleBooking::class,'vehicle_id','vehicle_id');
    }

}
