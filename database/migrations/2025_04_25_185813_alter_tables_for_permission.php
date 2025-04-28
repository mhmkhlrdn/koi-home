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
        Schema::table('users', function (Blueprint $table){
            // $table->dropColumn('role');
            $table->foreignId('role_id');
        });

        Schema::rename('user_permission', 'role_permission');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
