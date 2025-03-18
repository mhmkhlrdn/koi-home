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
        Schema::create('types', function(Blueprint $table){
            $table->id();
            $table->string('type'); //for frontend same as fish_treatments method column
        });

        Schema::create('measurements', function(Blueprint $table){
            $table->id();
            $table->string('name');
        });

        Schema::create('medicines', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('amount');
            $table->foreignId('measurement_id')->constrained('measurements');
        });

        Schema::create('medicine_types', function (Blueprint $table){
            $table->id();
            $table->foreignId('medicine_id')->constrained('medicines')->cascadeOnDelete();
            $table->foreignId('type_id')->constrained('types')->cascadeOnDelete();

        });

        Schema::create('diseases', function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
        });

        Schema::create('treatments', function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->foreignId('disease_id')->constrained('diseases');
            $table->foreignId('medicine_id')->constrained('medicines');
            $table->string('description')->nullable();
        }); //this is basically a disease_medicine junction table

        Schema::create('fish_diseases', function(Blueprint $table) {
            $table->id();
            $table->foreignId('fish_id')->constrained('fishes')->cascadeOnDelete();
            $table->foreignId('disease_id')->constrained('diseases');
            $table->date('diagnosis_date');
            $table->date('recovery_date')->nullable();
            $table->foreignId('user_id')->constrained('users'); //who diagnosed it
        }); //sick fish table basically

        Schema::create('fish_treatments', function(Blueprint $table){
            $table->id();
            $table->foreignId('fish_disease_id')->constrained('fish_diseases')->cascadeOnDelete();
            $table->foreignId('treatment_id')->constrained('treatments');
            $table->string('frequency')->nullable();
            $table->string('dosage')->nullable();
            $table->string('method'); // for frontend add ['Topical', 'Injection', 'Oral', 'Bath', 'Other'] as combobox, if other, add an input field
            $table->foreignId('user_id')->constrained('users'); //who decided on the treatment
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
