<?php

namespace App\Http\Controllers;
use App\Models\TableReservation;
use App\Http\Requests\TableReservationRequest;

use Illuminate\Http\Request;

class TableReservationController extends Controller
{
     function index()
    {
        $tableReservations=TableReservation::with('table')->get();
        return response()->json($tableReservations);
    }

    function store(TableReservationRequest $req)
    {
        $tableReservation=TableReservation::create([
        "table_id"=>$req->table_id,
       "customer_name"=>$req->customer_name,
       "phone"=>$req->phone,
       "reservation_date"=>$req->reservation_date,
       "number_of_guests"=>$req->number_of_guests,
       "reservation_status"=>$req->reservation_status
        ]);

        return response()->json([
            'message'=>'tableReservation created',
            'table'=>$tableReservation
        ],201);
    }

    function show($id)
    {
        $tableReservation=TableReservation::with('table')->find($id);

        if(!$tableReservation)
            {
                return response()->json([
                    'message'=>'tableReservation not found'
                ],404);
            }
            else{
                return response()->json($tableReservation);
            }
    }

    function update(TableReservationRequest $req,$id)
    {
        $tableReservation=TableReservation::find($id);
         if(!$tableReservation)
            {
                return response()->json([
                    'message'=>'tableReservation not found'
                ],404);
            }

            else{
                $tableReservation->update([
        "table_id"=>$req->table_id,
       "customer_name"=>$req->customer_name,
       "phone"=>$req->phone,
       "reservation_date"=>$req->reservation_date,
       "number_of_guests"=>$req->number_of_guests,
       "reservation_status"=>$req->reservation_status
                ]);
            }
            return response()->json([
                'message'=>'tableReservation updated',
                'table'=>$tableReservation
            ],200);
    }

    function destroy($id)
    {
         $tableReservation=TableReservation::find($id);
         if(!$tableReservation)
            {
                return response()->json([
                    'message'=>'tableReservation not found'
                ],404);
            }
            else{
                $tableReservation->delete();
            }
            return response()->json([
                'message'=>'tableReservation deleted'
            ],200);
    }
}
