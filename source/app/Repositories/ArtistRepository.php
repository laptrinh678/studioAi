<?php

namespace App\Repositories;

use App\Models\ArtistsModel;

class ArtistRepository extends BaseRepository
{
    public function model(): string
    {
        return ArtistsModel::class;
    }
}