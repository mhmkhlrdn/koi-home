<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreedingRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'requested_breeder_id', 'requested_fish_id', 'requester_fish_id',
        'status', 'request_date'
    ];

    public function requestedBreeder()
    {
        return $this->belongsTo(Breeder::class, 'requested_breeder_id');
    }

    public function requestedFish()
    {
        return $this->belongsTo(Fish::class, 'requested_fish_id');
    }

    public function requesterFish()
    {
        return $this->belongsTo(Fish::class, 'requester_fish_id');
    }
}