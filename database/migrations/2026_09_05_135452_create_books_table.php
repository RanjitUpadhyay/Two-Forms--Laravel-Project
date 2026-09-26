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
        Schema::create('boooks', function (Blueprint $table) {
            $table->id('boooks_id');
            $table->unsignedBigInteger('author_id');
           $table->string('book_title',100);
           $table->date('publication_date');
           $table->decimal('price',10,2);
           $table->integer('quantity');

           $table->timestamps();

           $table->foreign('author_id')
           ->references('author_id')
           ->on('authors')
           ->onUpdate('cascade')
           ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boooks');
    }
};
