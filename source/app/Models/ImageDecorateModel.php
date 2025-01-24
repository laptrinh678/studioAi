<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class ImageDecorateModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'images_decorate';

    public $timestamps = false;

    protected $fillable = [
        "scene_id",
        "image_path",
        "attrs",
        "created_at",
        "updated_at"
    ];
}
