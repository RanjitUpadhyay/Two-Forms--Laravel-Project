<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\EmployeeLeave;
use App\Http\Requests\EmployeeLeaveRequest;

class EmployeeLeaveController extends Controller
{
    function index()
    {
        $employee_leaves=EmployeeLeave::with('employee')->get();
        return response()->json($employee_leaves);
    }

    function store(EmployeeLeaveRequest $req)
    {
        $employee_leave=EmployeeLeave::create([
        "employee_id"=>$req->employee_id,
       "leave_type"=>$req->leave_type,
       "from_date"=>$req->from_date,
       "to_date"=>$req->to_date,
       "reason"=>$req->reason,
       "leave_status"=>$req->leave_status
        ]);

        return response()->json([
            'message'=>'Employee Leave Created',
            'employee_leave'=>$employee_leave
        ],201);
    }

    function show($id)
    {
        $employee_leave=EmployeeLeave::with('employee')->find($id);

        if(!$employee_leave)
            {
                return response()->json([
                    'message'=>'Employee Leave Not Found',
                ],404);
            }

            else{
                return response()->json($employee_leave);
            }
    }

    function update(EmployeeLeaveRequest $req, $id)
    {
         $employee_leave=EmployeeLeave::find($id);

        if(!$employee_leave)
            {
                return response()->json([
                    'message'=>'Employee Leave Not Found',
                ],404);
            }

            else{
                $employee_leave->update([
         "employee_id"=>$req->employee_id,
       "leave_type"=>$req->leave_type,
       "from_date"=>$req->from_date,
       "to_date"=>$req->to_date,
       "reason"=>$req->reason,
       "leave_status"=>$req->leave_status
                ]);
            }
            return response()->json([
                'message'=>'Employee Leave Updated',
                'employee_leave'=>$employee_leave
            ],200);
    }

    function destroy($id)
    {
        
         $employee_leave=EmployeeLeave::find($id);

        if(!$employee_leave)
            {
                return response()->json([
                    'message'=>'Employee Leave Not Found',
                ],404);
            }

            else{
                $employee_leave->delete();
                return response()->json([
                    'message'=>'Employee Leave Deleted'
                ],200);
            }
    }
}
