<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Menu::insert([[
            'title' => 'Fishes',
            'url' => '/fishes'
        ],
        [
            'title' => 'Breeders',
            'url' => '/fishes'
        ],
        [
            'title' => 'Sick',
            'url' => '/sickfishes',
        ],
        [
            'title' => 'Diseases',
            'url' => '/diseases'
        ],
        [
            'title' => 'Pools',
            'url' => '/pools'
        ]
        ]);

    }

}