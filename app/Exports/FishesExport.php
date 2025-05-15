<?php

namespace App\Exports;

use App\Models\Fish;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class FishesExport implements FromView, ShouldAutoSize
{
    public function view(): View
    {
        $fish = Fish::with(['variety', 'bloodline', 'pool', 'user'])->get();
        return view('exports.fishes', ['fish' => $fish]);
    }

    // public function map($fish): array
    // {
    //     return [
    //         $fish->id,
    //         $fish->code,
    //         $fish->variety->name ?? 'N/A',
    //         $fish->bloodline->name ?? 'N/A',
    //         $fish->pool->name ?? 'N/A',
    //         $fish->user->name ?? 'N/A',
    //         $fish->created_at,
    //     ];
    // }

    // public function headings(): array
    // {
    //     return [
    //         'ID',
    //         'Fish Code',
    //         'Variety',
    //         'Bloodline',
    //         'Pool',
    //         'Inputted By',
    //         'Created At',
    //     ];
    // }
}
