<?php

namespace Database\Seeders;

use App\Models\User;
use FishGrowthSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $this->call(
            [
                // FishGrowthSeeder::class,
        //     UsersTableSeeder::class,
        //     CountriesTableSeeder::class,
        //     BreedersTableSeeder::class,
        //     InformationTableSeeder::class,
        //     BloodlinesTableSeeder::class,
        //     VarietiesTableSeeder::class,
        //     PoolsTableSeeder::class,
        //     FishesTableSeeder::class,
            FishGrowthTableSeeder::class,
        //     FishLineagesTableSeeder::class,
        //     TypesTableSeeder::class,
        //     MeasurementsTableSeeder::class,
        //     MedicinesTableSeeder::class,
        //     MedicineTypesTableSeeder::class,
        //     DiseasesTableSeeder::class,
        //     TreatmentsTableSeeder::class,
        //     FishDiseasesTableSeeder::class,
        //     FishTreatmentsTableSeeder::class,
        //     AddressesTableSeeder::class,
        //     CustomersTableSeeder::class,
        //     BreedingRequestsTableSeeder::class,
        //     TransactionsTableSeeder::class,
        //     AuctionsTableSeeder::class,
        //     TransactionFishesTableSeeder::class,
        //     AuctionBidsTableSeeder::class,
        //     MenusTableSeeder::class,
        //     UserPermissionsTableSeeder::class,
        ]
    );

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
