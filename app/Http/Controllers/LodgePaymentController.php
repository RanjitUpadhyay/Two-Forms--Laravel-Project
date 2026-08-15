<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\LodgePaymentRequest;
use App\Models\LodgePayment;

class LodgePaymentController extends Controller
{
    function index()
    {
        $payments=LodgePayment::with('booking')->get();
        return response()->json($payments);
    }

    function show($id)
    {
        $payment=LodgePayment::find($id);

        if(!$payment)
            {
                return response()->json([
                    'message'=>'Payemnt Not Found'
                ],404);
            }

            else{
                return response()->json($payment);
            }
    }

    function store(LodgePaymentRequest $req)
    {
        $payment=LodgePayment::create([
            'booking_id'=>$req->booking_id,
            'payment_mode'=>$req->payment_mode,
            'payment_status'=>$req->payment_status,
            'total_amount'=>$req->total_amount
        ]);

        return response()->json([
            'message'=>"Payment Created",
            'payment'=>$payment
        ],201);
    }

    function update(LodgePaymentRequest $req,$id)
    {
        $payment=LodgePayment::find($id);
         if(!$payment)
            {
                return response()->json([
                    'message'=>'Payemnt Not Found'
                ],404);
            }

             else{
        $payment->update([
            'booking_id'=>$req->booking_id,
            'payment_mode'=>$req->payment_mode,
            'payment_status'=>$req->payment_status,
            'total_amount'=>$req->total_amount 
        ]);
           return response()->json([
            'message'=>'Payment Updated'
           ],200);

           }
    }

    function destroy($id)
    {
      $payment=LodgePayment::find($id);
         if(!$payment)
            {
                return response()->json([
                    'message'=>'Payemnt Not Found'
                ],404);
            }

            else{
                $payment->delete();

                return response()->json([
                    'message'=>'Payment Deleted'
                ],200);
            }
   
    }

   
}
