<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HotelPayment extends Model
{
    protected $table='hotel_payment';
   protected $primaryKey='payment_id';
    public $incrementing=true;
    protected $keyType='int';

    protected $fillable=['booking_id','payment_mode','payment_status','total_amount'];

    public function booking()
    {
       return $this->belongsTo(HotelBooking::class,'booking_id','booking_id');
    }
}
