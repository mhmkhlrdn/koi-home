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
        Schema::create('breeding_requests', function (Blueprint $table){
            $table->id();
            $table->foreignId('requested_breeder_id')->constrained('breeders')->cascadeOnDelete();
            $table->foreignId('requested_fish_id')->constrained('fishes')->cascadeOnDelete();
            $table->foreignId('requester_fish_id')->constrained('fishes')->cascadeOnDelete();
            $table->enum('status', ['pending', 'accepted', 'rejected', 'completed']);
            $table->timestamp('request_date');
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