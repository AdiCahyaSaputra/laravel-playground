<?php

namespace Database\Factories;

use App\Models\Inventaris;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventaris>
 */
class InventarisFactory extends Factory
{
    protected $model = Inventaris::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake('id_ID');

        $faker->addProvider(new \Bezhanov\Faker\Provider\Commerce($faker));

        return [
            'name' => $faker->productName,
            'stock' => $faker->numberBetween(0, 100),
            'price' => $faker->numberBetween(10000, 200000),
            'expired_date' => $faker->dateTimeBetween('now', '+2 years', 'Asia/Jakarta')->format('Y-m-d'),
        ];
    }
}
