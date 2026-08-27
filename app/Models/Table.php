<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Table extends Model
{
    protected $table="tables";
    protected $primaryKey="table_id";
    public $incrementing=true;

    protected $fillable=[
        "table_number",
        "capacity",
        "table_status"
    ];

    public function reservations()
    {
        return $this->hasMany(TableReservation::class,'table_id','table_id');
    }
}
