<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\VehicleRequest;

class VehicleController extends Controller
{
    function index()
    {
        $vehicles=Vehicle::with('bookings')->get();
        return response()->json($vehicles);
    }

    function store(VehicleRequest $req)
    {
        $vehicle=Vehicle::create([
        "vehicle_number"=>$req->vehicle_number,
        "vehicle_type"=>$req->vehicle_type,
        "brand"=>$req->brand,
        "model"=>$req->model,
        "status"=>$req->status
        ]);

        return response()->json([
            "message"=>"vehicle created",
            "data"=>$vehicle
        ],201);
    }

    function show($id)
    {
        $vehicle=Vehicle::with('bookings')->find($id);
        if(!$vehicle)
            {
                return response()->json([
                    "message"=>"vehicle not found"
                ],404);
            }
            else{
                return response()->json($vehicle);
            }
            
    }

    function update(VehicleRequest $req, $id)
    {
        $vehicle=Vehicle::find($id);
         if(!$vehicle)
            {
                return response()->json([
                    "message"=>"vehicle not found"
                ],404);
            }
            else{
                $vehicle->update([
        "vehicle_number"=>$req->vehicle_number,
        "vehicle_type"=>$req->vehicle_type,
        "brand"=>$req->brand,
        "model"=>$req->model,
        "status"=>$req->status
                ]);
            }
            return response()->json([
                "message"=>"vehicle updated",
                "data"=>$vehicle
            ],200);
    }

    function destroy($id)
    {
         $vehicle=Vehicle::find($id);
         if(!$vehicle)
            {
                return response()->json([
                    "message"=>"vehicle not found"
                ],404);
            }
            else{
                $vehicle->delete();
            }
            return response()->json([
                "message"=>"vehicle deleted"
            ],200);
    }
}
