<?php

namespace App\Repositories;

use App\Models\UserLogModel;

class UserLogRepository extends BaseRepository
{
    public function model(): string
    {
        return UserLogModel::class;
    }

    public function createOrUpdate(array $attributes = [], array $values = [])
    {
        $this->newQuery();
        return $this->query->updateOrCreate($attributes, $values);
    }
}