<?php

use App\Http\Controllers\Api\FishRecordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/translate-proxy', function () {
    $url = 'https://translate.googleapis.com' . request()->getRequestUri();
    $client = new \GuzzleHttp\Client();

    try {
        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
            ]
        ]);

        return response($response->getBody(), $response->getStatusCode())
            ->header('Content-Type', 'application/json');

    } catch (\Exception $e) {
        return response()->json(['error' => 'Translation service unavailable'], 502);
    }
})->where('path', '.*');

Route::get('/dashboard/fish-statistics', [DashboardController::class, 'fishStatistics'])->withoutMiddleware(['auth:api']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/fish-records', [FishRecordController::class, 'store']);
    Route::get('/fish-records', [FishRecordController::class, 'index']);
    Route::get('/fish-growth/{id}', [FishRecordController::class, 'show']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    $user = Auth::user();
    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user
    ]);
});

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Logged out successfully'
    ]);
});
