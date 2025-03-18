<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineType extends Model
{
    use HasFactory;

    protected $fillable = ['medicine_id', 'type_id'];

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }
}