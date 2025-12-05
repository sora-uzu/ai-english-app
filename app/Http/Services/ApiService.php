<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ApiService
{
    public function callWhisperApi($audioFilePath)
    {
        $response = Http::attach('file', file_get_contents(storage_path('app/public/' . $audioFilePath)), 'audio.wav')
            ->withHeaders([
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            ])
            ->post('https://api.openai.com/v1/audio/transcriptions', [
                'model' => 'whisper-1',
                'language' => 'en',
            ]);

        if ($response->successful()) {
            return $response->json();
        } else {
            throw new \Exception('Whisper API call failed: ' . $response->body());
        }
    }

    public function callGptApi($modelMessages)
    {
        $systemMessage = [
            'role' => 'system',
            'content' => 'You are an English conversation practice assistant. Please respond in English.',
        ];

        $formattedMessages = [];
        foreach ($modelMessages as $message) {
            $role = $message->sender === 1 ? 'user' : 'assistant';
            $formattedMessages[] = [
                'role' => $role,
                'content' => $message->message_en,
            ];
        }

        $messages = array_merge([$systemMessage], $formattedMessages);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type' => 'application/json',
        ])
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini',
                'messages' => $messages,
            ]);

        if ($response->successful()) {
            return $response->json();
        } else {
            throw new \Exception('GPT API call failed: ' . $response->body());
        }
    }

    public function callTtsApi($text)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type' => 'application/json',
            'Accept' => 'audio/mpeg',
        ])
            ->post('https://api.openai.com/v1/audio/speech', [
                'model' => 'gpt-4o-mini-tts',
                'voice' => 'alloy',
                'input' => $text,
                'response_format' => 'wav',
            ]);

        if ($response->successful()) {
            $fileName = 'tts_' . now()->format('YmdHis') . '.wav';
            $filePath = 'ai_audio/' . $fileName;

            Storage::disk('public')->put($filePath, $response->body());

            return $filePath;
        } else {
            throw new \Exception('TTS API call failed: ' . $response->body());
        }
    }

    public function translateToJapanese(string $englishText): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Translate the following English into natural Japanese. Return only the translation.',
                ],
                [
                    'role' => 'user',
                    'content' => $englishText,
                ],
            ],
            'temperature' => 0.2,
        ]);

        if ($response->successful()) {
            $body = $response->json();
            return $body['choices'][0]['message']['content'] ?? '';
        }

        throw new \Exception('Translation API call failed: ' . $response->body());
    }
}
