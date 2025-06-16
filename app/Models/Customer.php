<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Customer extends Authenticatable
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'email',  'phone', 'address_id'];

    protected $guard = 'customer';


    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function bids()
    {
        return $this->hasMany(AuctionBid::class);
    }
}
