<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = ['name, flag'];

    public function breeders()
    {
        return $this->hasMany(Breeder::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }
}
