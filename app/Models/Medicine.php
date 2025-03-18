<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'amount', 'measurement_id', 'instruction', 'packaging', 'image_url'];

    public function measurement()
    {
        return $this->belongsTo(Measurement::class);
    }

    public function types()
    {
        return $this->hasMany(MedicineType::class);
    }
}