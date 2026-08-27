<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\EventRegistration;
use App\Http\Requests\EventRegistrationRequest;

class EventRegistrationController extends Controller
{
       function index()
    {
        $event_registrations=EventRegistration::with('events')->get();
        return response()->json($event_registrations);

    }

    function store(EventRegistrationRequest $req)
    {
        $event_registration=EventRegistration::create([
        "event_id"=>$req->event_id,
        "participant_name"=>$req->participant_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "registration_date"=>$req->registration_date,
        "registration_status"=>$req->registration_status
        ]);

        return response()->json([
            'message'=>'event created',
            'event'=>$event_registration
        ],201);
    }

    function show($id)
    {
        $event_registration=EventRegistration::with('events')->find($id);

        if(!$event_registration)
            {
                return response()->json([
                    'message'=>'event not found'
                ],404);
            }

            else{
                return response($event_registration);
            }
    }

    function update(EventRegistrationRequest $req, $id)
    {
         $event_registration=EventRegistration::find($id);
          if(!$event_registration)
            {
                return response()->json([
                    'message'=>'event not found'
                ],404);
            }

            else{
                $event_registration->update([
        "event_id"=>$req->event_id,
        "participant_name"=>$req->participant_name,
        "email"=>$req->email,
        "phone"=>$req->phone,
        "registration_date"=>$req->registration_date,
        "registration_status"=>$req->registration_status
                ]);

                return response()->json([
                    'message'=>'event updated'
                ],200);
            }
    }

    function destroy($id)
    {
          $event_registration=EventRegistration::find($id);
          if(!$event_registration)
            {
                return response()->json([
                    'message'=>'event not found'
                ],404);
            }

             else{
        $event_registration->delete();
        return response()->json([
            'message'=>'event deleted'
        ],200);
    }

    }
}
