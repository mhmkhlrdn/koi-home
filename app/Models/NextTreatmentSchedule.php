<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NextTreatmentSchedule extends Model
{
    protected $fillable = ['datetime', 'fish_treatment_id'];

    public $timestamps = false;

    public function treatment(){
        return $this->belongsTo(FishTreatment::class);
    }
}
