<?php

namespace App\Http\Controllers;

use App\Models\Information;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformationController extends Controller
{
    public function index () {
        $information = Information::get();
        return Inertia::render('admin/information', [
            'information' => $information
        ]);
    }

    public function update(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string',
        'addressLineOne' => 'required|string',
        'addressLineTwo' => 'nullable|string',
        'city' => 'required|string',
        'province' => 'required|string',
        'postalCode' => 'required|string',
        'country' => 'required|string',
        'logo_url' => 'nullable|url',
    ]);

    $info = Information::first(); // since there's only one row
    $info->update($validated);

    return back()->with('success', 'Information updated successfully.');
}


}
