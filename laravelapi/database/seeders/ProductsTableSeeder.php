<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for($i = 0; $i < 10; $i++) {
            \App\Models\Product::create([
                'name' => $faker->name,
                'description' => $faker->paragraph(),
                'price' => $faker->numberBetween(100, 1000),
                'stock' => $faker->numberBetween(0, 100),
            ]);
        }
    }
}
