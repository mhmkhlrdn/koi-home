<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\DiseaseController;
use App\Http\Controllers\FishController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\VarietyController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SickController;
use App\Http\Controllers\TreatmentController;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', fn() => Inertia::render
('Home'));

Route::post('/kh-admin/diagnosis', [DiagnosisController::class, 'store'])->name('diagnosis.store');

Route::get('/kh-admin/api/treatments', function (Request $request) {
    try {
        $diseaseId = $request->query('disease_id');

        if (!$diseaseId) {
            return response()->json(['error' => 'disease_id is required'], 400);
        }

        $treatments = Treatment::where('disease_id', $diseaseId)->get();

        return response()->json($treatments);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);

Route::middleware('guest')->group(function () {
    Route::get('/register', function () {
        return Inertia::render('auth/register');
    })->name('register');
    Route::post('/register', [LoginController::class, 'register'])->name('createAccount');
});

Route::put('/kh-admin/fishes/{id}', [FishController::class, 'update'])->name('fishes.update');
Route::middleware('auth')->group(function () {
    Route::prefix('kh-admin')->group(function (){
        Route::patch('/information', [InformationController::class, 'update'])->name('info.update');
        Route::get('/information', [InformationController::class, 'index'])->name('information');
        Route::get('/medicines', [MedicineController::class, 'index'])->name('medicine.index');
        Route::get('/diseases/treatment', [TreatmentController::class, 'index'])->name('treatment.index');
        Route::get('/disease/create', [DiseaseController::class, 'create'])->name('disease.create');
        Route::get('/dashboard', [DashboardController::class, 'index']
        )->name('dashboard');
        Route::get('/information/country', [CountryController::class, 'index'])->name('country.index');
        Route::get('/diagnosis/create', [DiagnosisController::class, 'create'])->name('diagnosis.create');
        Route::get('/information/menu', [MenuController::class, 'index'])->name('menu.index');
        Route::put('/information/menu/{id}/enable', [MenuController::class, 'enable'])->name('enableMenu');
        Route::put('/information/menu/{id}/disable', [MenuController::class, 'disable'])->name('disableMenu');
        Route::post('/treatment/store', [TreatmentController::class, 'store'])->name('treatment.store');
        Route::get('/fishes', [FishController::class, 'index'])->name('fishes');

        Route::prefix('fishes')->group(function (){
            Route::get('/export-excel', [FishController::class, 'exportExcel'])->name('fishes.excel');
            Route::get('/cetak-pdf', [FishController::class, 'cetak'])->name('fishes.cetak');
            Route::get('/create', [FishController::class, 'create'])->name('fishes.create');
            Route::get('/measure', [FishController::class, 'measure'])->name('fishes.measure');
            Route::post('/measure/store', [FishController::class, 'storeMeasure'])->name('measurement.store');
            Route::post('/store', [FishController::class, 'store'])->name('fishes.store');
            Route::get('/variety', [VarietyController::class, 'index'])->name('variety');
            Route::post('/variety/store', [VarietyController::class, 'store'])->name('variety.store');
        Route::post('/treatment/update', [TreatmentController::class, 'update'])->name('treatment.update');

            Route::get('/sickfishes', [SickController::class, 'index'])->name('sick-fishes');
            Route::get('/treatedfishes', [SickController::class, 'index_treated'])->name('treated-fishes');
            Route::post('/sickfishes/recovery', [SickController::class, 'recovery'])->name('fish.recovery');
            Route::post("/treatment", [TreatmentController::class, 'treat'])->name('treatment.treat');
            Route::post("/treatment/treated", [TreatmentController::class, 'treated'])->name('treatment.treated');
            });
        Route::get('/pools', function(){
            return Inertia::render('admin/pools');
        });
        Route::get('/diseases', [DiseaseController::class, 'index'])->name('diseases');
        Route::post('/diseases', [DiseaseController::class, 'store'])->name('diseases.store');
        Route::get('/breeders', function(){
            return Inertia::render('admin/breeders');
        });
    });
});



Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');






Route::prefix('secret')->group(function (){
    Route::get('/menus', function(){
        return Inertia::render('tests/menu');
    });
    Route::get('/tests', function(){
        return Inertia::render('tests/page');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';