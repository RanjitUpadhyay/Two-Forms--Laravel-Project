<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleBooking extends Model
{
    protected $table="vehicle_bookings";
    protected $primaryKey ="booking_id";
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        "vehicle_id",
        "customer_name",
        "phone",
        "booking_date",
        "booking_status",

    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class,'vehicle_id','vehicle_id');
    }
}
