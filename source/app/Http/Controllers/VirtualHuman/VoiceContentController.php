<?php

namespace App\Http\Controllers\VirtualHuman;

use App\Http\Controllers\Controller;
use App\Repositories\VoiceContentRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class VoiceContentController extends Controller
{
    protected VoiceContentRepository $voiceContentRepository;

    public function __construct(VoiceContentRepository $voiceContentRepository)
    {
        $this->voiceContentRepository = $voiceContentRepository;
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $this->voiceContentRepository->create([
                'scene_id' => $request->input('scene_id'),
                'content_path' => $request->input('content_path'),
                'type' => $request->input('type'),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);

            return response()->json(['message' => 'Voice content created'], 201);
        } catch (\Exception $e) {
            Log::error('Create voice content error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function list($sceneId): \Illuminate\Http\JsonResponse
    {
        try {
            $voices = $this->voiceContentRepository
                ->where('scene_id', $sceneId)
                ->get();

            return response()->json(['data' => $voices, 'message' => 'Voice content retrieved successfully']);
        } catch (\Exception $e) {
            Log::error('List voice content error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
