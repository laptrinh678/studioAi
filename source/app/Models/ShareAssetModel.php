<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;
class ShareAssetModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'share_assets';

    protected $fillable = [
        "user_id",
        "user_name",
        "type",
        "reused",
        "views",
        "likes",
        "shares",
        "attrs",
        "status",
        "result_path",
        "thumbnail_path"
    ];
}
