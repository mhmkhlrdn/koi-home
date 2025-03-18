<?php

namespace Database\Seeders;

use App\Models\Medicine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Medicine::insert([
            ['name' => 'Antibiotic A', 'amount' => 100, 'measurement_id' => 1],
            ['name' => 'Antifungal B', 'amount' => 50, 'measurement_id' => 2],
        ]);
    }
}