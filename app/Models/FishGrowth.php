<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FishGrowth extends Model
{
    use HasFactory;

    protected $fillable = ['fish_id', 'length', 'recorded_at', 'photoUrl', 'user_id'];

    public function fish()
    {
        return $this->belongsTo(Fish::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}