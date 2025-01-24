<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class BackgroundModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'backgrounds';

    public $timestamps = false;

    protected $fillable = [
        "scene_id",
        "background_path",
        "type",
        "created_at",
        "updated_at"
    ];
}
