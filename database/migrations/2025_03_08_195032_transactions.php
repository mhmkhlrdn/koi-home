<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function(Blueprint $table){
            $table->id();
            $table->integer('total_price');
            $table->foreignId('customer_id')->constrained('customers');
            $table->timestamp('transaction_time');
            $table->enum('payment_status', ['pending', 'paid', 'canceled']);
        });
        Schema::create('auctions', function(Blueprint $table){
            $table->id();
            $table->foreignId('fish_id')->constrained('fishes')->cascadeOnDelete();
            $table->integer('starting_price');
            $table->integer('highest_bid');
            $table->integer('bid_increment');
            $table->timestamp('end_time');
            $table->foreignId('transaction_id')->constrained('transactions');
            $table->enum('auction_status', ['ongoing', 'completed', 'canceled']);
        });
        Schema::create('transaction_fishes', function(Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained('transactions');
            $table->foreignId('fish_id')->constrained('fishes');
            $table->integer('price');
        });
        Schema::create('auction_bids', function(Blueprint $table){
            $table->id();
            $table->foreignId('auction_id')->constrained('auctions');
            $table->foreignId('customer_id')->constrained('customers');
            $table->integer('bid_amount');
            $table->timestamp('bid_time');
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