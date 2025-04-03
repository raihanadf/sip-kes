<?php

use App\Http\Controllers\Master\DoctorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('farmasi', function () {
        return Inertia::render('farmasi');
    })->name('farmasi');

    Route::get('pemeriksaan/rawat-inap', function () {
        return Inertia::render('pemeriksaan/rawat-inap');
    })->name('pemeriksaan/rawat-inap');

    Route::get('settings/profil-klinik', function () {
        return Inertia::render('settings/profil-klinik');
    })->name('settings/profil-klinik');

    Route::resource('dokter', DoctorController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
