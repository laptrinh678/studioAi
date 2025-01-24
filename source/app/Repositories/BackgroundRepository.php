<?php

namespace App\Repositories;

use App\Models\BackgroundModel;

class BackgroundRepository extends BaseRepository
{
    public function model(): string
    {
        return BackgroundModel::class;
    }
}