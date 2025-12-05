<?php

use App\Http\Controllers\ThreadController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;

Route::middleware('auth')->group(function () {
    Route::get('/top', [ThreadController::class, 'index'])->name('top');
    Route::post('/thread', [ThreadController::class, 'store'])->name('thread.store');
    Route::get('/thread/{threadId}', [ThreadController::class, 'show'])->name('thread.show');
    Route::post('/thread/{threadId}/message', [MessageController::class, 'store'])->name('message.store');
    Route::get('/audio', [MessageController::class, 'audio'])->name('audio.stream');
});

require __DIR__.'/auth.php';
