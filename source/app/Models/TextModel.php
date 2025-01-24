<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class TextModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'texts';

    public $timestamps = false;

    protected $fillable = [
        "scene_id",
        "attrs",
        "created_at",
        "updated_at"
    ];
}
