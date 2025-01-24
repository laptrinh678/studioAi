<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;
class AiGenerateModel extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'ai_generate';

    protected $fillable = [
        "prompt_original",
        "prompt",
        "negative_prompt",
        "guidance_scale",
        "image_height",
        "image_width",
        "num_images",
        "seed",
        "prompt_styles",
        "lora_names",
        "email",
        "name_voice",
        "name_mc",
        "type",
        "prompt_open_ai",
        "execute_time",
        "status_code"
    ];
}
