<?php

namespace App\Repositories;

use App\Models\SceneArtistsModel;

class SceneArtistRepository extends BaseRepository
{
    public function model(): string
    {
        return SceneArtistsModel::class;
    }
}