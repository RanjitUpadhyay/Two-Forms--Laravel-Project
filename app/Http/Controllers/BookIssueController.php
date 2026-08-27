<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\BookIssue;
use App\Http\Requests\BookIssueRequest;

class BookIssueController extends Controller
{
     function index()
    {
        $bookIssues=BookIssue::with('book')->get();
        return response()->json($bookIssues);
    }

    function store(BookIssueRequest $req)
    {
       try{
         $bookIssue=BookIssue::create([
            'book_id'=>$req->book_id,
            'student_name'=>$req->student_name,
            'gender'=>$req->gender,
            'student_phone'=>$req->student_phone,
            'issue_date'=>$req->issue_date,
            'return_date'=>$req->return_date,
            'issue_status'=>$req->issue_status
        ]);

        return response()->json([
            'message'=>'bookIssue Created',//'message' used in BookIssue.jsx catch block 
            'bookIssue'=>$bookIssue
        ],201);
       }

        catch (\Exception $e) {

        return response()->json([
            'message' => 'Book is already issued during this period.'
        ], 422);
    }
    }

    function show($id)
    {
        $bookIssue=BookIssue::with('book')->find($id);

        if(!$bookIssue)
            {
                return response()->json([
                    'message'=>'bookIssue Not Found'
                ],404);
            }

            else{
                return response()->json($bookIssue);
            }

    }

    function update(BookIssueRequest $req,$id)
    {    $bookIssue=BookIssue::find($id);
     
        if(!$bookIssue)
            {
                return response()->json([
                    'message'=>'bookIssue Not Found'
                ],404);
            } 
            
            else{
                $bookIssue->update([
            'book_id'=>$req->book_id,
            'student_name'=>$req->student_name,
            'gender'=>$req->gender,
            'student_phone'=>$req->student_phone,
            'issue_date'=>$req->issue_date,
            'return_date'=>$req->return_date,
            'issue_status'=>$req->issue_status
                ]);

                return response()->json([
                    'message'=>'bookIssue Updated',
                    'bookIssue'=>$bookIssue
                ],200);
            }
    }

    function destroy($id)
    {
         $bookIssue=BookIssue::find($id);
     
        if(!$bookIssue)
            {
                return response()->json([
                    'message'=>'bookIssue Not Found'
                ],404);
            } 

            else{
                $bookIssue->delete();
                return response()->json([
                'message'=>'bookIssue Deleted'
                ],200);
            }
    }
}
