<?php

namespace App\Repositories;

use App\Models\ShareAssetModel;

class ShareAssetRepository extends BaseRepository
{
    public function model(): string
    {
        return ShareAssetModel::class;
    }
}