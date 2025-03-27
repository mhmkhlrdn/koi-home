<?php

namespace App\Http\Controllers;

use App\Models\Disease;
use App\Models\Fish;
use App\Models\FishDisease;
use App\Models\FishTreatment;
use App\Models\NextTreatmentSchedule;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SickController extends Controller
{
    public function index(Request $request)
{
    // Get pagination query parameters
    $sickFishesPage = $request->query('sickFishesPage', 1);
    $treatedFishesPage = $request->query('treatedFishesPage', 1);

    // Paginate with separate query parameters
    $sickFishes = FishDisease::with(['fish', 'disease', 'user'])
        ->paginate(10, ['*'], 'sickFishesPage')
        ->appends(['treatedFishesPage' => $treatedFishesPage]);

    $treatedFishes = FishTreatment::with(['fishDisease.fish', 'treatment.medicine.measurement', 'user', 'schedule'])
        ->paginate(10, ['*'], 'treatedFishesPage')
        ->appends(['sickFishesPage' => $sickFishesPage]);

    // Fetch other necessary data
    $fishDiseases = Fish::with('diseases')->get();
    $diseaseFishes = Disease::with(['fishes'])->get();

    $availableTreatment = Treatment::with(['medicine', 'disease'])
        ->whereHas('medicine', fn($query) => $query->where('amount', '>', 0))
        ->get();

    $unavailableTreatment = Treatment::with(['medicine', 'disease'])
        ->whereHas('medicine', fn($query) => $query->where('amount', '=', 0))
        ->get();

    return Inertia::render('admin/fish/sick', [
        'sickFishes' => $sickFishes,
        'treatedFishes' => $treatedFishes,
        'fishDiseases' => $fishDiseases,
        'diseaseFishes' => $diseaseFishes,
        'availableTreatment' => $availableTreatment,
        'unavailableTreatment' => $unavailableTreatment,
    ]);
}

    public function recovery(Request $request) {
        $request->validate([
            'fish_id' => 'required',
            'recoveryDate' => 'required|date'
        ]);

        $fishDisease = FishDisease::where('id', '=' ,$request->fish_id)
    ->whereNull('recovery_date')->first();

if (!$fishDisease) {
    return redirect()->back()->with('error', 'This fish has already recovered.');
}

$fishDisease->update(['recovery_date' => $request->recoveryDate]);

return redirect()->back()->with('success', 'Fish recovery date updated successfully.');



    }

}
