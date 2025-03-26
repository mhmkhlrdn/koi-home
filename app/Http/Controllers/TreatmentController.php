<?php

namespace App\Http\Controllers;

use App\Models\Disease;
use App\Models\Fish;
use App\Models\FishDisease;
use App\Models\FishTreatment;
use App\Models\Medicine;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class TreatmentController extends Controller
{
    public function store (Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255|',
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
        $diseases = Disease::all(['name', 'id']);
        $medicines = Medicine::all(['name', 'id']);
        $treatments = Treatment::with(['disease', 'medicine',])->paginate(10);
        return Inertia::render('admin/disease/treatment/treatment', ['treatments' => $treatments,
    'medicines' => $medicines, 'diseases' => $diseases]);
    }

    public function treat (Request $request)
    {
        $request->validate([
            'Treatment' => 'required|exists:treatments,id',
            'Fish' => 'required|exists:fish_diseases,id',
        ]);
        $TreatmentID = $request->input('Treatment');
        $FishID = $request->input('Fish');
        $FishTreated = FishDisease::where('id', '=', $FishID)->with(['disease', 'fish'])->first();
        $TreatmentUsed = Treatment::where('id', $TreatmentID)->with(['disease', 'medicine.measurement'])->first();
            if (!$TreatmentUsed || $TreatmentUsed->disease_id !== $FishTreated->disease_id) {
                abort(403, 'Unauthorized access to this treatment');
            }
        return Inertia::render('admin/fish/FishTreatment',
        [
                'TreatmentID' => $TreatmentID,
                'FishID' => $FishID,
                'TreatmentUsed' => $TreatmentUsed,
                'FishTreated' => $FishTreated,
                ]);
    }

    public function treated(Request $request){
        $validated = $request->validate([
            'fish_disease_id' => 'required|int|exists:fish_diseases,id',
            'treatment_id' => 'required|int|exists:treatments,id',
            'frequency' => 'required|int',
            'dosage' => 'required|int',
            'method' => 'nullable|string',
        ]);

        FishTreatment::insert([
            'fish_disease_id' => $validated['fish_disease_id'],
            'treatment_id' => $validated['treatment_id'],
            'frequency' => $validated['frequency'],
            'dosage' => $validated['dosage'],
            'method' => $validated['method'],
            'user_id' => Auth::id(),

        ]);

        return redirect()->route('sick-fishes')->with('success', 'Treatment applied succesfully');
    }
}