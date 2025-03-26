<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'disease_id', 'medicine_id', 'description'];

    public function disease()
    {
        return $this->belongsTo(Disease::class);
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }
}
