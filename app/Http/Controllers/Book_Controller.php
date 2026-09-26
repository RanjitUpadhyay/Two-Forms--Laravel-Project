<?php

namespace App\Http\Controllers;

use App\Models\Book_;
use App\Http\Requests\Book_Request;

class Book_Controller extends Controller
{
     function index()
    {
        $boooks=Book_::with('author')->get();
        return response()->json($boooks);
    }

    function store(Book_Request $req)
    {
        $boooks=Book_::create([
        "author_id"=>$req->author_id,
       "book_title"=>$req->book_title,
       "publication_date"=>$req->publication_date,
       "price"=>$req->price,
       "quantity"=>$req->quantity
        ]);

        return response()->json([
            "message"=>"boooks Created",
            "boooks"=>$boooks
        ],201);
    }

    function show($id)
    {
        $boooks=Book_::with('author')->find($id);
        if(!$boooks)
            {
                return response()->json([
                    "message"=>"boooks not found"
                ],404);
            }
            else{
                return response()->json($boooks);
            }
    }

    function update(Book_Request $req, $id)
    {
        $boooks=Book_::find($id);
         if(!$boooks)
            {
                return response()->json([
                    "message"=>"boooks not found"
                ],404);
            }
            else{
                $boooks->update([
       "author_id"=>$req->author_id,
       "book_title"=>$req->book_title,
       "publication_date"=>$req->publication_date,
       "price"=>$req->price,
       "quantity"=>$req->quantity
                ]);
                return response()->json([
                    "message"=>"boooks updated",
                    "author"=>$boooks
                ],200);
            }
    }

    function destroy($id)
    {
          $boooks=Book_::find($id);
         if(!$boooks)
            {
                return response()->json([
                    "message"=>"boooks not found"
                ],404);
            }
            else{
                $boooks->delete();
                return response()->json([
                    "message"=>"boooks deleted"
                ],200);
            }
    }
}
