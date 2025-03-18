<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuctionBid extends Model
{
    use HasFactory;

    protected $fillable = ['auction_id', 'customer_id', 'bid_amount', 'bid_time'];

    public function auction()
    {
        return $this->belongsTo(Auction::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}