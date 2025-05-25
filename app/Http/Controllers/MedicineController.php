<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use App\Models\Medicine;
use App\Models\MedicineType;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;
class MedicineController extends Controller
{
    public function index() {
        // $medicinesInStock = Medicine::where('amount', '>', 0)->get();

        $medicinesInStock = Medicine::with(['measurement'])->where('amount', '>', 0)->get();
        $medicinesOutOfStock = Medicine::where('amount', '=', 0)->get();
        $medicineType = MedicineType::with('medicine', 'type')->get();
        $measurements = Measurement::all();
        $types = Type::all();
        return Inertia::render('admin/medicines', [
            'medicinesInStock' => $medicinesInStock,
            'medicineOutOfStock' => $medicinesOutOfStock,
            'medicineType' => $medicineType,
            'measurements' => $measurements,
            'types' => $types
        ]);
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'amount' => 'required|integer|min:0',
        'packaging' => 'required|integer|min:1',
        'measurement_id' => 'required|exists:measurements,id',
        'instruction' => 'nullable|string',
        // 'image_url' => 'nullable|string', // remove this if not needed
    ]);
    $validatedType = $request->validate([
        'type_id' => 'required|exists:types,id'
    ]);
    $validated['totalLeft'] = $validated['amount'] * $validated['packaging'];

    $medicineId = Medicine::insertGetId($validated);
    MedicineType::insert(
        [
            'medicine_id' => $medicineId,
            'type_id' => $validatedType['type_id']
        ]
        );

    return redirect()->back()->with('success', 'Medicine created successfully.');
}
}
