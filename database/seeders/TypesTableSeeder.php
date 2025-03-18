<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Type::insert([
            ['type' => 'Topical'],
            ['type' => 'Injection'],
            ['type' => 'Oral'],
            ['type' => 'Bath'],
        ]);
    }
}