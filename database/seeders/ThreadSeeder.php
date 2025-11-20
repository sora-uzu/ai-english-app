<?php

namespace Database\Seeders;

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
            'title' => '英会話のスレッド1',
        ]);
        Thread::create([
            'title' => '英会話のスレッド2',
        ]);
        Thread::create([
            'title' => '英会話のスレッド3',
        ]);
        Thread::create([
            'title' => '英会話のスレッド4',
        ]);
        Thread::create([
            'title' => '英会話のスレッド5',
        ]);
        Thread::create([
            'title' => '英会話のスレッド6',
        ]);
        Thread::create([
            'title' => '英会話のスレッド7',
        ]);
        Thread::create([
            'title' => '英会話のスレッド8',
        ]);
        Thread::create([
            'title' => '英会話のスレッド9',
        ]);
        Thread::create([
            'title' => '英会話のスレッド10',
        ]);
    }
}
