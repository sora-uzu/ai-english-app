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
}
