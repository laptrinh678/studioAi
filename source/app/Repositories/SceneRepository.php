<?php

namespace App\Repositories;

use App\Models\SceneModel;

class SceneRepository extends BaseRepository
{
    public function model(): string
    {
        return SceneModel::class;
    }
}