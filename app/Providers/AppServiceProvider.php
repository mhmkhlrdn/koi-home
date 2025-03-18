<?php

namespace App\Providers;

use App\Models\Information;
use App\Models\Menu;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
    Inertia::share([
            'info' => fn() => Information::select('logo_url', 'name', 'addressLineOne', 'addressLineTwo', 'city', 'province', 'postalCode', 'country')->first()
        ]);
        Inertia::share([
            'auth' => fn() => Auth::check() ? [
                'user' => Auth::user(),
            ] : null,
        ]);
    }
}