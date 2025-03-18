<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bloodline extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function fishes()
    {
        return $this->hasMany(Fish::class);
    }
}