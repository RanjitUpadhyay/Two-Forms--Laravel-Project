<?php

namespace App\Http\Controllers;

use App\Models\Insurance;
use App\Http\Requests\InsuranceRequest;

use function Pest\Laravel\json;

class InsuranceController extends Controller
{
    function index()
    {
        $customers=Insurance::with('policiess')->get();
        return response()->json($customers);
    }

    function store(InsuranceRequest $req)
    {
        $customer=Insurance::create([
        "customer_name"=>$req->customer_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "DOB"=>$req->DOB,
        "gender"=>$req->gender,
        "address"=>$req->address,
        "customer_status"=>$req->customer_status
        ]);
        return response()->json([
            "message"=>"customer created",
            "data"=>$customer
        ],201);
    }

    function show($id)
    {
        $customer=Insurance::with('policiess')->find($id);
        if(!$customer)
            {
                return response()->json([
                    "message"=>"customer not found",
                ],404);
            }
            else{
                return response()->json($customer);
            }
    }

    function update(InsuranceRequest $req, $id)
    {
        $customer=Insurance::find($id);
        if(!$customer)
            {
                return response()->json([
                    "message"=>"customer not found",
                ],404);
            }
            else{
                $customer->update([
        "customer_name"=>$req->customer_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "DOB"=>$req->DOB,
        "gender"=>$req->gender,
        "address"=>$req->address,
        "customer_status"=>$req->customer_status
                ]);
            }
            return response()->json([
                "message"=>"customer updated",
                "data"=>$customer
            ],200);
    }

    function destroy($id)
    {
     $customer=Insurance::find($id);
        if(!$customer)
            {
                return response()->json([
                    "message"=>"customer not found",
                ],404);
            }

            else{
                $customer->delete();
                return response()->json([
                    "message"=>"customer deleted"
                ],200);
            }
    }
}
