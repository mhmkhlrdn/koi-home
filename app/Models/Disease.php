<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disease extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function treatments()
    {
        return $this->hasMany(Treatment::class);
    }

    public function fishes()
    {
        return $this->belongsToMany(Fish::class, 'fish_diseases');
    }
}
