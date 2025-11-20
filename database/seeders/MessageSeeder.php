<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;
use App\Models\Thread;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $threadMessages = [
            '英会話学習' => [
                [
                    'message_en' => "Hello! Welcome to today's English conversation practice. How are you feeling?",
                    'message_ja' => 'こんにちは！今日の英会話練習へようこそ。気分はいかがですか？',
                    'sender' => 2,
                ],
                [
                    'message_en' => "Hi! I'm a bit nervous, but excited to practice.",
                    'message_ja' => 'こんにちは！少し緊張していますが、練習できるのが楽しみです。',
                    'sender' => 1,
                ],
                [
                    'message_en' => "No worries, we will take it step by step. Can you tell me about your goals for this month?",
                    'message_ja' => '心配いりませんよ。少しずつ進めていきましょう。今月の目標を教えてくれますか？',
                    'sender' => 2,
                ],
                [
                    'message_en' => 'I want to speak more smoothly when I order coffee in English.',
                    'message_ja' => '英語でスムーズにコーヒーを注文できるようになりたいです。',
                    'sender' => 1,
                ],
                [
                    'message_en' => "Great goal! Let's create some café scenarios together.",
                    'message_ja' => '素晴らしい目標ですね！カフェのシチュエーションで一緒に練習しましょう。',
                    'sender' => 2,
                ],
            ],
            '英会話の練習' => [
                [
                    'message_en' => 'Good afternoon! Today we will practice a business introduction. Ready?',
                    'message_ja' => 'こんにちは！今日はビジネスの自己紹介を練習しましょう。準備はいいですか？',
                    'sender' => 2,
                ],
                [
                    'message_en' => "Yes, I'd like to sound confident when I meet clients.",
                    'message_ja' => 'はい、クライアントに会うときに自信を持って話したいです。',
                    'sender' => 1,
                ],
                [
                    'message_en' => 'Great. Start by sharing your name, role, and what your team does.',
                    'message_ja' => '良いですね。名前、役割、そしてチームが何をしているかを伝えるところから始めましょう。',
                    'sender' => 2,
                ],
                [
                    'message_en' => "My name is Akira. I'm a project manager, and my team supports new product launches.",
                    'message_ja' => '私はアキラです。プロジェクトマネージャーで、チームは新製品のローンチを支援しています。',
                    'sender' => 1,
                ],
                [
                    'message_en' => "Excellent! We'll refine the wording and add natural transitions next.",
                    'message_ja' => '素晴らしいです！言い回しを磨いて自然なつなぎ言葉も加えていきましょう。',
                    'sender' => 2,
                ],
            ],
            '英会話の勉強' => [
                [
                    'message_en' => 'Welcome back! Let us work on a travel conversation today.',
                    'message_ja' => 'おかえりなさい！今日は旅行の会話を練習しましょう。',
                    'sender' => 2,
                ],
                [
                    'message_en' => "Sure, I'm planning a trip to New York next spring.",
                    'message_ja' => 'はい、来春にニューヨーク旅行を計画しています。',
                    'sender' => 1,
                ],
                [
                    'message_en' => 'Nice! Try asking me for local recommendations.',
                    'message_ja' => 'いいですね！現地のおすすめを私に聞いてみてください。',
                    'sender' => 2,
                ],
                [
                    'message_en' => 'Could you recommend a good place to try bagels?',
                    'message_ja' => 'ベーグルを食べるのにおすすめの場所はありますか？',
                    'sender' => 1,
                ],
                [
                    'message_en' => 'Absolutely! You should visit a shop called Sunrise Bagels near Central Park.',
                    'message_ja' => 'もちろんです！セントラルパーク近くの「Sunrise Bagels」というお店に行ってみてください。',
                    'sender' => 2,
                ],
            ],
        ];

        foreach ($threadMessages as $threadTitle => $messages) {
            $threadId = Thread::where('title', $threadTitle)->value('id');

            if (!$threadId) {
                continue;
            }

            foreach ($messages as $message) {
                Message::create([
                    'thread_id' => $threadId,
                    'message_en' => $message['message_en'],
                    'message_ja' => $message['message_ja'],
                    'sender' => $message['sender'],
                    'audio_file_path' => $message['audio_file_path'] ?? null,
                ]);
            }
        }
    }
}
