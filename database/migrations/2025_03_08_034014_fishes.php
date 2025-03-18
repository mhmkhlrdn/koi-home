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

        Schema::create('bloodlines', function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('varieties', function(Blueprint $table){
            $table->id();
            $table->string('name');
});

        Schema::create('pools', function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->integer('capacity');
            $table->enum('water_type', ['freshwater','saltwater']);
            $table->double('temperature')->nullable();
            $table->string('description')->nullable();
        });

        Schema::create('fishes', function (Blueprint $table){
            $table->id();
            $table->string('code');
            $table->foreignId('bloodline_id')->constrained('bloodlines');
            $table->foreignId('variety_id')->constrained('varieties');
            $table->enum('sale_type', ['auction','fixed_price', 'not_for_sale']);
            $table->enum('gender', ['male', 'female', 'unknown']);
            $table->integer('fixedPrice')->nullable();
            $table->date('birthDate');
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('pool_id')->constrained('pools');

        });

        Schema::create('fish_growth', function(Blueprint $table){
            $table->id();
            $table->foreignId('fish_id')->constrained('fishes');
            $table->double('length');
            $table->timestamp('recorded_at');
            $table->string('photoUrl')->nullable();
            $table->foreignId('user_id')->constrained('users');
        });

        Schema::create('fish_lineages', function (Blueprint $table){
            $table->id();
            $table->foreignId('child_fish_id')->constrained('fishes');
            $table->foreignId('parent_fish_id')->constrained('fishes');
            $table->enum('relation', ['mother', 'father']);
            $table->unique(['child_fish_id', 'parent_fish_id']);
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