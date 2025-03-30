<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('something', function () {
        return Inertia::render('something');
    })->name('something');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
