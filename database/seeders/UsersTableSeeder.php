<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::insert([
            [
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'name' => 'Admin User',
                'password' => bcrypt('password123'),
                'role' => 'admin',
            ],
            [
                'email' => 'john@breeder.com',
                'email_verified_at' => now(),
                'name' => 'Breeder John',
                'password' => bcrypt('password123'),
                'role' => 'manager',
            ],
            [
                'email' => 'mike@dev.com',
                'email_verified_at' => now(),
                'name' => 'Developer Mike',
                'password' => bcrypt('password123'),
                'role' => 'developer',
            ],
            [
                'email' => 'superadmin@example.com',
                'email_verified_at' => now(),
                'name' => 'Super Admin User',
                'password' => bcrypt('password123'),
                'role' => 'superadmin',
            ],
        ]);
    }
}