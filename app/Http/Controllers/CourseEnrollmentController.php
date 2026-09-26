<?php

namespace App\Http\Controllers;

use App\Models\Course_Enrollment;
use App\Http\Requests\CourseEnrollmentRequest;

class CourseEnrollmentController extends Controller
{
     function index()
    {
      $course_enrollments=Course_Enrollment::with('course')->get();
      return response()->json($course_enrollments);
    }

    function store(CourseEnrollmentRequest $req)
    {
        $course_enrollment=Course_Enrollment::create([
        "course_id"=>$req->course_id,
       "student_name"=>$req->student_name,
       "email"=>$req->email,
       "enrollment_date"=>$req->enrollment_date,
       "status"=>$req->status
        ]);

        return response()->json([
            'message'=>'course_enrollment Created',
            'course'=>$course_enrollment
        ],201);
    }

    function show($id)
    {
        $course_enrollment=Course_Enrollment::with('course')->find($id);

        if(!$course_enrollment)
            {
                return response()->json([
                    'message'=>'course_enrollment Not Found'
                ],404);
            }
            else{
                return response()->json($course_enrollment);
            }
    }

    function update(CourseEnrollmentRequest $req,$id)
    {
        $course_enrollment=Course_Enrollment::find($id);
         if(!$course_enrollment)
            {
                return response()->json([
                    'message'=>'course_enrollment Not Found'
                ],404);
            }
            else{
                $course_enrollment->update([
        "course_id"=>$req->course_id,
       "student_name"=>$req->student_name,
       "email"=>$req->email,
       "enrollment_date"=>$req->enrollment_date,
       "status"=>$req->status
                ]);
            }
            return response()->json([
                'message'=>'course_enrollment Updated',
                "course"=>$course_enrollment
            ],200);

    }

    function destroy($id)
    {
        $course_enrollment=Course_Enrollment::find($id);
         if(!$course_enrollment)
            {
                return response()->json([
                    'message'=>'course_enrollment Not Found'
                ],404);
            }
            
            else{
                $course_enrollment->delete();
            }
            return response()->json([
                'message'=>'course_enrollment Deleted'
            ],200);
    }
}
