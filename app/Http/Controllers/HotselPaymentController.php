<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\HostelPaymentRequest;
use App\Models\HostelPayment;

class HotselPaymentController extends Controller
{
       function index()
    {
        $payments=HostelPayment::with('booking')->get();
        return response()->json($payments);
    }

    function show($id)
    {
        $payment=HostelPayment::with('booking')->find($id);

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

    function store(HostelPaymentRequest $req)
    {
        $payment=HostelPayment::create([
            'booking_id'=>$req->booking_id,
            'payment_status'=>$req-> payment_status,
            'payment_mode'=>$req->payment_mode,
            'total_bill'=>$req->total_bill]);

        return response()->json([
            'message'=>'Payment Created',
            'payment'=>$payment
        ],201);
    }

    function update(HostelPaymentRequest $req, $id)
    {
      $payment=HostelPayment::find($id);

        if(!$payment)
            {
                return response()->json([
                    'message'=>'Payment Not Found'
                ],404);
                }
                
                else{
            $payment->update([
            'booking_id'=>$req->booking_id,
            'payment_status'=>$req-> payment_status,
            'payment_mode'=>$req->payment_mode,
            'total_bill'=>$req->total_bill]);
                }
                return response()->json([
                    'message'=>'Payment Updated',
                    'payment'=>$payment
                ],200);
    }

    function destroy($id)
    {
         $payment=HostelPayment::find($id);

        if(!$payment)
            {
                return response()->json([
                    'message'=>'Payment Not Found'
                ],404);
                }

                else{
                    $payment->delete();
                }

                return response()->json([
                    'message'=>'Payment Deleted'
                ]);
    }

        
}

