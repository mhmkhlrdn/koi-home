<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FishDisease extends Model
{
    use HasFactory;

    protected $fillable = ['fish_id', 'disease_id', 'diagnosis_date', 'recovery_date', 'user_id'];

    public function fish()
    {
        return $this->belongsTo(Fish::class);
    }

    public function disease()
    {
        return $this->belongsTo(Disease::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function treatments()
    {
        return $this->hasMany(FishTreatment::class);
    }
}
