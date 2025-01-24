<?php

namespace App\Repositories;

use App\Models\AiGenerateModel;

class AiGenerateRepository extends BaseRepository
{
    public function model(): string
    {
        return AiGenerateModel::class;
    }
}