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
        Schema::create('treatment_frequency', function(Blueprint $table){
            $table->id();
            $table->integer('interval_in_hours');
            $table->timestamps();

        });

        Schema::table('fish_treatment', function (Blueprint $table){
$table->dropColumn('frequency');
$table->foreignId('frequency_id')->constrained('treatment_frequency')->nullable();
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
