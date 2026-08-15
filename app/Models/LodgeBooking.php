<?php

namespace App\Models;
use App\Models\LodgePayment;

use Illuminate\Database\Eloquent\Model;

class LodgeBooking extends Model
{
    protected $table='LodgeBooking';
    protected $primaryKey='booking_id';
    public $incrementing=true;
    protected $keyType = 'int';

    protected $fillable=['name','phone','room_no','check_in','check_out','booking_status'];

    public function payment()
    {
        return $this->hasMany(LodgePayment::class,'booking_id','booking_id');
    }
}
