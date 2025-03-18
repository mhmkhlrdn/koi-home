<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use App\Models\MedicineType;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;
class MedicineController extends Controller
{
    public function index() {
        $medicinesInStock = Medicine::where('amount', '>', 0)->get();
        $medicinesOutOfStock = Medicine::where('amount', '=', 0)->get();
        $medicineType = MedicineType::with('medicine', 'type')->get();
        return Inertia::render('admin/medicines', [
            'medicinesInStock' => $medicinesInStock,
            'medicineOutOfStock' => $medicinesOutOfStock,
            'medicineType' => $medicineType
        ]);
    }
}
