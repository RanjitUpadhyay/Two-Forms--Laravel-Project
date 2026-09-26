<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course_Enrollment extends Model
{
     protected $table="course_enrollments";
    protected $primaryKey="enrollment_id";
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable=[
       "course_id",
       "student_name",
       "email",
       "enrollment_date",
       "status"
    ];

    public function course()
    {
        return $this->belongsTo(Course::class,'course_id','course_id');
    }
}
