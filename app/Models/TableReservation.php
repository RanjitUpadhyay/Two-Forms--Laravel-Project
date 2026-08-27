<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableReservation extends Model
{
    protected $table="table_reservations";
    protected $primaryKey="reservation_id";
    public $incrementing=true;

    protected $fillable=[
       "table_id",
       "customer_name",
       "phone",
       "reservation_date",
       "number_of_guests",
       "reservation_status"
    ];

    public function table()
    {
        return $this->belongsTo(Table::class,'table_id','table_id');
    }
}
