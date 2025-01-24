<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;
class UserLogModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'user_logs';

    protected $fillable = [
        "user_id",
        "share_asset_id",
        "action"
    ];
}
