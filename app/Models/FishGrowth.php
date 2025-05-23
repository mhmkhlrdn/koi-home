<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FishGrowth extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'fish_growth';

    protected $fillable = ['fish_id', 'length', 'weight', 'recorded_at', 'photoUrl', 'user_id'];

    public function fish()
    {
        return $this->belongsTo(Fish::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
