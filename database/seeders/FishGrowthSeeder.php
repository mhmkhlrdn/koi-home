<?php

use Illuminate\Database\Seeder;
use App\Models\Fish;
use App\Models\FishGrowth;
use Carbon\Carbon;

class FishGrowthSeeder extends Seeder
{
    public function run()
    {
        $fishes = Fish::all();

        foreach ($fishes as $fish) {
            // Set initial length and weight
            $length = rand(3, 10); // starting length in cm
            $weight = rand(6, 20); // starting weight in g

            $recordedDate = Carbon::now()->subDays(rand(30, 100)); // random start point

            $growthCount = rand(3, 6); // number of growth records per fish

            for ($i = 0; $i < $growthCount; $i++) {
                FishGrowth::create([
                    'fish_id' => $fish->id,
                    'length' => $length,
                    'weight' => $weight,
                    'recordedDate' => $recordedDate->copy()
                ]);

                // Advance the date
                $recordedDate->addDays(rand(5, 15));
            }
        }
    }
}