<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionFish extends Model
{
    use HasFactory;

    protected $fillable = ['transaction_id', 'fish_id', 'price'];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function fish()
    {
        return $this->belongsTo(Fish::class);
    }
}