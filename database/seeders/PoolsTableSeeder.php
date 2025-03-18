<?php

namespace Database\Seeders;

use App\Models\Pool;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PoolsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pool::insert([
            ['name' => 'Alpha Pond', 'capacity' => 50, 'water_type' => 'freshwater', 'temperature' => 26.5, 'description' => 'Main breeding pond'],
            ['name' => 'Beta Pond', 'capacity' => 30, 'water_type' => 'saltwater', 'temperature' => 24.0, 'description' => 'Experimental breeding'],
            ['name' => 'Delta Pond', 'capacity' => 55, 'water_type' => 'saltwater', 'temperature' => 25.5, 'description' => 'Main container pond'],
            ['name' => 'Charlie Pond', 'capacity' => 60, 'water_type' => 'freshwater', 'temperature' => 25.0, 'description' => 'Secondary container pond'],

        ]);
    }
}