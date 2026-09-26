<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table="courses";
    protected $primaryKey="course_id";
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable=[
        "course_name",
        "duration",
        "fee",
        "status"
    ];

    public function enrollments()
    {
        return $this->hasMany(Course_Enrollment::class,'course_id','course_id');
    }
}
