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
        Schema::create('gym_membership', function(Blueprint $table)
        {
            $table->id('membership_id');
            $table->unsignedBigInteger('member_id');
            $table->string('memebership_type',100);
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('fee',10,2);
            $table->string('memebership_status',100);
             $table->timestamps();
              $table->foreign('member_id')
              ->references('member_id')
              ->on('gym_member')
              ->onUpdate('cascade')
              ->onDelete('cascade');
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
