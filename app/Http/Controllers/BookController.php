<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Models\Book;

use Illuminate\Http\Request;

class BookController extends Controller
{
    function index()
    {
        $books=Book::with('issues')->get();
        return response()->json($books);
    }

    function store(BookRequest $req)
    {
        $book=Book::create([
            'book_name'=>$req->book_name,
            'category'=>$req->category,
            'price'=>$req->price,
            'status'=>$req->status
        ]);

        return response()->json([
            'message'=>'Book Created',
            'book'=>$book
        ],201);
    }

    function show($id)
    {
        $book=Book::with('issues')->find($id);

        if(!$book)
            {
                return response()->json([
                    'message'=>'Book Not Found'
                ],404);
            }

            else{
                return response()->json($book);
            }

    }

    function update(BookRequest $req,$id)
    {    $book=Book::find($id);
     
        if(!$book)
            {
                return response()->json([
                    'message'=>'Book Not Found'
                ],404);
            } 
            
            else{
                $book->update([
            'book_name'=>$req->book_name,
            'category'=>$req->category,
            'price'=>$req->price,
            'status'=>$req->status
                ]);

                return response()->json([
                    'message'=>'Book Updated',
                    'book'=>$book
                ],200);
            }
    }

    function destroy($id)
    {
         $book=Book::find($id);
     
        if(!$book)
            {
                return response()->json([
                    'message'=>'Book Not Found'
                ],404);
            } 

            else{
                $book->delete();
                return response()->json([
                'message'=>'Book Deleted'
                ],200);
            }
    }
}
