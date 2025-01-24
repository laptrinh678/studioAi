<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class SceneModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'scenes';

    public $timestamps = false;

    protected $fillable = [
        "project_id",
        "name",
        "order_number",
        "duration",
        "image_path",
        "created_at",
        "updated_at"
    ];
}
