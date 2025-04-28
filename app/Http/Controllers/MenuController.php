<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;


class MenuController extends Controller
{
    public function index() {
$menuInfo = Menu::with('parent')->get();
    return Inertia::render('admin/Menu', [
        'menuInfo' => $menuInfo,
    ]);
}

    public function enable($id) {
        $menu = Menu::findOrFail($id);
        $menu->update([
            'isEnabled' => 1,
        ]);
    }
    public function disable($id) {
        $menu = Menu::findOrFail($id);
        $menu->update([
            'isEnabled' => 0,
        ]);
    }

}