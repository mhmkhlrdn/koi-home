<?php

namespace App\Http\Controllers;

use App\Models\Variety;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VarietyController extends Controller
{
    public function index () {
        $fishVariety = Variety::withCount(['fishes'])->paginate(10);
        return Inertia::render('admin/fish/Variety', ['fishVariety' => $fishVariety]);
    }
    public function store (Request $request) {
$validated = $request->validate([
    'name' => 'required|string|max:255',
]);
Variety::insert([
    'name' => $validated['name']
]);
return redirect()->route('variety')->with('success', 'Variety added succesfully');
    }
}
