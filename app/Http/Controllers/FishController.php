<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Fish;
use Illuminate\Support\Facades\Log;

class FishController extends Controller
{
    public function update(Request $request, $id)
    {
    $fish = Fish::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:255',
            'bloodline_id' => 'required|numeric',
            'variety_id' => 'required|numeric',
            'gender' => 'required|in:male,female,unknown',
            'fixedPrice' => 'nullable|numeric',
            'birthDate' => 'required|date',
            'pool_id' => 'required|numeric',
        ]);

        $validated['user_id'] = auth()->id();

        $fish->update($validated);
        Log::info('Fish updated successfully', ['id' => $fish->id]);

        return redirect()->back()->with('success', 'Fish updated successfully.');
    }
    public function index()
{
    $recentChanges = Fish::with('user')
    ->whereNotNull('updated_at')
    ->latest('updated_at')
    ->limit(5)
    ->get()
    ->map(fn ($fish) => [

        'fish_code' => $fish->code,
        'user_name' => $fish->user->name ?? 'Unknown',
        'modified_at' => $fish->updated_at->format('Y-m-d H:i:s'),
    ]);

// Fetch Fishes Born This Week
$recentlyBornFishes = Fish::whereBetween('birthDate', [now()->subDays(7), now()])
    ->latest('birthDate')
    ->get(['id', 'code', 'birthDate']);

    $fishes = Fish::with(['bloodline', 'variety', 'user', 'pool'])
    ->paginate(10)
    ->through(function ($fish) {
        return [
            'id' => $fish->id,
            'code' => $fish->code,
            'bloodline_id' => $fish->bloodline->id ?? null,
            'bloodline_name' => $fish->bloodline->name ?? null,
            'variety_id' => $fish->variety->id ?? null,
            'variety_name' => $fish->variety->name ?? null,
            'gender' => $fish->gender,
            'birthDate' => $fish->birthDate,
            'owner_id' => $fish->user->id ?? null,
            'owner_name' => $fish->user->name ?? null,
            'pool_id' => $fish->pool->id ?? null,
            'pool_name' => $fish->pool->name ?? null,
        ];
    });

    return Inertia::render('admin/fishes', [
        'fishItems' => $fishes,
        'recentChanges' => $recentChanges,
        'recentlyBornFishes' => $recentlyBornFishes,
        'bloodlines' => \App\Models\Bloodline::select('id', 'name')->get(),
        'varieties' => \App\Models\Variety::select('id', 'name')->get(),
        'users' => \App\Models\User::select('id', 'name')->get(),
        'pools' => \App\Models\Pool::select('id', 'name')->get(),
    ]);
}


}
