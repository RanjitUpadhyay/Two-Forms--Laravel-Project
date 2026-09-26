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
        Schema::create('vehicle_bookings', function (Blueprint $table) {
            $table->id("booking_id");
             $table->unsignedBigInteger("vehicle_id");
             $table->string("customer_name",100);
              $table->string("phone",20);
               $table->date("booking_date");
                $table->string("booking_status",100);
                 $table->foreign("vehicle_id")
                 ->references("vehicle_id")
                 ->on("vehicles")
                 ->onUpdate("cascade")
                 ->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_bookings');
    }
};
