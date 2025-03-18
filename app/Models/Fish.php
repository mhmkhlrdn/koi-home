<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fish extends Model
{
    use HasFactory;

    protected $table = 'fishes';

    protected $fillable = [
        'code', 'bloodline_id', 'variety_id', 'sale_type',
        'gender', 'fixedPrice', 'birthDate', 'user_id', 'pool_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bloodline()
    {
        return $this->belongsTo(Bloodline::class);
    }

    public function variety()
    {
        return $this->belongsTo(Variety::class);
    }

    public function pool()
    {
        return $this->belongsTo(Pool::class);
    }

    public function diseases()
    {
        return $this->belongsToMany(Disease::class,  'fish_diseases');
    }

    public function growthRecords()
    {
        return $this->hasMany(FishGrowth::class);
    }
}
