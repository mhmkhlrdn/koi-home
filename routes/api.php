<?php

use App\Http\Controllers\Api\FishRecordController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/fish-records', [FishRecordController::class, 'store']);

    Route::get('/fish-records', [FishRecordController::class, 'index']);

    Route::get('/fish-growth/{id}', [FishRecordController::class, 'show']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);
