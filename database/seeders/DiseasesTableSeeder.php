<?php

namespace Database\Seeders;

use App\Models\Disease;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiseasesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Disease::insert([
            ['name' => 'Fin Rot', 'description' => 'A bacterial infection causing fin decay.'],
            ['name' => 'Ich', 'description' => 'White spots on fish due to parasite infection.'],
        ]);
    }
}