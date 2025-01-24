<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class VoiceContentModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'voice_contents';

    public $timestamps = false;

    protected $fillable = [
        "scene_id",
        "content_path",
        "type",
        "region",
        "voice",
        "created_at",
        "updated_at"
    ];
}
