<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    public function store(Request $request, int $threadId)
    {
        //音声データを保存
        if ($request->hasFile('audio')) {
            $audio = $request->file('audio');
            $timestamp = now()->format('YmdHis');
            $audio->storeAs('audio', "audio_{$timestamp}.wav", 'public');

            //データベースに保存する
            $message = Message::create([
                'thread_id' => $threadId,
                'message_en' => $request->input('message_en', ''),
                'message_ja' => $request->input('message_ja', ''),
                'audio_file_path' => "audio/audio_{$timestamp}.wav",
                'sender' => 1,
            ]);

            $apiService = new \App\Http\Services\ApiService();
            $transcription = $apiService->callWhisperApi("audio/audio_{$timestamp}.wav");
            $message->update(['message_en' => $transcription['text']]);

            $messages = Message::where('thread_id', $threadId)->get();
            //gptにAPIリクエスト
            $getResponse = $apiService->callGptApi($messages);
            $aiMessageContent = $getResponse['choices'][0]['message']['content'];
            //AIの返答をデータベースに保存
            $aiMessage = Message::create([
                'thread_id' => $threadId,
                'message_en' => $aiMessageContent,
                'message_ja' => '',
                'audio_file_path' => '',
                'sender' => 2,
            ]);

            //TTSにAPIリクエスト
            $filePath = $apiService->callTtsApi($aiMessageContent);

            //AIの音声ファイルパスを更新
            $aiMessage->update(['audio_file_path' => $filePath]);

            return response()->json(['message' => 'Audio message saved successfully.', 'transcription' => $transcription], 201);
        }
        return response()->json(['error' => 'No audio file provided.'], 400);
    }

    /**
     * ログイン済みユーザー向けの音声ストリーミング
     */
    public function audio(Request $request)
    {
        $path = $request->query('path');

        if (!$path) {
            abort(404);
        }

        $normalizedPath = ltrim($path, '/');
        if (!Str::startsWith($normalizedPath, ['audio/', 'ai_audio/'])) {
            abort(404);
        }

        if (!Storage::disk('public')->exists($normalizedPath)) {
            abort(404);
        }

        $fullPath = Storage::disk('public')->path($normalizedPath);

        return response()->file($fullPath, [
            'Content-Type' => 'audio/wav',
            'Cache-Control' => 'private, max-age=86400',
        ]);
    }
}
