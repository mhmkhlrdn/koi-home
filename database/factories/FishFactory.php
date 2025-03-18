<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Fish;
use App\Models\User;
use App\Models\Bloodline;
use App\Models\Variety;
use App\Models\Pool;

class FishFactory extends Factory
{
    protected $model = Fish::class;

    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->bothify('FISH-####'),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'bloodline_id' => Bloodline::inRandomOrder()->first()->id ?? Bloodline::factory(),
            'variety_id' => Variety::inRandomOrder()->first()->id ?? Variety::factory(),
            'sale_type' => $this->faker->randomElement(['auction', 'fixed_price', 'not_for_sale']),
            'gender' => $this->faker->randomElement(['male', 'female', 'unknown']),
            'fixedPrice' => $this->faker->randomFloat(2, 10, 500), // Price between 10 and 500
            'birthDate' => $this->faker->date(),
            'pool_id' => Pool::inRandomOrder()->first()->id ?? Pool::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
