<?php

namespace App\Http\Controllers;
use App\Http\Requests\CustomerRequest;
use App\Models\Customer;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers=Customer::with('accounts')->get();
        return response()->json($customers);

    }

    public function store(CustomerRequest $req)
    {
        $customer=Customer::create([
        "customer_name"=>$req->customer_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "gender"=>$req->gender,
        "DOB"=>$req->DOB,
        "address"=>$req->address,
        "status"=>$req->status
        ]);

        return response()->json([
            'message'=>'Customer Created',
            'customer'=>$customer
        ],201);
    }

    public function show($id)
    {
        $customer=Customer::with('accounts')->find($id);

        if(!$customer)
            {
                return response()->json([
                    'message'=>'Customer Not Found'
                ],404);
            }

            else return response()->json($customer);
    }

    public function update(CustomerRequest $req,$id)
    {
        $customer=Customer::find($id);

         if(!$customer)
            {
                return response()->json([
                    'message'=>'Customer Not Found'
                ],404);
            }
        else{
            $customer->update([
        "customer_name"=>$req->customer_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "gender"=>$req->gender,
        "DOB"=>$req->DOB,
        "address"=>$req->address,
        "status"=>$req->status
            ]);
            return response()->json([
                'message'=>'Customer Updated',
                'customer'=>$customer
            ],200);
    }

    
}

public function destroy($id)
    {
        $customer=Customer::find($id);
        
           if(!$customer)
            {
                return response()->json([
                    'message'=>'Customer Not Found'
                ],404);
            }
            
            else{
                $customer->delete();
            }
        return response()->json([
            'message'=>'Customer Deleted'
        ],200);
    }
}