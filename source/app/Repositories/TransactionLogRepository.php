<?php

namespace App\Repositories;


use App\Models\TransactionLogModel;

class TransactionLogRepository extends BaseRepository
{
    public function model(): string
    {
        return TransactionLogModel::class;
    }
}