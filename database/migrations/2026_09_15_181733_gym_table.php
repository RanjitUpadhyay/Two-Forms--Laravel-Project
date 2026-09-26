<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gym_member', function(Blueprint $table)
        {
           $table->id('member_id');
           $table->string('memeber_name',100);
           $table->string('email',100);
           $table->string('Phone',20);
           $table->date('DOB');
           $table->enum('gender',['male','female']);
           $table->string('address',100);
           $table->string('member_status',100);
           $table->timestamps();

        });   
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
