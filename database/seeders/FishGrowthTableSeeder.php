<?php

namespace Database\Seeders;

use App\Models\Fish;
use App\Models\FishGrowth;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FishGrowthTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run()
    {
        $fishes = Fish::all();

        foreach ($fishes as $fish) {
            // Set initial length and weight
            $length = rand(5, 10); // starting length in cm
            $weight = rand(10, 20); // starting weight in g

            $recordedDate = Carbon::now()->subDays(rand(30, 100)); // random start point

            $growthCount = rand(3, 6); // number of growth records per fish

            for ($i = 0; $i < $growthCount; $i++) {
                FishGrowth::create([
                    'fish_id' => $fish->id,
                    'length' => $length,
                    'weight' => $weight,
                    'recorded_at' => $recordedDate->copy(),
                    'user_id' => 1
                ]);

                // Increment length and weight (non-decreasing)
                $length += rand(0, 3); // may increase or stay the same
                $weight += rand(0, 5);

                // Advance the date
                $recordedDate->addDays(rand(5, 15));
            }
        }
    }
}
