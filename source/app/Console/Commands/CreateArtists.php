<?php

namespace App\Console\Commands;

use App\Models\ArtistsModel;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CreateArtists extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:artists';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create default artists';

    /**
     * Execute the console command.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function handle()
    {
        ArtistsModel::insert([
            [
                "name" => "Vũ Thị Hạnh",
                "code" => "hanhvt41",
                "image_path" => "/images/HanhVT.png",
                "order_number" => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Nguyễn Phùng Bảo Châu",
                "code" => "chaunpb",
                "image_path" => "/images/ChauNPB.png",
                "order_number" => 2,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Đặng Thanh Vân",
                "code" => "vandt36",
                "image_path" => "/images/VanDT.png",
                "order_number" => 3,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Hoàng Giang",
                "code" => "giangh",
                "image_path" => "/images/GiangH.png",
                "order_number" => 4,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Mai Thu Hoài",
                "code" => "hoaimt",
                "image_path" => "/images/HoaiMT1.png",
                "order_number" => 5,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "name" => "Nguyễn Khả Ngọc Anh",
                "code" => "anhnkn",
                "image_path" => "/images/AnhNKN.png",
                "order_number" => 6,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]
        ]);

        $this->info('Artists created successfully!');
    }
}
