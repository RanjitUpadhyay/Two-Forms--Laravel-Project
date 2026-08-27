<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
     protected $table="event_registrations";
    protected $primaryKey="registration_id";
    public $incrementing=true;

    protected $fillable=[
        "event_id",
        "participant_name",
        "email",
        "phone",
        "registration_date",
        "registration_status"
    ];

    public function events()
    {
        return $this->belongsTo(Event::class,'event_id','event_id');
    }
}
