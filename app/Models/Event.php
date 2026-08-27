<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table="events";
    protected $primaryKey="event_id";
    public $incrementing=true;

    protected $fillable=[
        "event_name",
        "event_date",
        "venue_organizer",
        "event_status"
    ];

    public function registration()
    {
        return $this->hasMany(EventRegistration::class,'event_id','event_id');
    }
}
