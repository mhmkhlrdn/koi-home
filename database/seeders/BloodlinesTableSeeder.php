<?php

namespace Database\Seeders;

use App\Models\Bloodline;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BloodlinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bloodline::insert([
            ['name' => 'Iitsuka Sensuke'],
            ['name' => 'Tomoin'],
            ['name' => 'Yagozen'],
            ['name' => 'Matsunosuke'],
            ['name' => 'Torazo'],
        ]);
    }
}