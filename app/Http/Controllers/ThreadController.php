<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\StoreThreadRequest;
use Inertia\Response as InertiaResponse;
use App\Http\Requests\UpdateThreadRequest;
use App\Models\Thread;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;

class ThreadController extends Controller
{
    /**
     * トップ画面表示
     */
    public function index(): InertiaResponse
    {
        return Inertia::render('Top', [
            'threads' => Thread::select(['id', 'title'])
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThreadRequest $request): RedirectResponse
    {
        $title = $request->input('title');
        $timestamp = now('Asia/Tokyo')->format('Y-m-d H:i');
        $thread = Thread::create([
            'title' => $title ?: '新規スレッド ' . $timestamp,
        ]);

        return redirect()->route('thread.show', ['threadId' => $thread->id]);
    }

    /**
     * 英会話画面表示
     */
    public function show(int $threadId)
    {
        return Inertia::render('Thread/Show', [
            'threads' => Thread::select(['id', 'title'])
                ->latest()
                ->get(),
            'messages' => Message::select([
                'id',
                'thread_id',
                'message_en',
                'message_ja',
                'sender',
                'audio_file_path',
                'created_at',
            ])
                ->where('thread_id', $threadId)
                ->latest()
                ->get(),
            'threadId' => $threadId,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Thread $thread)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThreadRequest $request, Thread $thread)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thread $thread)
    {
        //
    }
}
