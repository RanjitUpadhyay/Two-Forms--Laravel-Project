<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table='students';
    protected $primaryKey='student_id';
    public $incrementing=true;
    protected $keyType='int';

    protected $fillable=['student_name','email','phone','DOB','gender','address','status'];

    function enrollments()
    {
        return $this->hasMany(StudentEnrollment::class,'student_id','student_id');
    }
}
