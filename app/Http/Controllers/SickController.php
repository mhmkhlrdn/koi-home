<?php

namespace App\Http\Controllers;

use App\Models\Disease;
use App\Models\Fish;
use App\Models\FishDisease;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SickController extends Controller
{
    public function index () {
        $fishDiseases = Fish::withWhereHas('diseases')->get();
        $diseaseFishes = Disease::with(['fishes'])->get();
        $sickFishes = FishDisease::with(['fish', 'disease', 'user'])->paginate(10);
        return Inertia::render('admin/fish/sick', ['sickFishes' => $sickFishes, 'fishDiseases' => $fishDiseases, 'diseaseFishes' => $diseaseFishes]);
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
