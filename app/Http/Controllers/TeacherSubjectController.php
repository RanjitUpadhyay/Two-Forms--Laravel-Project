<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherSubjectRequest;
use App\Models\TeacherSubject;

class TeacherSubjectController extends Controller
{
     function index()
    {
      $teacher_subjects=TeacherSubject::with('teacher')->get();
      return response()->json($teacher_subjects);
    }

    function store(TeacherSubjectRequest $req)
    {
        $teacher_subject=TeacherSubject::create([
       "teacher_id"=>$req->teacher_id,
       "subject_name"=>$req->subject_name,
       "subject_code"=>$req->subject_code,
       "class_name"=>$req->class_name,
       "academic_year"=>$req->academic_year
       ] );

       return response()->json([
        'message'=>"teacher_subject created",
        'teacher_subject'=>$teacher_subject
       ],201);
    }

    function show($id)
    {
        $teacher_subject=TeacherSubject::with('teacher')->find($id);

        if(!$teacher_subject)
            {
                return response()->json([
                    'message'=>'teacher_subject not found'
                ],404);
            }

            else{
                return response()->json($teacher_subject);
            }
    }

    function update(TeacherSubjectRequest $req, $id)
    {
        $teacher_subject=TeacherSubject::find($id);
         if(!$teacher_subject)
            {
                return response()->json([
                    'message'=>'teacher_subject not found'
                ],404);
            }

            else{
                $teacher_subject->update([
       "teacher_id"=>$req->teacher_id,
       "subject_name"=>$req->subject_name,
       "subject_code"=>$req->subject_code,
       "class_name"=>$req->class_name,
       "academic_year"=>$req->academic_year
                ]);
            }

            return response()->json([
                'message'=>'teacher_subject updated',
                 'teacher_subject'=>$teacher_subject
            ],200);
    }

    function destroy($id)
    {
        $teacher_subject=TeacherSubject::find($id);
         if(!$teacher_subject)
            {
                return response()->json([
                    'message'=>'teacher_subject not found'
                ],404);
            }
            else{
                $teacher_subject->delete();
            }
            return response()->json([
                'message'=>'teacher_subject deleted'
            ],200);
    }
}
