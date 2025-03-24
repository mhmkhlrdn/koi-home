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
        Menu::insert([
            [
                'id' => 1,
                'parent_id' => null,
                'title' => 'Fishes',
                'url' => '/fishes',
                'icon_tag' => 'Fish',
                'isEnabled' => 1,
            ],
            [
                'id' => 2,
                'parent_id' => null,
                'title' => 'Breeders',
                'url' => '/breeders',
                'icon_tag' => 'SquareUserRound',
                'isEnabled' => 1,
            ],
            [
                'id' => 3,
                'parent_id' => 1,
                'title' => 'Sick',
                'url' => '/sickfishes',
                'icon_tag' => 'Syringe',
                'isEnabled' => 1,
            ],
            [
                'id' => 4,
                'parent_id' => null,
                'title' => 'Diseases',
                'url' => '/diseases',
                'icon_tag' => 'BriefcaseMedical',
                'isEnabled' => 1,
            ],
            [
                'id' => 5,
                'parent_id' => null,
                'title' => 'Pools',
                'url' => '/pools',
                'icon_tag' => 'Cuboid',
                'isEnabled' => 1,
            ],
            [
                'id' => 6,
                'parent_id' => null,
                'title' => 'Sales',
                'url' => '/fishsales',
                'icon_tag' => 'BadgeDollarSign',
                'isEnabled' => 1,
            ],
            [
                'id' => 7,
                'parent_id' => 1,
                'title' => 'Lineage & Bloodline',
                'url' => '/family',
                'icon_tag' => 'Droplet',
                'isEnabled' => 1,
            ],
            [
                'id' => 8,
                'parent_id' => null,
                'title' => 'Information',
                'url' => '/information',
                'icon_tag' => 'BookText',
                'isEnabled' => 1,
            ],
            [
                'id' => 9,
                'parent_id' => 2,
                'title' => 'Address',
                'url' => '/address',
                'icon_tag' => 'MapPin',
                'isEnabled' => 1,
            ],
            [
                'id' => 10,
                'parent_id' => null,
                'title' => 'Customers',
                'url' => '/customer',
                'icon_tag' => 'SquareUserRound',
                'isEnabled' => 1,
            ],
            [
                'id' => 11,
                'parent_id' => 4,
                'title' => 'Treatment',
                'url' => '/treatment',
                'icon_tag' => 'Pill',
                'isEnabled' => 1,
            ],
            [
                'id' => 12,
                'parent_id' => 8,
                'title' => 'Country',
                'url' => '/country',
                'icon_tag' => 'Flag',
                'isEnabled' => 1,
            ],
            [
                'id' => 13,
                'parent_id' => 8,
                'title' => 'Menu',
                'url' => '/menu',
                'icon_tag' => null,
                'isEnabled' => 1,
            ],
            [
                'id' => 14,
                'parent_id' => null,
                'title' => 'Roles',
                'url' => '/roles',
                'icon_tag' => 'KeyRound',
                'isEnabled' => 1,
            ],
            [
                'id' => 15,
                'parent_id' => 10,
                'title' => 'Address',
                'url' => '/address',
                'icon_tag' => 'MapPin',
                'isEnabled' => 1,
            ],
            [
                'id' => 16,
                'parent_id' => 14,
                'title' => 'Permission',
                'url' => '/permission',
                'icon_tag' => 'Swords',
                'isEnabled' => 1,
            ],
            [
                'id' => 17,
                'parent_id' => 1,
                'title' => 'Variety',
                'url' => '/variety',
                'icon_tag' => 'Tags',
                'isEnabled' => 1,
            ],
            [
                'id' => 18,
                'parent_id' => null,
                'title' => 'Medicines',
                'url' => '/medicines',
                'icon_tag' => 'Tablets',
                'isEnabled' => 1,
            ],
            [
                'id' => 19,
                'parent_id' => 1,
                'title' => 'Growth',
                'url' => '/growth',
                'icon_tag' => 'Ruler',
                'isEnabled' => 1,
            ],
        ]);
    }

}
