<?php

namespace App\Http\Controllers;

use App\Models\Fish;
use App\Models\Disease;
use App\Models\FishDisease;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DiagnosisController extends Controller
{
    public function create(Request $request)
    {
        $fishId = $request->query('fish_id');

        if (!$fishId) {
            return redirect()->route('dashboard')->withErrors(['error' => 'No fish selected for diagnosis.']);
        }

        return Inertia::render('admin/diagnosis/create', [
            'fish' => Fish::find($fishId),
            'diseases' => Disease::all(),
        ]);
    }

//     public function create(Request $request)
// {
//     return Inertia::render('admin/diagnosis/create', [
//         'fish_code' => $request->query('fish_code'),
//         'diseases' => Disease::all(['id', 'name']), // Fetch diseases
//     ]);
// }

    public function store(Request $request)
    {
        $request->validate([
            'fish_id' => 'required|exists:fishes,id',
            'disease_id' => 'required|exists:diseases,id',
            'diagnosis_date' => 'required|date',
        ]);

        FishDisease::create([
            'fish_id' => $request->fish_id,
            'disease_id' => $request->disease_id,
            'diagnosis_date' => $request->diagnosis_date,
            'recovery_date' => null,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('fishes')->with('success', 'Diagnosis recorded successfully.');
    }

}
