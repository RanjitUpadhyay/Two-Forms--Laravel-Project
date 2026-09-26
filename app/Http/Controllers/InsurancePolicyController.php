<?php

namespace App\Http\Controllers;

use App\Models\InsurancePolicy;
use App\Http\Requests\InsurancePolicyRequest;

class InsurancePolicyController extends Controller
{
    function index()
    {
        $policies=InsurancePolicy::with('insurance')->get();
        return response()->json($policies);
    }

    function store(InsurancePolicyRequest $req)
    {
        $policy=InsurancePolicy::create([
       "customer_id"=>$req->customer_id,
        "policy_number"=>$req->policy_number,
        "policy_type"=>$req->policy_type,
        "premium_amount"=>$req->premium_amount,
        "start_date"=>$req->start_date,
        "end_date"=>$req->end_date,
        "policy_status"=>$req->policy_status
        ]);
        return response()->json([
            "message"=>"policy created",
            "data"=>$policy
        ],201);
    }

    function show($id)
    {
        $policy=InsurancePolicy::with('insurance')->find($id);
        if(!$policy)
            {
                return response()->json([
                    "message"=>"policy not found",
                ],404);
            }
            else{
                return response()->json($policy);
            }
    }

    function update(InsurancePolicyRequest $req, $id)
    {
        $policy=InsurancePolicy::find($id);
        if(!$policy)
            {
                return response()->json([
                    "message"=>"policy not found",
                ],404);
            }
            else{
                $policy->update([
       "customer_id"=>$req->customer_id,
        "policy_number"=>$req->policy_number,
        "policy_type"=>$req->policy_type,
        "premium_amount"=>$req->premium_amount,
        "start_date"=>$req->start_date,
        "end_date"=>$req->end_date,
        "policy_status"=>$req->policy_status
                ]);
            }
            return response()->json([
                "message"=>"policy updated",
                "data"=>$policy
            ],200);
    }

    function destroy($id)
    {
     $policy=InsurancePolicy::find($id);
        if(!$policy)
            {
                return response()->json([
                    "message"=>"policy not found",
                ],404);
            }

            else{
                $policy->delete();
                return response()->json([
                    "message"=>"policy deleted"
                ],200);
            }
    }
}
