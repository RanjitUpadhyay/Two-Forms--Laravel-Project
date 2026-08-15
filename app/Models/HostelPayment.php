<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HostelPayment extends Model
{
   protected $table="hostel_payment";
   protected $primaryKey="payment_id";
   public $incrementing=true;
   protected $keyType='int';

   protected $fillable=['booking_id','payment_status','payment_mode','total_bill'];

   public function booking()
   {
    return $this->belongsTo(HostelBooking::class,'booking_id','booking_id');
   }
}
