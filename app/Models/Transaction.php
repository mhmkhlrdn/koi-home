<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['total_price', 'customer_id', 'transactionTime', 'payment_status'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function transactionFishes()
    {
        return $this->hasMany(TransactionFish::class);
    }
}