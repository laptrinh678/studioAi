<?php

namespace App\Http\Controllers\VirtualHuman;

use App\Http\Controllers\Controller;
use App\Repositories\TextRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class TextController extends Controller
{
    protected TextRepository $textRepository;

    public function __construct(TextRepository $textRepository)
    {
        $this->textRepository = $textRepository;
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $this->textRepository->create([
                'scene_id' => $request->input('scene_id'),
                'attrs' => $request->input('attrs'),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);

            return response()->json(['message' => 'Texts created'], 201);
        } catch (\Exception $e) {
            Log::error('Create texts error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function list($sceneId): \Illuminate\Http\JsonResponse
    {
        try {
            $texts = $this->textRepository
                ->where('scene_id', $sceneId)
                ->get();

            return response()->json(['data' => $texts, 'message' => 'Texts retrieved successfully']);
        } catch (\Exception $e) {
            Log::error('List texts error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
