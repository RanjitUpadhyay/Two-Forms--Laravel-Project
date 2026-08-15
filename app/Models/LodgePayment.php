<?php

namespace App\Models;
use App\Models\LodgeBooking;

use Illuminate\Database\Eloquent\Model;

class LodgePayment extends Model
{
    protected $table='LodgePayment';
    protected $primaryKey='payment_id';
    public $incrementing=true;
    protected $keyType = 'int';

    protected $fillable=['booking_id','payment_mode','payment_status','total_amount'];

    public function booking()
    {
        return $this->belongsTo(LodgeBooking::class,'booking_id','booking_id');
    }
}
