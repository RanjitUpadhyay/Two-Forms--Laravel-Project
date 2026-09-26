<?php

namespace App\Http\Controllers;

use App\Http\Requests\GymMemberRequest;
use App\Models\GymMember;

class GymMemberController extends Controller
{
     function index()
    {
        $memberships=GymMember::with('member')->get();
        return response()->json($memberships);
    }

    function store(GymMemberRequest $req)
    {
        $membership=GymMember::create([
       "member_id"=>$req->member_id,
       "memebership_type"=>$req->memebership_type,
       "start_date"=>$req->start_date,
       "end_date"=>$req->end_date,
       "fee"=>$req->fee,
       "memebership_status"=>$req->memebership_status
        ]);
        return response()->json([
            "message"=>"membership created",
            "data"=>$membership
        ],201);
    }

    function show($id)
    {
        $membership=GymMember::with('member')->find($id);
        if(!$membership)
            {
                return response()->json([
                    "message"=>"membership not found"
                ],404);
            }
            else{
                return response()->json($membership);
            }
    }

    function update(GymMemberRequest $req,$id)
    {
        $membership=GymMember::find($id);
        
           if(!$membership)
            {
                return response()->json([
                    "message"=>"membership not found"
                ],404);
            }

        else{
            $membership->update([
        "member_id"=>$req->member_id,
       "memebership_type"=>$req->memebership_type,
       "start_date"=>$req->start_date,
       "end_date"=>$req->end_date,
       "fee"=>$req->fee,
       "memebership_status"=>$req->memebership_status
            ]);
        }
        return response()->json([
            "message"=>"member updated",
            "data"=>$membership
        ],200);
    }

    function destroy($id)
    {
        $membership=GymMember::find($id);
        
           if(!$membership)
            {
                return response()->json([
                    "message"=>"membership not found"
                ],404);
            }
            else{
                $membership->delete();
            } 
            return response()->json([
                "message"=>"membership deleted"
            ],200);
    }
}
