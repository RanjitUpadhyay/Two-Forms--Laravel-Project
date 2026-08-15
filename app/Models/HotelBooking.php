<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HotelBooking extends Model
{
   protected $table='hotel_booking';
   protected $primaryKey='booking_id';
    public $incrementing=true;
    protected $keyType='int';

    protected $fillable=['guest_name','email','phone','room_no','room_type','check_in','check_out','number_of_guests','booking_status'];

    public function payment()
    {
        return $this->hasMany(HotelPayment::class,'booking_id','booking_id');
    }

}
