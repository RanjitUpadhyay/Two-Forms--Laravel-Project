<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountRequest;
use App\Models\Account;

use Illuminate\Http\Request;

class AccountController extends Controller
{
     public function index()
    {
        $accounts=Account::with('customer')->get();
        return response()->json($accounts);

    }

    public function store(AccountRequest $req)
    {
        $account=Account::create([
       "customer_id"=>$req->customer_id,
       "account_number"=>$req->account_number,
       "account_type"=>$req->account_type,
       "balance"=>$req->balance,
       "opening_date"=>$req->opening_date
        ]);

        return response()->json([
            'message'=>'account Created',
            'account'=>$account
        ],201);
    }

    public function show($id)
    {
        $account=Account::with('customer')->find($id);

        if(!$account)
            {
                return response()->json([
                    'message'=>'account Not Found'
                ],404);
            }

            else return response()->json($account);
    }

    public function update(AccountRequest $req,$id)
    {
        $account=Account::find($id);

         if(!$account)
            {
                return response()->json([
                    'message'=>'account Not Found'
                ],404);
            }
        else{
            $account->update([
       "customer_id"=>$req->customer_id,
       "account_number"=>$req->account_number,
       "account_type"=>$req->account_type,
       "balance"=>$req->balance,
       "opening_date"=>$req->opening_date
            ]);
            return response()->json([
                'message'=>'account Updated',
                'account'=>$account
            ],200);
    }

    
}

public function destroy($id)
    {
        $account=Account::find($id);
        
           if(!$account)
            {
                return response()->json([
                    'message'=>'account Not Found'
                ],404);
            }
            
            else{
                $account->delete();
            }
        return response()->json([
            'message'=>'account Deleted'
        ],200);
    }
}
