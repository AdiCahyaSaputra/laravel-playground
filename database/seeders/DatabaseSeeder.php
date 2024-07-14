<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Adi Cahya Saputra',
            'email' => 'adics@gmail.com',
            'password' => bcrypt('hehe1234'),
        ]);

        $this->call([
            InventarisSeeder::class
        ]);
    }
}
