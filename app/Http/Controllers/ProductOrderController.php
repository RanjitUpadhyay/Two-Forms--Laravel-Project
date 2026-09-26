<?php

namespace App\Http\Controllers;

use App\Models\ProductOrder;
use App\Http\Requests\ProductOrderRequest;

class ProductOrderController extends Controller
{
    function index()
    {
        $productorders=ProductOrder::with('product')->get();
        return response()->json($productorders);
    }

    function store(ProductOrderRequest $req)
    {
        $productorder=ProductOrder::create([
       "product_id"=>$req->product_id,
       "order_number"=>$req->order_number,
       "order_quantity"=>$req->order_quantity,
       "unit_price"=>$req->unit_price,
       "total_amount"=>$req->total_amount
        ]);

        return response()->json([
            "message"=>"productorder added",
            "product"=>$productorder
        ],201);
    }

    function show($id)
    {
        $productorder=ProductOrder::with('product')->find($id);

        if(!$productorder)
            {
                return response()->json([
                    "message"=>"productorder not found"
                ],404);
            }
            else{
               return response()->json($productorder);
            }
    }

    function update(ProductOrderRequest $req, $id)
    {
        $productorder=ProductOrder::find($id);

        if(!$productorder)
            {
                return response()->json([
                    "message"=>"productorder not found"
                ],404);
            }
            else{
              $productorder->update([
       "product_id"=>$req->product_id,
       "order_number"=>$req->order_number,
       "order_quantity"=>$req->order_quantity,
       "unit_price"=>$req->unit_price,
       "total_amount"=>$req->total_amount
              ]);   
            }

            return response()->json([
                "message"=>"productorder updated",
                "product"=>$productorder
            ],200);

    }

    function destroy($id)
    {
        $productorder=ProductOrder::find($id);

        if(!$productorder)
            {
                return response()->json([
                    "message"=>"productorder not found"
                ],404);
            }
            else{
                $productorder->delete();
            } 
            return response()->json([
                "message"=>"productorder deleted"
            ],200);
    }
}
