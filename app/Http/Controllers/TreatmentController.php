<?php

namespace App\Http\Controllers;

use App\Models\Disease;
use App\Models\Medicine;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TreatmentController extends Controller
{
    public function index () {
        $treatments = Treatment::with(['disease', 'medicine'])->paginate(10);
        return Inertia::render('admin/disease/treatment/treatment', ['treatments' => $treatments]);
    }
}
