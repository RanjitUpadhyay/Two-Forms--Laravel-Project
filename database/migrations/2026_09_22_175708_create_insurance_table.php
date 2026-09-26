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
        Schema::create('insurance', function (Blueprint $table) {
            $table->id("customer_id");
            $table->string("customer_name",100);
            $table->string("email",100);
            $table->string("phone",20);
            $table->date("DOB");
            $table->enum("gender",["male","female"]);
            $table->string("address",100);
            $table->string("customer_status",100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance');
    }
};
