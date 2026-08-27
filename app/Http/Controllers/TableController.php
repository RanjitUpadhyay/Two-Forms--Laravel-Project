<?php

namespace App\Http\Controllers;
use App\Models\Table;
use App\Http\Requests\TableRequest;

use Illuminate\Http\Request;

class TableController extends Controller
{
    function index()
    {
        $tables=Table::with('reservations')->get();
        return response()->json($tables);
    }

    function store(TableRequest $req)
    {
        $table=Table::create([
        "table_number"=>$req->table_number,
        "capacity"=>$req->capacity,
        "table_status"=>$req->table_status
        ]);

        return response()->json([
            'message'=>'table created',
            'table'=>$table
        ],201);
    }

    function show($id)
    {
        $table=Table::with('reservations')->find($id);

        if(!$table)
            {
                return response()->json([
                    'message'=>'table not found'
                ],404);
            }
            else{
                return response()->json($table);
            }
    }

    function update(TableRequest $req, $id)
    {
        $table=Table::find($id);
         if(!$table)
            {
                return response()->json([
                    'message'=>'table not found'
                ],404);
            }

            else{
                $table->update([
        "table_number"=>$req->table_number,
        "capacity"=>$req->capacity,
        "table_status"=>$req->table_status
                ]);
            }
            return response()->json([
                'message'=>'table updated',
                'table'=>$table
            ],200);
    }

    function destroy($id)
    {
         $table=Table::find($id);
         if(!$table)
            {
                return response()->json([
                    'message'=>'table not found'
                ],404);
            }
            else{
                $table->delete();
            }
            return response()->json([
                'message'=>'table deleted'
            ],200);
    }
}
