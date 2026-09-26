<?php

namespace App\Http\Controllers;

use App\Http\Requests\GymRequest;

use App\Models\Gym;

class GymController extends Controller
{
    function index()
    {
        $members=Gym::with('membership')->get();
        return response()->json($members);
    }

    function store(GymRequest $req)
    {
        $member=Gym::create([
        "memeber_name"=>$req->memeber_name,
        "email"=>$req->email,
        "Phone"=>$req->Phone,
        "DOB"=>$req->DOB,
        "gender"=>$req->gender,
        "address"=>$req->address,
        "member_status"=>$req->member_status
        ]);
        return response()->json([
            "message"=>"member created",
            "data"=>$member
        ],201);
    }

    function show($id)
    {
        $member=Gym::with('membership')->find($id);
        if(!$member)
            {
                return response()->json([
                    "message"=>"memeber not found"
                ],404);
            }
            else{
                return response()->json($member);
            }
    }

    function update(GymRequest $req,$id)
    {
        $member=Gym::find($id);
        
           if(!$member)
            {
                return response()->json([
                    "message"=>"memeber not found"
                ],404);
            }

        else{
            $member->update([
        "memeber_name"=>$req->memeber_name,
        "email"=>$req->email,
        "Phone"=>$req->Phone,
        "DOB"=>$req->DOB,
        "gender"=>$req->gender,
        "address"=>$req->address,
        "member_status"=>$req->member_status
            ]);
        }
        return response()->json([
            "message"=>"member updated",
            "data"=>$member
        ],200);
    }

    function destroy($id)
    {
        $member=Gym::find($id);
        
           if(!$member)
            {
                return response()->json([
                    "message"=>"memeber not found"
                ],404);
            }
            else{
                $member->delete();
            } 
            return response()->json([
                "message"=>"member deleted"
            ],200);
    }
}
