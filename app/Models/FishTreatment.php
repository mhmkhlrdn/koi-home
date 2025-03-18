<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FishTreatment extends Model
{
    use HasFactory;

    protected $fillable = ['fish_disease_id', 'treatment_id', 'frequency', 'dosage', 'method', 'user_id'];

    public function fishDisease()
    {
        return $this->belongsTo(FishDisease::class);
    }

    public function treatment()
    {
        return $this->belongsTo(Treatment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}