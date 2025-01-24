<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class ProjectModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'projects';

    public $timestamps = false;

    protected $fillable = [
        "name",
        "user_id",
        "video_path",
        "created_at",
        "updated_at"
    ];
}
