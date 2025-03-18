<?php

namespace App\Http\Controllers;

use App\Models\Fish;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index () {
        return Inertia::render('admin/dashboard', ['fishesCount'=> Fish::count()]);
    }
}