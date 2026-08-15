<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\HostelBookingRequest;
use App\Models\HostelBooking;

class HotselBoookingController extends Controller
{
    function index()
    {
        $bookings=HostelBooking::with('payment')->get();
        return response()->json($bookings);
    }

    function show($id)
    {
        $booking=HostelBooking::with('payment')->find($id);

        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
                }

                else{
                    return response()->json($booking);
                }
    }

    function store(HostelBookingRequest $req)
    {
        $booking=HostelBooking::create([
            'name'=>$req->name,
            'gender'=>$req->gender,
            'phone'=>$req->phone,
            'email'=>$req->email,
            'room_no'=>$req->room_no,
            'check_in'=>$req->check_in,
            'check_out'=>$req->check_out
        ]);

        return response()->json([
            'message'=>'Booking Created',
            'booking'=>$booking
        ],201);
    }

    function update(HostelBookingRequest $req, $id)
    {
      $booking=HostelBooking::find($id);

        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
                }
                
                else{
            $booking->update([
            'name'=>$req->name,
            'gender'=>$req->gender,
            'phone'=>$req->phone,
            'email'=>$req->email,
            'room_no'=>$req->room_no,
            'check_in'=>$req->check_in,
            'check_out'=>$req->check_out
                    ]);
                }
                return response()->json([
                    'message'=>'Booking Updated',
                    'booking'=>$booking
                ],200);
    }

    function destroy($id)
    {
         $booking=HostelBooking::find($id);

        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
                }

                else{
                    $booking->delete();
                }

                return response()->json([
                    'message'=>'Booking Deleted'
                ]);
    }

        
}

