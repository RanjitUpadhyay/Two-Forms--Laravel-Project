<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table="teachers";
    protected $primaryKey="teacher_id";
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable=[
        "teacher_name",
        "email",
        "phone",
        "gender",
        "department",
        "status"
    ];

    public function subjects()
    {
        return $this->hasMany(TeacherSubject::class,'teacher_id','teacher_id');
    }
}
