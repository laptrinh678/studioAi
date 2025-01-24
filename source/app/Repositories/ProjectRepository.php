<?php

namespace App\Repositories;

use App\Models\ProjectModel;

class ProjectRepository extends BaseRepository
{
    public function model(): string
    {
        return ProjectModel::class;
    }
}