<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

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
            Message::create([
                'thread_id' => $threadId,
                'message_en' => $request->input('message_en', ''),
                'message_ja' => $request->input('message_ja', ''),
                'audio_file_path' => "audio/audio_{$timestamp}.wav",
                'sender' => 1,
            ]);

            return response()->json(['message' => 'Audio message saved successfully.'], 201);
        }
        return response()->json(['error' => 'No audio file provided.'], 400);
    }
}
