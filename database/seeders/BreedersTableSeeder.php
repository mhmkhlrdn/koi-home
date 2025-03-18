<?php

namespace Database\Seeders;

use App\Models\Breeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BreedersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Breeder::insert([
            [
                'user_id' => 2,
                'farm_name' => 'AquaFarm',
                'country_id' => 3,
                'email' => 'aqua@example.com',
                'phone' => '123-456-7890'
            ],
        ]);
    }
}