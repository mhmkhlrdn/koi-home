<?php

namespace App\Http\Controllers;

use App\Models\Variety;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VarietyController extends Controller
{
    public function index () {
        $fishVariety = Variety::with(['fishes'])->paginate(10);
        return Inertia::render('admin/fish/Variety', ['fishVariety' => $fishVariety]);
    }
}
