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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('breeders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('farm_name');
            $table->foreignId('country_id')->constrained('countries')->cascadeOnDelete();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
        });

        Schema::create('information', function (Blueprint $table) {
            $table->id();
            $table->string('logo_url')->nullable();
            $table->string('name');
            $table->string('addressLineOne');
            $table->string('addressLineTwo');
            $table->string('city');
            $table->string('province');
            $table->string('postalCode');
            $table->string('country');
            $table->timestamp('updated_at');
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