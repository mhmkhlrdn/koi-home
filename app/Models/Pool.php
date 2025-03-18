<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pool extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'capacity', 'water_type', 'temperature', 'description'];

    public function fishes()
    {
        return $this->hasMany(Fish::class);
    }
}