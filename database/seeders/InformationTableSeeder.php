<?php

namespace Database\Seeders;

use App\Models\Information;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InformationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Information::insert([
            'logo_url' => 'https://placehold.co/400',
            'name' => 'Company Name',
            'addressLineOne' => '123 Ocean St.',
            'addressLineTwo' => 'Suite 500',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'postalCode' => '10110',
            'country' => 'Indonesia',
            'updated_at' => now(),
        ]);
    }
}