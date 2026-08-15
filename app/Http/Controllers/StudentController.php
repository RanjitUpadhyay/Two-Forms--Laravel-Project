<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Student;
use App\Http\Requests\StudentRequest;

class StudentController extends Controller
{
    function index()
    {
        $students=Student::with('enrollments')->get();
        return response()->json($students);
    }

    function store(StudentRequest $req)
    {
        $student=Student::create([
            'student_name'=>$req->student_name,
            'email'=>$req->email,
            'phone'=>$req->phone,
            'DOB'=>$req->DOB,
            'gender'=>$req->gender,
            'address'=>$req->address,
            'status'=>$req->status,
        ]);

        return response()->json([
            'message'=>'Student Created',
            'student'=>$student
        ],201);
    }

    function show($id)
    {
        $student=Student::with('enrollments')->find($id);

        if(!$student)
            {
                return response()->json([
                    'message'=>'Student Not found'
                ],404);
            }

            else{
                return response()->json($student);
            }
    }

    function update(StudentRequest $req, $id)
    { 
          $student=Student::find($id);
        
            
          if(!$student)
            {
                return response()->json([
                    'message'=>'Student Not found'
                ],404);
            }

            else{
                $student->update([
            'student_name'=>$req->student_name,
            'email'=>$req->email,
            'phone'=>$req->phone,
            'DOB'=>$req->DOB,
            'gender'=>$req->gender,
            'address'=>$req->address,
            'status'=>$req->status, 
                ]);

                return response()->json([
                    'message'=>'Student Updated',
                    'student'=>$student
                ],200);
            }

        
    }

    function destroy($id)
    {
          $student=Student::find($id);
        
            
          if(!$student)
            {
                return response()->json([
                    'message'=>'Student Not found'
                ],404);
            }

            else{
                $student->delete();
                return response()->json([
                    'message'=>'Student Deleted'
                ],200);
            }
    }
}
