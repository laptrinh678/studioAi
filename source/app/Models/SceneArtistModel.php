<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class SceneArtistModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'scene_artist';

    public $timestamps = false;

    protected $fillable = [
        "scene_id",
        "artist_id",
        "attrs",
        "created_at",
        "updated_at"
    ];
}
