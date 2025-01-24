<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class ArtistsModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'artists';

    public $timestamps = false;

    protected $fillable = [
        "name",
        "code",
        "image_path",
        "order_number",
        "created_at",
        "updated_at"
    ];
}
