<?php

namespace App\Http\Controllers\VirtualHuman;

use App\Http\Controllers\Controller;
use App\Repositories\BackgroundRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class BackgroundController extends Controller
{
    protected BackgroundRepository $backgroundRepository;

    public function __construct(BackgroundRepository $backgroundRepository)
    {
        $this->backgroundRepository = $backgroundRepository;
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $this->backgroundRepository->create([
                'scene_id' => $request->input('scene_id'),
                'background_path' => $request->input('background_path'),
                'type' => $request->input('type'),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);

            return response()->json(['message' => 'Backgrounds created'], 201);
        } catch (\Exception $e) {
            Log::error('Create backgrounds error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function list($sceneId): \Illuminate\Http\JsonResponse
    {
        try {
            $backgrounds = $this->backgroundRepository
                ->where('scene_id', $sceneId)
                ->get();

            return response()->json(['data' => $backgrounds, 'message' => 'Backgrounds retrieved successfully']);
        } catch (\Exception $e) {
            Log::error('List backgrounds error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
