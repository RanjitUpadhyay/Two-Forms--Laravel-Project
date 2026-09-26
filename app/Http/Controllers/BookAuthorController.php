<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookAuthorRequest;
use App\Models\BookAuthor;

class BookAuthorController extends Controller
{
    function index()
    {
        $bookauthors=BookAuthor::with('boooks')->get();
        return response()->json($bookauthors);
    }

    function store(BookAuthorRequest $req)
    {
        $bookauthor=BookAuthor::create([
        "author_name"=>$req->author_name,
        "gender"=>$req->gender,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "country"=>$req->country
        ]);

        return response()->json([
            "message"=>"Author Created",
            "author"=>$bookauthor
        ],201);
    }

    function show($id)
    {
        $bookauthor=BookAuthor::with('boooks')->find($id);
        if(!$bookauthor)
            {
                return response()->json([
                    "message"=>"author not found"
                ],404);
            }
            else{
                return response()->json($bookauthor);
            }
    }

    function update(BookAuthorRequest $req, $id)
    {
        $bookauthor=BookAuthor::find($id);
         if(!$bookauthor)
            {
                return response()->json([
                    "message"=>"author not found"
                ],404);
            }
            else{
                $bookauthor->update([
        "author_name"=>$req->author_name,
        "gender"=>$req->gender,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "country"=>$req->country 
                ]);
                return response()->json([
                    "message"=>"author updated",
                    "author"=>$bookauthor
                ],200);
            }
    }

    function destroy($id)
    {
          $bookauthor=BookAuthor::find($id);
         if(!$bookauthor)
            {
                return response()->json([
                    "message"=>"author not found"
                ],404);
            }
            else{
                $bookauthor->delete();
                return response()->json([
                    "message"=>"author deleted"
                ],200);
            }
    }
}
