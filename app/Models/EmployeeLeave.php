<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeLeave extends Model
{
     protected $table="employee_leaves";
    protected $primaryKey="leave_id";
    public $incrementing=true;
    protected $keyType="int";

    protected $fillable=[
       "employee_id",
       "leave_type",
       "from_date",
       "to_date",
       "reason",
       "leave_status"
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class,'employee_id','employee_id');
    }
}
