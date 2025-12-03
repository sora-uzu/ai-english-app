<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;

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
}
