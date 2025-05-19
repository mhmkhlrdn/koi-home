<?php

namespace App\Http\Controllers;

use App\Models\Fish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index () {
        return Inertia::render('admin/dashboard', ['fishesCount'=> Fish::count()]);
    }

    public function fishStatistics()
    {
        $daily = Fish::select(
                DB::raw('DATE(birthDate) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        $monthly = Fish::select(
                DB::raw('DATE_FORMAT(birthDate, "%Y-%m") as month'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->get();

        $yearly = Fish::select(
                DB::raw('YEAR(birthDate) as year'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->get();

        // Gender ratio
        $genderRatio = Fish::select(
                'gender',
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('gender')
            ->get();

        // Variety ratio
        $varietyRatio = Fish::with('variety')
            ->select(
                'variety_id',
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('variety_id')
            ->get()
            ->map(function($item) {
                return [
                    'variety_name' => $item->variety->name,
                    'count' => $item->count
                ];
            });

        return response()->json([
            'daily' => $daily,
            'monthly' => $monthly,
            'yearly' => $yearly,
            'gender_ratio' => $genderRatio,
            'total_fishes' => Fish::all()->count(),
            'variety_ratio' => $varietyRatio,
        ]);
    }
}