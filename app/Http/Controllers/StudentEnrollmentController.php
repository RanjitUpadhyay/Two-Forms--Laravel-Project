<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentEnrollment;
use App\Http\Requests\StudentEnrollmentRequest;


class StudentEnrollmentController extends Controller
{
    function index()
    {
        $enrollments=StudentEnrollment::with('students')->get();
        return response()->json($enrollments);
    }

    function store(StudentEnrollmentRequest $req)
    {
        $enrollment=StudentEnrollment::create([
            'student_id'=>$req->student_id,
            'class_name'=>$req->class_name,
            'section'=>$req->section,
            'academic_year'=>$req->academic_year,
            'admission_date'=>$req->admission_date,
            'enrollment_status'=>$req->enrollment_status,
            
        ]);

        return response()->json([
            'message'=>'Enrollment Created',
            'Enrollment'=>$enrollment
        ],201);
    }

    function show($id)
    {
        $enrollment=StudentEnrollment::with('students')->find($id);

        if(!$enrollment)
            {
                return response()->json([
                    'message'=>'Enrollment Not found'
                ],404);
            }

            else{
                return response()->json($enrollment);
            }
    }

    function update(StudentEnrollmentRequest $req, $id)
    { 
          $enrollment=StudentEnrollment::find($id);
        
            
          if(!$enrollment)
            {
                return response()->json([
                    'message'=>'Enrollment Not found'
                ],404);
            }

            else{
                $enrollment->update([
            'student_id'=>$req->student_id,
            'class_name'=>$req->class_name,
            'section'=>$req->section,
            'academic_year'=>$req->academic_year,
            'admission_date'=>$req->admission_date,
            'enrollment_status'=>$req->enrollment_status,
                ]);

                return response()->json([
                    'message'=>'Enrollment Updated',
                    'Enrollment'=>$enrollment
                ],200);
            }

        
    }

    function destroy($id)
    {
          $enrollment=StudentEnrollment::find($id);
        
            
          if(!$enrollment)
            {
                return response()->json([
                    'message'=>'Enrollment Not found'
                ],404);
            }

            else{
                $enrollment->delete();
                return response()->json([
                    'message'=>'Enrollment Deleted'
                ],200);
            }
    }
}
