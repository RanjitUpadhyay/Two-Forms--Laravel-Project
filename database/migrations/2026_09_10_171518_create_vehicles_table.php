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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id("vehicle_id");
            $table->string("vehicle_number",100);
            $table->enum("vehicle_type",["two_wheeler","four_wheeler"]);
            $table->string("brand",100);
            $table->string("model",100);
            $table->enum("status",["available","unavailable"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
