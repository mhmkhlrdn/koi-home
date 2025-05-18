<?php

namespace App\Http\Controllers;

use App\Exports\FishesExport;
use App\Models\Bloodline;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Fish;
use App\Models\FishGrowth;
use App\Models\Pool;
use App\Models\Variety;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class FishController extends Controller
{

    public function countByMonth(int $year, int $month)
    {
        // Ensure month is always two digits so 3 => 03 (optional)
        $month = str_pad($month, 2, '0', STR_PAD_LEFT);

        $count = Fish::whereYear('birthDate', $year)
                     ->whereMonth('birthDate', $month)
                     ->count();

                     $countFormatted = str_pad($count, 3, '0', STR_PAD_LEFT);
                     $nextCountFormatted = str_pad($count + 1, 3, '0', STR_PAD_LEFT);

        return response()->json([
            'year'  => $year,
            'month' => $month,
            'count' => $countFormatted,
            'nextCount' => $nextCountFormatted
        ]);
    }

    public function storeMeasure(Request $request){
$validated = $request->validate(
    ['fish_id' => 'required|numeric',
    'fish_code' => 'required|string',
    'length' => 'number',
    'weight' => 'number',
    'recorded_at' => 'date'
    ]
);
FishGrowth::create($validated);
    }

public function measure(Request $request){
    $fishId = $request->query('fish_id');
    if (!$fishId){
        return redirect()->route('dashboard')->withErrors(['error'=> 'No fish selected for measurement.']);
    }
    return Inertia::render('admin/measurement/create', [
        'fish' => Fish::with('growthRecords', 'variety', 'bloodline', 'pool')->find($fishId)
    ]);
}

    public function exportExcel() {
        return Excel::download(new FishesExport, 'fishes.xlsx');
    }

public function cetak () {
    $Fish = Fish::with('variety', 'bloodline', 'user', 'pool')->get();

    	$pdf = FacadePdf::loadview('cetak-pdf',['fish'=>$Fish]);
    	return $pdf->download('laporan-fish-pdf');
}

    public function update(Request $request, $id)
    {
    $fish = Fish::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:255',
            'bloodline_id' => 'required|numeric',
            'variety_id' => 'required|numeric',
            'gender' => 'required|in:male,female,unknown',
            'fixedPrice' => 'nullable|numeric',
            'birthDate' => 'required|date',
            'pool_id' => 'required|numeric',
        ]);

        $validated['user_id'] = auth()->id();

        $fish->update($validated);
        Log::info('Fish updated successfully', ['id' => $fish->id]);

        return redirect()->back()->with('success', 'Fish updated successfully.');
    }
    public function index(Request $request)
{
    $query = Fish::with(['bloodline', 'variety', 'user', 'pool', 'latestSize']);

    if ($request->bloodline_id) {
        $query->where('bloodline_id', $request->bloodline_id);
    }

    if ($request->variety_id) {
        $query->where('variety_id', $request->variety_id);
    }

    if ($request->owner_id) {
        $query->where('user_id', $request->owner_id);
    }

    if ($request->pool_id) {
        $query->where('pool_id', $request->pool_id);
    }
    if ($request->search_input) {
        $query->where('code', 'like', '%' . $request->search_input . '%' );
    }

    $fishes = $query->paginate(10)->appends($request->only([
        'bloodline_id',
        'variety_id',
        'owner_id',
        'pool_id',
    ]))->through(fn ($fish) => [
        'id' => $fish->id,
        'code' => $fish->code,
        'bloodline_id' => $fish->bloodline->id ?? null,
        'bloodline_name' => $fish->bloodline->name ?? null,
        'variety_id' => $fish->variety->id ?? null,
        'variety_name' => $fish->variety->name ?? null,
        'gender' => $fish->gender,
        'birthDate' => $fish->birthDate,
        'owner_id' => $fish->user->id ?? null,
        'owner_name' => $fish->user->name ?? null,
        'pool_id' => $fish->pool->id ?? null,
        'pool_name' => $fish->pool->name ?? null,
        'fish_photo' => $fish->latestSize->photoUrl ?? null,
        'fish_size' => $fish->latestSize->length ?? null,
        'recorded_at' => $fish->latestSize->recorded_at ?? null
    ]);

    $recentChanges = Fish::with('user')
    ->whereNotNull('updated_at')
    ->latest('updated_at')
    ->limit(5)
    ->get()
    ->map(fn ($fish) => [
        'fish_code' => $fish->code,
        'user_name' => $fish->user->name ?? 'Unknown',
        'modified_at' => $fish->updated_at->format('Y-m-d H:i:s'),
    ]);



    return Inertia::render('admin/fishes', [


        'fishItems' => $fishes,
        'recentChanges' => $recentChanges,
        'recentlyBornFishes' => Fish::whereBetween('birthDate', [now()->subDays(7), now()])->latest('birthDate')->get(['id', 'code', 'birthDate']),
        'bloodlines' => Bloodline::select('id', 'name')->get(),
        'varieties' => Variety::select('id', 'name')->get(),
        'users' => \App\Models\User::select('id', 'name')->get(),
        'pools' => Pool::select('id', 'name')->get(),
    ]);
}


public function create () {

    $bloodlines = Bloodline::all();
    $varieties = Variety::all();
    $pools = Pool::all();

    return Inertia::render('admin/fish/Create', [
        'bloodlines' => $bloodlines,
        'varieties' => $varieties,
        'pools' => $pools,
    ]);
}
public function store(Request $request)
{
    $validated = $request->validate([
        'code' => 'required|string|max:255|unique:fishes,code',
        'bloodline_id' => 'required|numeric',
        'variety_id' => 'required|numeric',
        'pool_id' => 'required|numeric',
        'birthDate' => 'required|date',
        'recordedDate' => 'required|date',
        'gender' => 'required|in:male,female,unknown',
        'size' => 'required|numeric',
        'weight' => 'required|numeric',
        'image' => 'nullable|image',
    ]);

    $validated['user_id'] = Auth::id();

    // Save fish
    $fish = Fish::create([
        'code' => $validated['code'],
        'bloodline_id' => $validated['bloodline_id'],
        'variety_id' => $validated['variety_id'],
        'pool_id' => $validated['pool_id'],
        'birthDate' => $validated['birthDate'],
        'gender' => $validated['gender'],
        'user_id' => Auth::id(),
    ]);

    // Handle uploaded image
    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('fish_images', 'public');
    }

    // Save fish growth
    FishGrowth::create([
        'length' => $validated['size'],
        'weight' => $validated['weight'],
        'recorded_at' => $validated['recordedDate'],
        'photoUrl' => $imagePath,
        'user_id' => Auth::id(),
        'fish_id' => $fish->id,
    ]);

    return redirect()->route('fishes')->with('success', 'Fish created successfully.');
}



}
