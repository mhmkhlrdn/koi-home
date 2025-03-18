<?php

namespace Database\Seeders;

use App\Models\Measurement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MeasurementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Measurement::insert([
            ['name' => 'ml'],
            ['name' => 'grams'],
            ['name' => 'drops'],
        ]);
    }
}