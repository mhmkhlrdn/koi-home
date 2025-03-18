<?php

namespace Database\Seeders;

use App\Models\Variety;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VarietiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Variety::insert([
            ['name' => 'Kohaku'],
            ['name' => 'Sanke'],
            ['name' => 'Asagi'],
            ['name' => 'Shusui'],
            ['name' => 'Tancho'],
            ['name' => 'Goshiki'],
            ['name' => 'Bekko'],
        ]);
    }
}