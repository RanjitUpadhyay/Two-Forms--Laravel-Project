<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentEnrollment extends Model
{
    protected $table='student_enrollments';
    protected $primaryKey='enrollment_id';
    public $incrementing=true;
    protected $keyType='int';

    protected $fillable=['student_id','class_name','section','academic_year','admission_date','enrollment_status'];

    function students()
    {
        return $this->belongsTo(Student::class,'student_id','student_id');
    }
}
