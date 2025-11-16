<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Thread;

class ThreadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Thread::create([
            'title' => '英会話学習',
        ]);
        Thread::create([
            'title' => '英会話の練習',
        ]);
        Thread::create([
            'title' => '英会話の勉強',
        ]);
        Thread::create([
            'title' => '英会話の練習',
        ]);
    }
}
