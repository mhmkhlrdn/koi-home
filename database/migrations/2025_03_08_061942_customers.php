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
        Schema::create('addresses', function (Blueprint $table){
            $table->id();
            $table->string('address_line_one')->nullable();
            $table->string('address_line_two')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('postal_code')->nullable();
            $table->foreignId('country_id')->constrained('countries');
        });

        Schema::create('customers', function (Blueprint $table){
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->timestamp('email_verified_at');
            $table->string('password');
            $table->string('phone')->nullable();
            $table->foreignId('address_id')->nullable()->constrained('addresses');
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