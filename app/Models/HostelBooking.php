<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HostelBooking extends Model
{
   protected $table="hostel_booking";
   protected $primaryKey="booking_id";
   public $incrementing=true;
   protected $keyType='int';

   protected $fillable=['name','gender','phone','email','room_no','check_in','check_out'];

   public function payment()
   {
    return $this->hasMany(HostelPayment::class,'booking_id','booking_id');
   }
}
