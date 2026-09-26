<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\CourseRequest;

class CourseController extends Controller
{
    function index()
    {
      $courses=Course::with('enrollments')->get();
      return response()->json($courses);
    }

    function store(CourseRequest $req)
    {
        $course=Course::create([
        "course_name"=>$req->course_name,
        "duration"=>$req->duration,
        "fee"=>$req->fee,
        "status"=>$req->status
        ]);

        return response()->json([
            'message'=>'Course Created',
            'course'=>$course
        ],201);
    }

    function show($id)
    {
        $course=Course::with('enrollments')->find($id);

        if(!$course)
            {
                return response()->json([
                    'message'=>'Course Not Found'
                ],404);
            }
            else{
                return response()->json($course);
            }
    }

    function update(CourseRequest $req,$id)
    {
        $course=Course::find($id);
         if(!$course)
            {
                return response()->json([
                    'message'=>'Course Not Found'
                ],404);
            }
            else{
                $course->update([
        "course_name"=>$req->course_name,
        "duration"=>$req->duration,
        "fee"=>$req->fee,
        "status"=>$req->status
                ]);
            }
            return response()->json([
                'message'=>'Course Updated',
                "course"=>$course
            ],200);

    }

    function destroy($id)
    {
        $course=Course::find($id);
         if(!$course)
            {
                return response()->json([
                    'message'=>'Course Not Found'
                ],404);
            }
            
            else{
                $course->delete();
            }
            return response()->json([
                'message'=>'Course Deleted'
            ],200);
    }
}
