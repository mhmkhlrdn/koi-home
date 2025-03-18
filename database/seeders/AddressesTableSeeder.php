<?php

namespace Database\Seeders;

use App\Models\Address;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddressesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Address::insert([
            ['address_line_one' => '123 Ocean Street', 'city' => 'Jakarta', 'province' => 'DKI Jakarta', 'postal_code' => '10110', 'country_id' => 3],
            ['address_line_one' => '456 River Road', 'city' => 'Tokyo', 'province' => 'Tokyo', 'postal_code' => '110-0001', 'country_id' => 2],
        ]);
    }
}