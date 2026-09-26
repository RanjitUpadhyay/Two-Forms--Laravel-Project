<?php

namespace App\Http\Controllers;

use App\Models\VehicleBooking;
use App\Http\Requests\VehicleBookingRequest;

class VehicleBookingController extends Controller
{
    function index()
    {
        $vehicle_bookings=VehicleBooking::with('vehicle')->get();
        return response()->json($vehicle_bookings);
    }

    function store(VehicleBookingRequest $req)
    {
        $vehicle_booking=VehicleBooking::create([
        "vehicle_id"=>$req->vehicle_id,
        "customer_name"=>$req->customer_name,
        "phone"=>$req->phone,
        "booking_date"=>$req->booking_date,
        "booking_status"=>$req->booking_status,
        ]);

        return response()->json([
            "message"=>"vehicle_booking created",
            "data"=>$vehicle_booking
        ],201);
    }

    function show($id)
    {
        $vehicle_booking=VehicleBooking::with('vehicle')->find($id);
        if(!$vehicle_booking)
            {
                return response()->json([
                    "message"=>"vehicle_booking not found"
                ],404);
            }
            else{
                return response()->json($vehicle_booking);
            }
            
    }

    function update(VehicleBookingRequest $req, $id)
    {
        $vehicle_booking=VehicleBooking::find($id);
         if(!$vehicle_booking)
            {
                return response()->json([
                    "message"=>"vehicle_booking not found"
                ],404);
            }
            else{
                $vehicle_booking->update([
        "vehicle_id"=>$req->vehicle_id,
        "customer_name"=>$req->customer_name,
        "phone"=>$req->phone,
        "booking_date"=>$req->booking_date,
        "booking_status"=>$req->booking_status,
                ]);
            }
            return response()->json([
                "message"=>"vehicle_booking updated",
                "data"=>$vehicle_booking
            ],200);
    }

    function destroy($id)
    {
         $vehicle_booking=VehicleBooking::find($id);
         if(!$vehicle_booking)
            {
                return response()->json([
                    "message"=>"vehicle_booking not found"
                ],404);
            }
            else{
                $vehicle_booking->delete();
            }
            return response()->json([
                "message"=>"vehicle_booking deleted"
            ],200);
    }
}
