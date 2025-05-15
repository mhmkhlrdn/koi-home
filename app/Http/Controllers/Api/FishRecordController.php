<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishGrowth;
use Illuminate\Http\Request;

class FishRecordController extends Controller
{
    public function index()
    {
        return response()->json(FishGrowth::with('fish')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fish_id' => 'required|exists:fish,id',
            'length' => 'required|numeric',
            'weight' => 'required|numeric',
            'recorded_at' => 'required|date',
            'photoUrl' => 'nullable|string',
        ]);

        $validated['user_id'] = $request->user()->id;

        $growth = FishGrowth::create($validated);

        return response()->json($growth, 201);
    }

    public function show($id)
    {
        $growth = FishGrowth::with('fish')->findOrFail($id);
        return response()->json($growth);
    }
}