<?php

namespace App\Http\Controllers\VirtualHuman;

use App\Http\Controllers\Controller;
use App\Repositories\ArtistRepository;
use App\Repositories\BackgroundRepository;
use App\Repositories\ImageDecorateRepository;
use App\Repositories\SceneArtistRepository;
use App\Repositories\SceneRepository;
use App\Repositories\TextRepository;
use App\Repositories\UserRepository;
use App\Repositories\VoiceContentRepository;
use App\Traits\FileManagement;
use Illuminate\Http\Request;
use App\Models\User;
use App\Repositories\ProjectRepository;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    use FileManagement;

    protected SceneArtistRepository $sceneArtistRepository;
    protected ProjectRepository $projectRepository;
    protected BackgroundRepository $backgroundRepository;
    protected TextRepository $textRepository;
    protected SceneRepository $sceneRepository;
    protected VoiceContentRepository $voiceContentRepository;
    protected UserRepository $userRepository;
    protected ImageDecorateRepository $imageDecorateRepository;

    public function __construct(
        SceneArtistRepository $sceneArtistRepository,
        ProjectRepository $projectRepository,
        BackgroundRepository $backgroundRepository,
        TextRepository $textRepository,
        SceneRepository $sceneRepository,
        VoiceContentRepository $voiceContentRepository,
        UserRepository $userRepository,
        ImageDecorateRepository $imageDecorateRepository,
    )
    {
        $this->sceneArtistRepository = $sceneArtistRepository;
        $this->projectRepository = $projectRepository;
        $this->backgroundRepository = $backgroundRepository;
        $this->textRepository = $textRepository;
        $this->sceneRepository = $sceneRepository;
        $this->voiceContentRepository = $voiceContentRepository;
        $this->userRepository = $userRepository;
        $this->imageDecorateRepository = $imageDecorateRepository;
    }

    public function save(Request $request)
    {
        try {
            $requestAll = $request->all();
            // Xóa những phân cảnh cũ và thay phân cảnh mới
            $scenes = $this->sceneRepository->where('project_id', $requestAll['project_id'])->get();
            if ($scenes->isNotEmpty()) {
                $scenesIds = $scenes->pluck('_id')->toArray();

                $this->sceneArtistRepository->whereIn('scene_id', $scenesIds)->delete();
                $this->textRepository->whereIn('scene_id', $scenesIds)->delete();
                $this->backgroundRepository->whereIn('scene_id', $scenesIds)->delete();
                $this->voiceContentRepository->whereIn('scene_id', $scenesIds)->delete();
                $this->imageDecorateRepository->whereIn('scene_id', $scenesIds)->delete();
                $this->sceneRepository->where('project_id', $requestAll['project_id'])->delete();
            }

            if (!empty($requestAll['artist_info'])) {
                foreach ($requestAll['artist_info'] as $key => $value) {
                    // Lưu thông tin từng phân cảnh
                    $imagePreviewUrl = $this->uploadFile($requestAll['image_preview'][$key], '');
                    $scene = $this->sceneRepository->create([
                        'project_id' => $requestAll['project_id'],
                        'order_number' => $key + 1,
                        'name' => $requestAll['name'][$key] ?? '',
                        'duration' => $requestAll['duration'][$key] ?? 1,
//                        'image_path' => config('app.sub_domain_minio').$imagePreviewUrl,
                        'image_path' => str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $imagePreviewUrl),
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                    ]);

                    // Lưu thông tin giọng đọc trong phân cảnh
                    $this->saveVoiceContent($requestAll, $key, $scene->_id);

                    // Lưu thông tin background trong phân cảnh
                    $this->saveBackground($requestAll['background_image'][$key], $scene->_id);

                    // Lưu thông tin các textNode trong phân cảnh
                    $this->saveTextNode(json_decode($requestAll['nodes_attr'][$key], true), $scene->_id);

                    // Lưu thông tin mc trong phân cảnh
                    $this->saveArtist(json_decode($requestAll['nodes_attr'][$key], true), $value, $scene->_id);

                    // Lưu thông tin image decorate trong phân cảnh
                    $this->saveImageDecorate(json_decode($requestAll['image_decorate'][$key], true), $scene->_id);
                }
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error(sprintf('Save Project Error: %s. File: %s. Line: %s', $e->getMessage(), $e->getFile(), $e->getLine()));
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    protected function saveVoiceContent($requestAll, $key, $sceneId)
    {
        $voiceContent = $requestAll['audio'][$key];
        $contentType = $requestAll['content_type'][$key];

        // Trường hợp nội dung là null thì sẽ lưu null
        if (empty($voiceContent) || $voiceContent == 'null') {
            $this->voiceContentRepository->create([
                'scene_id' => $sceneId,
                'content_path' => null,
                'type' => $contentType ?? 'message',
                'region' => $requestAll['region'][$key] ?? 'norther',
                'voice' => $requestAll['mc_voice'][$key] ?? 'hn-quynhanh',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
            return true;
        }

        // Trường hợp có nội dung thì sẽ ghi vào file và upload lên minio
        if (gettype($voiceContent) == 'string') {
            file_put_contents(storage_path('voice_content.txt'), $voiceContent, FILE_APPEND | LOCK_EX);
            $file = new UploadedFile(storage_path('voice_content.txt'), 'voice_content');
            $voiceContentUrl = $this->uploadFile($file, '');
        } else {
            $voiceContentUrl = $this->uploadFile($voiceContent, '');
        }

        $this->voiceContentRepository->create([
            'scene_id' => $sceneId,
//            'content_path' => config('app.sub_domain_minio').$voiceContentUrl,
            'content_path' => str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $voiceContentUrl),
            'type' => $contentType ?? 'message',
            'region' => $requestAll['region'][$key] ?? 'norther',
            'voice' => $requestAll['mc_voice'][$key] ?? 'hn-quynhanh',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        if (gettype($voiceContent) == 'string') {
            unlink(storage_path('voice_content.txt'));
        }
    }

    protected function saveBackground($backgroundImg, $sceneId)
    {
        $this->backgroundRepository->create([
            'scene_id' => $sceneId,
            'background_path' => $backgroundImg ?? '',
            'type' => 'image',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }

    protected function saveTextNode($nodes, $sceneId)
    {
        $textNode = [];
        foreach ($nodes as $node) {
            $item = json_decode($node, true);
            if ($item['className'] == 'Text') {
                $textNode[] = $item['attrs'];
            }
        }

        $this->textRepository->create([
            'scene_id' => $sceneId,
            'attrs' => $textNode,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }

    protected function saveArtist($nodes, $artistInfo, $sceneId)
    {
        $artistNode = json_decode($nodes[1], true);
        $artistInfo = json_decode($artistInfo, true);
        $this->sceneArtistRepository->create([
            'scene_id' => $sceneId,
            'artist_id' => $artistInfo['_id'] ?? null,
            'attrs' => $artistNode['attrs'],
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }

    protected function saveImageDecorate($nodes, $sceneId)
    {
        foreach ($nodes as $node) {
            $this->imageDecorateRepository->create([
                'scene_id' => $sceneId,
                'image_path' => $node['imagePath'] ?? null,
                'attrs' => $node['attr'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }
    }

//    protected function upload($file, $extension)
//    {
//        try {
//            $name = sprintf('%s_%s_%s', Carbon::now()->format('dmY'), time(), $extension);
//            $fileContent = file_get_contents($file->getRealPath());
//            Storage::disk('minio')->write($name, $fileContent);
//
//            return sprintf('/%s/%s', config('app.minio_bucket'), $name);
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()]);
//        }
//    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            if (empty($request->get('name'))) {
                return response()->json(['message' => Lang::get('validation.project_name_required')], 422);
            }

            if ($this->isNameExist($request->get('name'))) {
                return response()->json(['message' => Lang::get('validation.project_name_unique')], 422);
            }

            $session = session('user_logged_in');
            $email = $session['email'] ?? null;
            $user = User::where('email', $email)->first();

            $project = $this->projectRepository->create([
                'name' => $request->get('name') ?? null,
                'user_id' => $user->_id ?? null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);

            return response()->json(['message' => 'Project created', 'project' => $project], 201);
        } catch (\Exception $e) {
            Log::error('Create project error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function list(): \Illuminate\Http\JsonResponse
    {
        try {
            $session = session('user_logged_in');
            $email = $session['email'] ?? null;
            $user = User::where('email', $email)->first();
            if (empty($user)) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $projects = $this->projectRepository
                ->where('user_id', $user->_id)
                ->orderBy('updated_at', 'desc')
                ->get(['name', 'created_at', 'updated_at']);

            return response()->json(['data' => $projects, 'message' => 'Projects retrieved successfully']);
        } catch (\Exception $e) {
            Log::error('List project error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function delete(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // Xóa dự án
            $projectId = $request->get('project_id');
            $projectCollection = $this->projectRepository->find($projectId)->get();
            if ($projectCollection->isEmpty()) {
                return response()->json(['message' => 'Project not found'], 404);
            }

            $projectCollection->first()->delete();

            // Xóa các phân cảnh trong dự án và các thành phần trong phân cảnh
            $scenes = $this->sceneRepository->where('project_id', $projectId)->get();
            $scenesIds = $scenes->pluck('_id')->toArray();

            $this->sceneArtistRepository->whereIn('scene_id', $scenesIds)->delete();
            $this->textRepository->whereIn('scene_id', $scenesIds)->delete();
            $this->backgroundRepository->whereIn('scene_id', $scenesIds)->delete();
            $this->voiceContentRepository->whereIn('scene_id', $scenesIds)->delete();
            $this->sceneRepository->where('project_id', $projectId)->delete();

            return response()->json(['message' => 'Project deleted']);
        } catch (\Exception $e) {
            Log::error('Delete project error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    protected function isNameExist($name): bool
    {
        $userLoggedIn = session('user_logged_in');
        $user = $this->userRepository->where('email', $userLoggedIn['email'])->first();
        $projects = $this->projectRepository
            ->where('user_id', $user['_id'])
            ->where('name', $name)->get();
        if ($projects->isEmpty()) {
            return false;
        }

        return true;
    }
}
