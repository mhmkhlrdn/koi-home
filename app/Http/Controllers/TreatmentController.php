<?php

namespace App\Http\Controllers;

use App\Models\Disease;
use App\Models\Medicine;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TreatmentController extends Controller
{
    public function store (Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:diseases,name',
            'medicine_id' => 'required|int',
            'disease_id' => 'required|int',
            'description' => 'nullable|string',
        ]);

        Treatment::insert([
            'name' => $validated['name'],
            'medicine_id' => $validated['medicine_id'],
            'disease_id' => $validated['disease_id'],
            'description' => $validated['description'],
        ]);

        return redirect()->route('treatment.index')->with('success', 'Treatment added succesfully');
    }

    public function index () {
        $diseases = Disease::all('name');
        $medicines = Medicine::all('name');
        $treatments = Treatment::with(['disease', 'medicine'])->paginate(10);
        return Inertia::render('admin/disease/treatment/treatment', ['treatments' => $treatments,
    'medicines' => $medicines, 'diseases' => $diseases]);
    }
}