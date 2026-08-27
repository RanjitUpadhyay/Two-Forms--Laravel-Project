<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;

use Illuminate\Http\Request;

class EventController extends Controller
{
    function index()
    {
        $events=Event::with('registration')->get();
        return response()->json($events);

    }

    function store(EventRequest $req)
    {
        $event=Event::create([
        "event_name"=>$req->event_name,
        "event_date"=>$req->event_date,
        "venue_organizer"=>$req->venue_organizer,
        "event_status"=>$req->event_status
        ]);

        return response()->json([
            'message'=>'event created',
            'event'=>$event
        ],201);
    }

    function show($id)
    {
        $event=Event::with('registration')->find($id);

        if(!$event)
            {
                return response()->json([
                    'message'=>'event not found'
                ],404);
            }

            else{
                return response($event);
            }
    }

    function update(EventRequest $req, $id)
    {
         $event=Event::find($id);
          if(!$event)
            {
                return response()->json([
                    'message'=>'event not found'
                ],404);
            }

            else{
                $event->update([
        "event_name"=>$req->event_name,
        "event_date"=>$req->event_date,
        "venue_organizer"=>$req->venue_organizer,
        "event_status"=>$req->event_status
                ]);

                return response()->json([
                    'message'=>'event updated'
                ],200);
            }
    }

    function destroy($id)
    {
          $event=Event::find($id);
          if(!$event)
            {
                return response()->json([
                    'message'=>'event not found'
                ],404);
            }

             else{
        $event->delete();
        return response()->json([
            'message'=>'event deleted'
        ],200);
    }

    }

   
}
