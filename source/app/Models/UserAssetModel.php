<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class UserAssetModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'user_assets';

    public $timestamps = false;

    protected $fillable = [
        "user_id",
        "type",
        "asset_path",
        "created_at",
        "updated_at"
    ];
}
