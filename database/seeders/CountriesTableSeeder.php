<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Country::insert([
            ['name' => 'United States'],
            ['name' => 'Japan'],
            ['name' => 'Indonesia'],
            ['name' => 'Germany'],
        ]);
    }
}