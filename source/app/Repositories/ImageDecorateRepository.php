<?php

namespace App\Repositories;



use App\Models\ImageDecorateModel;

class ImageDecorateRepository extends BaseRepository
{
    public function model(): string
    {
        return ImageDecorateModel::class;
    }
}