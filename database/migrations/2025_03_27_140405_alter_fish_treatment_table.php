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
        Schema::create('next_treatment_schedules', function(Blueprint $table){
            $table->id();
            $table->datetime('datetime');
            $table->foreignId('fish_treatment_id')->constrained('fish_treatments');
        });

        Schema::table('fish_treatments', function (Blueprint $table){
$table->dropColumn('frequency');
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