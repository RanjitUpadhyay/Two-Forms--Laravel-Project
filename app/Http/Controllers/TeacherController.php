<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Http\Requests\TeacherRequest;

class TeacherController extends Controller
{
    function index()
    {
      $teachers=Teacher::with('subjects')->get();
      return response()->json($teachers);
    }

    function store(TeacherRequest $req)
    {
        $teacher=Teacher::create([
        "teacher_name"=>$req->teacher_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "gender"=>$req->gender,
        "department"=>$req->department,
        "status"=>$req->status
       ] );

       return response()->json([
        'message'=>"teacher created",
        'teacher'=>$teacher
       ],201);
    }

    function show($id)
    {
        $teacher=Teacher::with('subjects')->find($id);

        if(!$teacher)
            {
                return response()->json([
                    'message'=>'teacher not found'
                ],404);
            }

            else{
                return response()->json($teacher);
            }
    }

    function update(TeacherRequest $req, $id)
    {
        $teacher=Teacher::find($id);
         if(!$teacher)
            {
                return response()->json([
                    'message'=>'teacher not found'
                ],404);
            }

            else{
                $teacher->update([
        "teacher_name"=>$req->teacher_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "gender"=>$req->gender,
        "department"=>$req->department,
        "status"=>$req->status
                ]);
            }

            return response()->json([
                'message'=>'teacher updated',
                 'teacher'=>$teacher
            ],200);
    }

    function destroy($id)
    {
        $teacher=Teacher::find($id);
         if(!$teacher)
            {
                return response()->json([
                    'message'=>'teacher not found'
                ],404);
            }
            else{
                $teacher->delete();
            }
            return response()->json([
                'message'=>'teacher deleted'
            ],200);
    }
}
