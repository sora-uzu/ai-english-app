<?php

use App\Http\Controllers\ThreadController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/top', [ThreadController::class, 'index'])->name('top');
    Route::get('/thread/{id}', [ThreadController::class, 'show'])->name('thread.show');
});

require __DIR__.'/auth.php';

