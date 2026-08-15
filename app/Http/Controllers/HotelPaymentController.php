<?php

namespace App\Http\Controllers;

use App\Models\HotelPayment;
use App\Http\Requests\HotelPaymentRequest;

class HotelPaymentController extends Controller
{
   function index()
   {
     $payments=HotelPayment::with('booking')->get();
    return response()->json($payments);
   }

   function store(HotelPaymentRequest $req)
   {
    $payment=HotelPayment::create([
        'booking_id'=>$req->booking_id,
        'payment_mode'=>$req->payment_mode,
        'payment_status'=>$req->payment_status,
        'total_amount'=>$req->total_amount,
    ]);

    return response()->json([
        'message'=>'Payment Created',
        'payment'=>$payment
    ],201);
   }

   function show($payment_id)
   {
    $payment=HotelPayment::with('booking')->find($payment_id);

    if(!$payment)
        {
            return response()->json([
                'message'=>'Payment Not Found'
            ],404);
        }

        else{
            return response()->json($payment);
        }
   }

   function update(HotelPaymentRequest $req, $payment_id)
   {
    $payment=HotelPayment::find($payment_id);
    if(!$payment)
        {
            return response()->json([
                'message'=>'Payment Not Found'
            ],404);
        }

        else{
            $payment->update([
        'booking_id'=>$req->booking_id,
        'payment_mode'=>$req->payment_mode,
        'payment_status'=>$req->payment_status,
        'total_amount'=>$req->total_amount,
            ]);

            return response()->json([
                'message'=>'Payment Updated',
                'payment'=>$payment
            ],200);
        }
   }

   function destroy($payment_id)
   {
     $payment=HotelPayment::find($payment_id);
    if(!$payment)
        {
            return response()->json([
                'message'=>'Payment Not Found'
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
