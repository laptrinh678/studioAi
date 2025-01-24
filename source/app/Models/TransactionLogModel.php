<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class TransactionLogModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'transaction_logs';

    protected $fillable = [
        "email",
        "transaction_id",
        "requests",
        "expiry_dates_before",
        "expiry_dates_after",
        'response',
        "created_at"
    ];
}
