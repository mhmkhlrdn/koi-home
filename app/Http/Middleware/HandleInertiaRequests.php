<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'menus' => fn () => $this->getMenus(),
        ]);
    }

    private function getMenus()
    {
        $menus = Menu::select('id', 'title', 'url', 'icon_tag', 'parent_id')->get();
        return $this->buildMenuTree($menus);
    }

    private function buildMenuTree($menus, $parentId = null)
    {
        return $menus
            ->where('parent_id', $parentId)
            ->map(fn ($menu) => [
                'id' => $menu->id,
                'title' => $menu->title,
                'url' => $menu->url,
                'icon_tag' => $menu->icon_tag,
                'children' => $this->buildMenuTree($menus, $menu->id),
            ])
            ->values()
            ->toArray();
    }
}