<?php

namespace App\Http\Controllers;

use App\Models\Fish;
use App\Models\FishDisease;
use App\Models\FishGrowth;
use App\Models\FishTreatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index () {
        return Inertia::render('admin/dashboard', ['fishesCount'=> Fish::count()]);
    }

    public function medicineUsageStatistics(Request $request)
{
    $query = FishTreatment::with(['treatment.medicine.measurement'])
        ->select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('YEAR(created_at) as year'),
            'treatment_id',
            DB::raw('SUM(dosage) as total_dosage'),
            DB::raw('COUNT(*) as treatment_count')
        )
        ->groupBy('date', 'month', 'year', 'treatment_id');

    // Apply date filters if needed
    if ($request->has(['start_date', 'end_date'])) {
        $query->whereBetween('created_at', [
            $request->input('start_date'),
            $request->input('end_date')
        ]);
    }

    $results = $query->get();

    // Format data for different time periods
    $dailyUsage = $results->groupBy('date')->map(function($day) {
        return [
            'date' => $day->first()->date,
            'treatments' => $day->sum('treatment_count'),
            'medicines' => $day->groupBy('treatment_id')->map(function($treatment) {
                return [
                    'name' => $treatment->first()->treatment->name,
                    'dosage' => $treatment->sum('total_dosage'),
                    'unit' => $treatment->first()->treatment->medicine->measurement->name ?? 'ml'
                ];
            })
        ];
    });

    $monthlyUsage = $results->groupBy('month')->map(function($month) {
        return [
            'month' => $month->first()->month,
            'treatments' => $month->sum('treatment_count'),
            'medicines' => $month->groupBy('treatment_id')->map(function($treatment) {
                return [
                    'name' => $treatment->first()->treatment->name,
                    'dosage' => $treatment->sum('total_dosage'),
                    'unit' => $treatment->first()->treatment->medicine->measurement->name ?? 'ml',

                ];
            })
        ];
    });

    $yearlyUsage = $results->groupBy('year')->map(function($year) {
        return [
            'year' => $year->first()->year,
            'treatments' => $year->sum('treatment_count'),
            'medicines' => $year->groupBy('treatment_id')->map(function($treatment) {
                return [
                    'name' => $treatment->first()->treatment->name,
                    'dosage' => $treatment->sum('total_dosage'),
                    'unit' => $treatment->first()->treatment->medicine->measurement->name ?? 'ml'
                ];
            })
        ];
    });

    return response()->json([
        'daily_usage' => $dailyUsage->values(),
        'monthly_usage' => $monthlyUsage->values(),
        'yearly_usage' => $yearlyUsage->values(),
        'top_medicines' => $results->groupBy('treatment_id')
            ->map(function($treatment) {
                return [
                    'name' => $treatment->first()->treatment->name,
                    'total_dosage' => $treatment->sum('total_dosage'),
                    'unit' => $treatment->first()->treatment->medicine->measurement->name ?? 'ml'
                ];
            })
            ->sortByDesc('total_dosage')
            ->take(5)
            ->values()
    ]);
}

    public function fishGrowthStatistics()
{
    // Fish without recent measurements (older than 30 days)
    $inactiveFish = Fish::whereDoesntHave('growthRecords', function($query) {
        $query->where('recorded_at', '>=', now()->subDays(30));
    })
    ->with(['latestSize'])
    ->get()
    ->map(function($fish) {
        return [
            'fish_id' => $fish->id,
            'code' => $fish->code,
            'last_measurement' => $fish->latestSize?->recorded_at,
            'days_since_measurement' => $fish->latestSize
                ? now()->diffInDays($fish->latestSize->recorded_at)
                : 'Never measured'
        ];
    });

    // Improved query for shrinking fish
    $shrinkingFish = Fish::whereHas('growthRecords', function($query) {
            $query->groupBy('fish_id')
                ->havingRaw('COUNT(*) > 1');
        })
        ->with(['growthRecords' => function($query) {
            $query->orderBy('recorded_at', 'desc');
        }])
        ->get()
        ->map(function($fish) {
            $records = $fish->growthRecords;

            if ($records->count() < 2) {
                return null;
            }

            $latest = $records[0];
            $previous = $records[1];

            $lengthDecreased = $latest->length < $previous->length;
            $weightDecreased = $latest->weight < $previous->weight;

            if (!$lengthDecreased && !$weightDecreased) {
                return null;
            }

            return [
                'fish_id' => $fish->id,
                'code' => $fish->code,
                'current_length' => $latest->length,
                'previous_length' => $previous->length,
                'current_weight' => $latest->weight,
                'previous_weight' => $previous->weight,
                'last_measured' => $latest->recorded_at,
                'change_percentage' => [
                    'length' => round((($latest->length - $previous->length) / $previous->length) * 100, 2),
                    'weight' => round((($latest->weight - $previous->weight) / $previous->weight) * 100, 2)
                ]
            ];
        })
        ->filter() // Remove null entries
        ->values();

    return response()->json([
        'inactive_fish' => $inactiveFish,
        'shrinking_fish' => $shrinkingFish
    ]);
}





public function fishStatistics()
    {
        // Fishes added/born per day/month/year
        $daily = Fish::select(
                DB::raw('DATE(birthDate) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->limit(30)
            ->get();

        $monthly = Fish::select(
                DB::raw('DATE_FORMAT(birthDate, "%Y-%m") as month'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->limit(12)
            ->get();

        $yearly = Fish::select(
                DB::raw('YEAR(birthDate) as year'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->limit(5)
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

    // app/Http/Controllers/DashboardController.php

public function diseaseStatistics(Request $request)
{
    $query = FishDisease::with(['fish', 'disease']);

    // Apply date filters if provided
    if ($request->has('start_date') && $request->has('end_date')) {
        $query->whereBetween('diagnosis_date', [
            $request->input('start_date'),
            $request->input('end_date')
        ]);
    }

    // Daily diagnoses
    $dailyDiagnoses = (clone $query)->select(
            DB::raw('DATE(diagnosis_date) as date'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy(DB::raw('DATE(diagnosis_date)'))
        ->orderBy(DB::raw('DATE(diagnosis_date)'), 'desc')
        ->get();

    // Monthly diagnoses
    $monthlyDiagnoses = (clone $query)->select(
            DB::raw('DATE_FORMAT(diagnosis_date, "%Y-%m") as month'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy(DB::raw('DATE_FORMAT(diagnosis_date, "%Y-%m")'))
        ->orderBy(DB::raw('DATE_FORMAT(diagnosis_date, "%Y-%m")'), 'desc')
        ->get();

    // Yearly diagnoses
    $yearlyDiagnoses = (clone $query)->select(
            DB::raw('YEAR(diagnosis_date) as year'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy(DB::raw('YEAR(diagnosis_date)'))
        ->orderBy(DB::raw('YEAR(diagnosis_date)'), 'desc')
        ->get();

    // Disease ratio
    $diseaseRatio = (clone $query)->with('disease')
        ->select(
            'disease_id',
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('disease_id')
        ->get()
        ->map(function($item) {
            return [
                'disease_name' => $item->disease->name,
                'count' => $item->count
            ];
        });

    // Recovery status
    $recoveryStatus = (clone $query)->select(
            DB::raw('CASE WHEN recovery_date IS NULL THEN "Not Recovered" ELSE "Recovered" END as status'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('status')
        ->get();

    // Long-term cases (more than 30 days without recovery)
    $longTermCases = (clone $query)->whereNull('recovery_date')
        ->where('diagnosis_date', '<=', now()->subDays(30))
        ->with(['fish', 'disease'])
        ->orderBy('diagnosis_date', 'asc')
        ->get()
        ->map(function($item) {
            return [
                'fish_code' => $item->fish->code,
                'disease_name' => $item->disease->name,
                'diagnosis_date' => $item->diagnosis_date,
                'days_sick' => now()->diffInDays($item->diagnosis_date),
                'treatments_count' => $item->treatments->count()
            ];
        });

    // Disease frequency over time
    $diseaseFrequency = (clone $query)->with('disease')
        ->select(
            'disease_id',
            DB::raw('DATE(diagnosis_date) as date'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('disease_id', DB::raw('DATE(diagnosis_date)'))
        ->orderBy('date', 'desc')
        ->get()
        ->groupBy('disease_id')
        ->map(function($items, $diseaseId) {
            return [
                'disease_name' => $items->first()->disease->name,
                'data' => $items->map(function($item) {
                    return [
                        'date' => $item->date,
                        'count' => $item->count
                    ];
                })
            ];
        })->values();

    return response()->json([
        'daily_diagnoses' => $dailyDiagnoses,
        'monthly_diagnoses' => $monthlyDiagnoses,
        'yearly_diagnoses' => $yearlyDiagnoses,
        'disease_ratio' => $diseaseRatio,
        'recovery_status' => $recoveryStatus,
        'long_term_cases' => $longTermCases,
        'disease_frequency' => $diseaseFrequency,
    ]);
}
}
