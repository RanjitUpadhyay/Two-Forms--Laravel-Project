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
        Schema::create('insurance_policy', function (Blueprint $table) {
            $table->id("policy_id");
            $table->unsignedBigInteger("customer_id");
            $table->string("policy_number",100);
            $table->string("policy_type",100);
            $table->decimal("premium_amount",10,2);
            $table->date("start_date");
            $table->date("end_date");
            $table->string("policy_status");
            $table->timestamps();
             $table->foreign("customer_id")
             ->references("customer_id")
             ->on("insurance")
             ->onUpdate("cascade")
             ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_policy');
    }
};
