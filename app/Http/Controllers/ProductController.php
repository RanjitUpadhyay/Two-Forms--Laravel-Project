<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    function index()
    {
        $products=Product::with('productOrders')->get();
        return response()->json($products);
    }

    function store(ProductRequest $req)
    {
        $product=Product::create([
        "product_name"=>$req->product_name,
        "product_code"=>$req->product_code,
        "category"=>$req->category,
        "price"=>$req->price,
        "quantity"=>$req->quantity,
        "status"=>$req->status
        ]);

        return response()->json([
            "message"=>"product added",
            "product"=>$product
        ],201);
    }

    function show($id)
    {
        $product=Product::with('productOrders')->find($id);

        if(!$product)
            {
                return response()->json([
                    "message"=>"product not found"
                ],404);
            }
            else{
               return response()->json($product);
            }
    }

    function update(ProductRequest $req, $id)
    {
        $product=Product::find($id);

        if(!$product)
            {
                return response()->json([
                    "message"=>"product not found"
                ],404);
            }
            else{
              $product->update([
        "product_name"=>$req->product_name,
        "product_code"=>$req->product_code,
        "category"=>$req->category,
        "price"=>$req->price,
        "quantity"=>$req->quantity,
        "status"=>$req->status
              ]);   
            }

            return response()->json([
                "message"=>"product updated",
                "product"=>$product
            ],200);

    }

    function destroy($id)
    {
        $product=Product::find($id);

        if(!$product)
            {
                return response()->json([
                    "message"=>"product not found"
                ],404);
            }
            else{
                $product->delete();
            } 
            return response()->json([
                "message"=>"product deleted"
            ],200);
    }
     
}
