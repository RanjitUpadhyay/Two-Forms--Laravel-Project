<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LodgeBookingRequest;
use App\Models\HotelBooking;
use App\Models\LodgeBooking;

class LodgeBookingController extends Controller
{
    function index()
    {
        $bookings=LodgeBooking::with('payment')->get();
        return response()->json($bookings);
    }

    function store(LodgeBookingRequest $req)
    {
        $booking=LodgeBooking::create([
        'name'=>$req->name,
        'phone'=>$req->phone,
        'room_no'=>$req->room_no,
        'check_in'=>$req->check_in,
        'check_out'=>$req->check_out,
        'booking_status'=>$req->booking_status
        ]);

        return response()->json([
            'message'=>'Booking Created',
            'booking'=>$booking
        ],201);
    }

    function show($id)
    {
        $booking=LodgeBooking::find($id);
        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
            }

            else return response()->json($booking);
    }

    function update(LodgeBookingRequest $req, $id)
    {
         $booking=LodgeBooking::find($id);
        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
            }

        else{
        $booking->update([
        'name'=>$req->name,
        'phone'=>$req->phone,
        'room_no'=>$req->room_no,
        'check_in'=>$req->check_in,
        'check_out'=>$req->check_out,
        'booking_status'=>$req->booking_status
                ]);
                  return response()->json([
                    'message'=>'Booking Updated'
                ],200);
            }
    }

    

    function destroy($id)
    {
        $booking=LodgeBooking::find($id);
        if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
            }

            else{
                $booking->delete();
                return response()->json([
                    'message'=>'Booking Deleted'
                ],200);
            }
    }
}
