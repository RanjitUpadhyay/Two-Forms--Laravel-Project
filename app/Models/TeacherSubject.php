<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherSubject extends Model
{
     protected $table="teacher_subject";
    protected $primaryKey="subject_id";
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable=[
       "teacher_id",
       "subject_name",
       "subject_code",
       "class_name",
       "academic_year"
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class,'teacher_id','teacher_id');
    }
}
