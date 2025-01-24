<?php

namespace App\Repositories;

use App\Models\TextModel;

class TextRepository extends BaseRepository
{
    public function model(): string
    {
        return TextModel::class;
    }
}