<?php

namespace App\Http\Controllers\VirtualHuman;

use App\Http\Controllers\Controller;
use App\Repositories\ArtistRepository;
use App\Repositories\BackgroundRepository;
use App\Repositories\ImageDecorateRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\SceneArtistRepository;
use App\Repositories\SceneRepository;
use App\Repositories\TextRepository;
use App\Repositories\VoiceContentRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class SceneController extends Controller
{
    protected SceneArtistRepository $sceneArtistRepository;
    protected ProjectRepository $projectRepository;
    protected BackgroundRepository $backgroundRepository;
    protected TextRepository $textRepository;
    protected SceneRepository $sceneRepository;
    protected VoiceContentRepository $voiceContentRepository;
    protected ArtistRepository $artistRepository;
    protected ImageDecorateRepository $imageDecorateRepository;

    public function __construct(
        SceneArtistRepository $sceneArtistRepository,
        ProjectRepository $projectRepository,
        BackgroundRepository $backgroundRepository,
        TextRepository $textRepository,
        SceneRepository $sceneRepository,
        VoiceContentRepository $voiceContentRepository,
        ArtistRepository $artistRepository,
        ImageDecorateRepository $imageDecorateRepository
    )
    {
        $this->sceneArtistRepository = $sceneArtistRepository;
        $this->projectRepository = $projectRepository;
        $this->backgroundRepository = $backgroundRepository;
        $this->textRepository = $textRepository;
        $this->sceneRepository = $sceneRepository;
        $this->voiceContentRepository = $voiceContentRepository;
        $this->artistRepository = $artistRepository;
        $this->imageDecorateRepository = $imageDecorateRepository;
    }

    public function createOrUpdate(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $projects = $this->sceneRepository->where('project_id', $request->get('project_id'))->get();
            if (!$projects->isEmpty()) {
                foreach ($projects as $project) {
                    $project->delete();
                }
            }

            $projectId = $request->get('project_id');
            $now = Carbon::now()->format('Y-m-d H:i:s');

            $this->sceneRepository->createMultiple([
                [
                    'project_id' => $projectId,
                    'order_number' => 0,
                    'duration' => $request->get('duration'),
                    'created_at' => $now,
                    'updated_at' => $now
                ],
                [
                    'project_id' => $projectId,
                    'order_number' => 1,
                    'duration' => $request->get('duration'),
                    'created_at' => $now,
                    'updated_at' => $now
                ],
                [
                    'project_id' => $projectId,
                    'order_number' => 2,
                    'duration' => $request->get('duration'),
                    'created_at' => $now,
                    'updated_at' => $now
                ]
            ]);

            return response()->json(['message' => 'Scenes created'], 201);
        } catch (\Exception $e) {
            Log::error('Create scenes error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function list($projectId): \Illuminate\Http\JsonResponse
    {
        try {
            $project = $this->projectRepository->where('_id', $projectId)->first();
            $scenes = $this->sceneRepository
                ->where('project_id', $projectId)
                ->orderBy('order_number')
                ->get();

            $body = [];
            foreach ($scenes as $scene) {
                // Lấy thông tin mc trong phân cảnh
                $sceneArtist = $this->sceneArtistRepository->where('scene_id', $scene->_id)->first();
                $artist = $this->artistRepository->where('_id', $sceneArtist->artist_id)->get();

                // Lấy thông tin background trong phân cảnh
                $background = $this->backgroundRepository->where('scene_id', $scene->_id)->first();

                // Lấy thông tin textNode trong phân cảnh
                $textNodes = $this->textRepository->where('scene_id', $scene->_id)->first();

                // Lấy thông tin voice content trong phân cảnh
                $voiceContent = $this->voiceContentRepository->where('scene_id', $scene->_id)->first();
                if ($voiceContent['type'] == 'message') {
                    $url = $voiceContent['content_path'];
                    $contents = !empty($url) ? $this->getFileContent($url) : '';
                } else {
                    $contents = $voiceContent['content_path'];
                }

                // Lấy thông tin image decorate trong phân cảnh
                $imagesDecorate = $this->imageDecorateRepository->where('scene_id', $scene->_id)->get();

                $body[] = [
                    'video_path' => $project['video_path'] ?? '',
                    'scene' => [
                        'name' => $scene['name'],
                        'duration' => $scene['duration'],
                        'preview' => $scene['image_path'],
                    ],
                    'artist' => [
                        'info' => $artist->first() ?? null,
                        'attrs' => $sceneArtist['attrs']
                    ],
                    'background' => [
                        'img' => $background['background_path'],
                    ],
                    'voice' => [
                        'type' => $voiceContent['type'],
                        'content' => $contents,
                        'region' => $voiceContent['region'] ?: 'norther',
                        'name' => $voiceContent['voice'] ?: 'hn-quynhanh',
                    ],
                    'text_nodes' => [
                        'attrs' => $textNodes['attrs']
                    ],
                    'images_decorate' => $imagesDecorate,
                ];
            }

            return response()->json(['data' => $body, 'message' => 'Scenes retrieved successfully']);
        } catch (\Exception $e) {
            Log::error('List scenes error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    protected function getFileContent($url)
    {
        try {
            return file_get_contents($url);
        } catch (\Exception $e) {
            return '';
        }
    }
}
