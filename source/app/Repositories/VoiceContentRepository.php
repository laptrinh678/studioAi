<?php

namespace App\Repositories;

use App\Models\VoiceContentModel;

class VoiceContentRepository extends BaseRepository
{
    public function model(): string
    {
        return VoiceContentModel::class;
    }
}