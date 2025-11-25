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
        }
    }
}
