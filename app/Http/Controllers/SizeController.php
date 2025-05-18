<?php

namespace App\Http\Controllers;

use App\Models\Bloodline;
use App\Models\Fish;
use App\Models\FishGrowth;
use App\Models\Variety;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SizeController extends Controller
{
    public function index(Request $request)
{
    $filters = $request->only(['search', 'variety', 'bloodline']);
    $query = Fish::with([
        'growthRecords' => fn($q) => $q->orderBy('recorded_at'),
        'variety',
        'bloodline'
    ])->has('growthRecords');

    if ($search = $request->input('search')) {
        $query->where('code', 'like', "%{$search}%");
    }

    if ($variety = $request->input('variety')) {
        $query->whereHas('variety', fn($q) => $q->where('name', $variety));
    }

    if ($bloodline = $request->input('bloodline')) {
        $query->whereHas('bloodline', fn($q) => $q->where('name', $bloodline));
    }

    $fishes = $query->paginate(10)->withQueryString();

    $grouped = $fishes->getCollection()->map(function ($fish) {
        $previousLength = 0;
        $previousWeight = 0;

        $records = $fish->growthRecords->map(function ($record) use (&$previousLength, &$previousWeight) {
            $trend = [
                'length' => $record->length > $previousLength ? 'up' : ($record->length < $previousLength ? 'down' : 'same'),
                'weight' => $record->weight > $previousWeight ? 'up' : ($record->weight < $previousWeight ? 'down' : 'same'),
            ];

            $previousLength = $record->length;
            $previousWeight = $record->weight;

            return [
                'id' => $record->id,
                'length' => $record->length,
                'weight' => $record->weight,
                'recorded_at' => $record->recorded_at,
                'trend' => $trend,
            ];
        });

        return [
            'id' => $fish->id,
            'birthDate' => $fish->birthDate,
            'fish_code' => $fish->code,
            'variety' => $fish->variety?->name ?? 'Unknown',
            'bloodline' => $fish->bloodline?->name ?? 'Unknown',
            'records' => $records,
        ];
    });

    return Inertia::render('admin/growth/index', [
        'growthData' => $grouped,
        'pagination' => [
            'links' => $fishes->linkCollection(),
            'meta' => $fishes->toArray(),
        ],
        'filters' => $filters,
        'fishCodes' => Fish::select('code')->orderBy('code')->get(),
        'varieties' => Variety::select('name')->orderBy('name')->get(),
        'bloodlines' => Bloodline::select('name')->orderBy('name')->get(),
    ]);
}


}