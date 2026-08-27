<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table="employees";
    protected $primaryKey="employee_id";
    public $incrementing=true;
    protected $keyType="int";

    protected $fillable=[
        "employee_name",
        "email",
        "phone",
        "gender",
        "department",
        "joining_date",
        "status"
    ];

    public function leaves()
    {
        return $this->hasMany(EmployeeLeave::class,'employee_id','employee_id');
    }
}
