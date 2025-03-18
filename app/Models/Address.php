<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['address_line_one', 'address_line_two', 'city', 'province', 'postal_code', 'country_id'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
}