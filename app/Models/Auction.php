<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $fillable = [
        'fish_id', 'starting_price', 'highest_bid', 'bid_increment',
        'end_time', 'transaction_id', 'auction_status'
    ];

    public function fish()
    {
        return $this->belongsTo(Fish::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function bids()
    {
        return $this->hasMany(AuctionBid::class);
    }
}