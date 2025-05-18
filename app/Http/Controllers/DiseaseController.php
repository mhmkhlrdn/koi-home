<?php

namespace App\Http\Controllers;

use App\Models\Disease;
use App\Models\FishDisease;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiseaseController extends Controller
{
    public function index () {
        $diseases = Disease::all();
        $fishWithDisease = FishDisease::with(['fish', 'disease'])->where('recovery_date', '=', null)->get();
        return Inertia::render('admin/diseases', [
            'diseases' => $diseases,
            'fishWithDisease' => $fishWithDisease,
        ]);
    }

    public function create () {
        return Inertia::render('admin/disease/create');
    }

    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:diseases,name',
            'description' => 'nullable|string',
        ]);

        // Insert the new disease
        Disease::insert([
            'name' => $validated['name'],
            'description' => $validated['description']
        ]);

        return redirect()->route('diseases')->with('success', 'Disease added successfully!');
    }
}
