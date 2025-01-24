<?php

namespace App\Repositories;


use App\Models\UserAssetModel;

class UserAssetRepository extends BaseRepository
{
    public function model(): string
    {
        return UserAssetModel::class;
    }
}