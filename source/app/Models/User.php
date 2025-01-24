<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class User extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'users';

    protected $fillable = [
        "email",
        "name",
        "phone_number",
        "role",
        "permissions",
        "start_date",
        "end_date",
        "expiry_date_gen_image",
        "expiry_date_gen_mc",
        "created_at",
        'updated_at'
    ];
}
