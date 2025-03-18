<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customer::insert([
            ['first_name' => 'Alice', 'last_name' => 'Smith', 'email' => 'alice@example.com', 'password' => bcrypt('password'), 'phone' => '123456789', 'address_id' => 1],
            ['first_name' => 'Bob', 'last_name' => 'Johnson', 'email' => 'bob@example.com', 'password' => bcrypt('password'), 'phone' => '987654321', 'address_id' => 2],
        ]);
    }
}