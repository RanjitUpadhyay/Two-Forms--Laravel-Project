<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Http\Requests\EmployeeRequest;

class EmployeeController extends Controller
{
    function index()
    {
        $employees=Employee::with('leaves')->get();
        return response()->json($employees);
    }

    function store(EmployeeRequest $req)
    {
        $employee=Employee::create([
        "employee_name"=>$req->employee_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "gender"=>$req->gender,
        "department"=>$req->department,
        "joining_date"=>$req->joining_date,
        "status"=>$req->status
        ]);

        return response()->json([
            'message'=>'Employee Created',
            'employee'=>$employee
        ],201);
    }

    function show($id)
    {
        $employee=Employee::with('leaves')->find($id);

        if(!$employee)
            {
                return response()->json([
                    'message'=>'Employee Not Found',
                ],404);
            }

            else{
                return response()->json($employee);
            }
    }

    function update(EmployeeRequest $req, $id)
    {
         $employee=Employee::find($id);

        if(!$employee)
            {
                return response()->json([
                    'message'=>'Employee Not Found',
                ],404);
            }

            else{
                $employee->update([
        "employee_name"=>$req->employee_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "gender"=>$req->gender,
        "department"=>$req->department,
        "joining_date"=>$req->joining_date,
        "status"=>$req->status
                ]);
            }
            return response()->json([
                'message'=>'Employee Updated',
                'employee'=>$employee
            ],200);
    }

    function destroy($id)
    {
        
         $employee=Employee::find($id);

        if(!$employee)
            {
                return response()->json([
                    'message'=>'Employee Not Found',
                ],404);
            }

            else{
                $employee->delete();
                return response()->json([
                    'message'=>'Employee Deleted'
                ],200);
            }
    }
}
