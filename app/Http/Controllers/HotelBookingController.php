<?php

namespace App\Http\Controllers;
use App\Models\HotelBooking;
use App\Http\Requests\HotelBookingRequest;

use Illuminate\Http\Request;

class HotelBookingController extends Controller
{
    function index()
    {
        $bookings=HotelBooking::with('payment')->get();
        return response()->json($bookings);
    }

    function store(HotelBookingRequest $req)
    {
        $booking=HotelBooking::create([
            'guest_name'=>$req->guest_name,
            'email'=>$req->email,
            'phone'=>$req->phone,
            'room_no'=>$req->room_no,
            'room_type'=>$req->room_type,
            'check_in'=>$req->check_in,
            'check_out'=>$req->check_out,
            'number_of_guests'=>$req->number_of_guests,
            'booking_status'=>$req->booking_status,
        ]);

        return response()->json([
            'message'=>'Booking Created',
            'booking'=>$booking
        ]);
    }

    function show($booking_id)
    {
        $booking=HotelBooking::with('payment')->find($booking_id);

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

    function update(HotelBookingRequest $req, $booking_id)
    {
        $booking=HotelBooking::find($booking_id);
         if(!$booking)
            {
                return response()->json([
                    'message'=>'Booking Not Found'
                ],404);
            }

            else{
                $booking->update([
            'guest_name'=>$req->guest_name,
            'email'=>$req->email,
            'phone'=>$req->phone,
            'room_no'=>$req->room_no,
            'room_type'=>$req->room_type,
            'check_in'=>$req->check_in,
            'check_out'=>$req->check_out,
            'number_of_guests'=>$req->number_of_guests,
            'booking_status'=>$req->booking_status,
                ]);
            }

            return response()->json([
                'message'=>'Booking Updated',
                'booking'=>$booking
            ],200);
    }


    function destroy($booking_id)
    {
     $booking=HotelBooking::find($booking_id);
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
