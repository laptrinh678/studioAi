<?php

namespace App\Http\Controllers;

use App\Models\AiGenerateModel;
use App\Models\ProjectModel;
use App\Models\User;
use App\Traits\ExceptionManagement;
use App\Traits\FileManagement;
use App\Traits\ImageGenerateManagement;
use App\Traits\OpenAI;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use GuzzleHttp\Client;
class AiGenarateController extends Controller
{
    use ImageGenerateManagement, ExceptionManagement, FileManagement, OpenAI;

    const userLogin = 'user_logged_in';
    const maxLengthPrompt = 1000;
    protected float $executeTime = 0;

    protected function handlePrompt(array $dataRequest)
    {
        $mainColor = "";
        $prompt = $dataRequest['prompt'];
        if (!empty($dataRequest['main_color'])) {
            $mainColorTranslate = $this->translatorEng($dataRequest['main_color']);
            $mainColor = sprintf(".The main color is %s.", $mainColorTranslate);
        }

        if ($dataRequest['open_ai']) {
            $prompt = $this->openAI($dataRequest['prompt']);
        }

        $promptOriginal = $dataRequest['prompt'];
        $promptTranslate = $this->translatorEng($prompt);
        $convertPrompt = $this->convertPrompt($promptTranslate.$mainColor, $dataRequest['prompt_styles']);
        return [
            'promptOriginal' => $promptOriginal,
            'prompt' => $convertPrompt,
            'promptOpenAI' => $dataRequest['open_ai'] ? $prompt : ''
        ];
    }

    public function textToImages (Request $request) {
        if (!$this->checkUserPermission('textToImage')) {
            return response()->json(['error' => 'Unauthorized'], 500);
        }

        $start = microtime(true);
        $dataFormat = $this->handlePrompt($request->all());
        $body = [
            "prompt_original" => $dataFormat['promptOriginal'] ?? "",
            "prompt" => $dataFormat['prompt'],
            "prompt_open_ai" => $dataFormat['promptOpenAI'] ?? "",
            "negative_prompt" => $request->negative_prompt ?? "",
            "guidance_scale" => config('app.guidance_scale'),
            "image_height" => $request->image_height,
            "image_width" => $request->image_width,
            "num_images" => $request->num_images,
            "seed" => $request->seed,
            "prompt_styles" => [],
            "lora_names" => $request->lora_names,
            "scheduler" => config('app.scheduler'),
            "num_sample_steps" => config('app.num_sample_steps')
        ];

        $responses = $this->sendRequest(config('app.base_api').'/generate/text2img',
            $body
        );
        $end = microtime(true);
        $this->executeTime = $end - $start;

        // Save to mongodb
        $this->saveToMongo($body, 'Text To Image', $responses);

        return $responses;
    }

    public function imageToImages (Request $request) {
        if (!$this->checkUserPermission('imageToImage')) {
            return response()->json(['error' => 'Unauthorized'], 500);
        }

        $start = microtime(true);
        $dataFormat = $this->handlePrompt(json_decode($request->params, true));
        $image = $request->file('image');
        $req_cv = json_decode($request->params);
        $body = [
            "prompt_original" => $dataFormat['promptOriginal'] ?? "",
            "prompt" => $dataFormat['prompt'],
            "prompt_open_ai" => $dataFormat['promptOpenAI'] ?? "",
            "negative_prompt" => $req_cv->negative_prompt ?? "",
            "guidance_scale" => $req_cv->guidance_scale,
            "image_height" => $req_cv->image_height,
            "image_width" => $req_cv->image_width,
            "num_images" => $req_cv->num_images,
            "seed" => $req_cv->seed,
            "prompt_styles" => [],
            "lora_names" => $req_cv->lora_names
        ];
        
        $multipart = [
            [
                'name' => 'params',
                'contents' => json_encode($body),
            ],
            [
                'name' => 'image',
                'contents' => fopen($image->getRealPath(), 'r'),
                'filename' => $image->getClientOriginalName(),
            ],
        ];

        $responses = $this->sendRequestMultipart(config('app.base_api').'/generate/img2img',
            $multipart
        );
        $end = microtime(true);
        $this->executeTime = $end - $start;

        // Save to mongodb
        $this->saveToMongo($body, 'Image To Image', $responses);
        return $responses;
    }

    public function inpainting (Request $request) {
        if (!$this->checkUserPermission('imageToImage')) {
            return response()->json(['error' => 'Unauthorized'], 500);
        }

        $start = microtime(true);
        $dataFormat = $this->handlePrompt(json_decode($request->params, true));
        $image = $request->file('image');
        $mask = $request->file('mask');
        $req_cv = json_decode($request->params);
        $body = [
            "prompt_original" => $dataFormat['promptOriginal'] ?? "",
            "prompt" => $dataFormat['prompt'],
            "prompt_open_ai" => $dataFormat['promptOpenAI'] ?? "",
            "negative_prompt" => $req_cv->negative_prompt ?? "",
            "guidance_scale" => $req_cv->guidance_scale,
            "image_height" => $req_cv->image_height,
            "image_width" => $req_cv->image_width,
            "num_images" => $req_cv->num_images,
            "seed" => $req_cv->seed,
            "prompt_styles" => [],
            "lora_names" => $req_cv->lora_names
        ];
        
        $multipart = [
            [
                'name' => 'params',
                'contents' => json_encode($body),
            ],
            [
                'name' => 'image',
                'contents' => fopen($image->getRealPath(), 'r'),
                'filename' => $image->getClientOriginalName(),
            ],
            [
                'name' => 'mask',
                'contents' => fopen($mask->getRealPath(), 'r'),
                'filename' => $image->getClientOriginalName(),
            ],
        ];

        $responses = $this->sendRequestMultipart(config('app.base_api').'/generate/inpainting',
            $multipart
        );
        $end = microtime(true);
        $this->executeTime = $end - $start;

        // Save to mongodb
        $this->saveToMongo($body, 'In Painting', $responses);

        return $responses;
    }


    public function upScaleImage (Request $request) {
        if (!$this->checkUserPermission('imageToImage')) {
            return response()->json(['error' => 'Unauthorized'], 500);
        }

        $scale = json_decode($request->params);
        $image = $request->file('image');

        $multipart = [
            [
                'name' => 'params',
                'contents' => json_encode($scale),
            ],
            [
                'name' => 'image',
                'contents' => fopen($image->getRealPath(), 'r'),
                'filename' => $image->getClientOriginalName(),
            ],
        ];
        
        $responses = $this->sendRequestMultipart(config('app.base_api').'/generate/upscaling', $multipart);

        return $responses;
    }

    public function translatorEng ($text) {
        try {
            if (mb_strlen($text, 'UTF-8') > self::maxLengthPrompt) {
                return response()->json(['error' => 'Text too long. Maximum is 1000 characters']);
            }

            $client = new Client();
            $res = $client->post(config('app.google_translate_url'), [
                'verify' => false,
                'proxy' => 'http://hungvm:Roger%4026@172.16.2.204:3128/',
                'headers' => [
                    'X-goog-api-key' => config('app.google_api_key'),
                    'Content-Type' => 'application/json; charset=utf-8'
                ],
                'json' => [
                    "q" => mb_strlen($text, 'UTF-8') > 128 ? explode('.', $text) : $text,
                    "source" => "vi",
                    "target" => "en",
                    "format" => "text"
                ]
            ]);

            $translatedText = "";
            $content = json_decode($res->getBody()->getContents(), true);
            foreach ($content['data']["translations"] as $translation) {
                $translatedText .= $translation["translatedText"];
            }

            return $translatedText;
        } catch (\Exception $e) {
            Log::error('Google Translate Api Fail: ' . $e->getMessage());

            $body = [
                "text" => $text
            ];

            return $this->sendRequest(config('app.base_api').'/translate/vn2eng',
                $body,
                '',
                '',
                '',
                'POST'
            );
        }
    }


    private function sendRequestMultipart ($url, $params = array()) {
        $client = new Client();
        try {
            $response = $client->post($url, [
                'multipart' => $params,
            ]);

            $statusCode = $response->getStatusCode();
            $responseBody = $response->getBody()->getContents();

            if ($statusCode >= 200 && $statusCode < 300) {
                return response()->json(json_decode($responseBody), $statusCode);
            } else {
                return response()->json(['error' => 'Lỗi hệ thống'], $statusCode);
            }
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    private function sendRequest($url, $params = array(), $proxy_link='', $proxy_port='', $header_key='', $method = 'POST', $isJSON = true, $isAuthen = false, $timeOut = 30000)
    {
        try {
            $client = new Client();
            if ($method == 'GET') {
                $response = $client->get($url, $params);
            } else {
                $response = $client->post($url, [
                    'body' => json_encode($params)
                ]);
            }

            $statusCode = $response->getStatusCode();
            $responseBody = $response->getBody()->getContents();

            if ($statusCode >= 200 && $statusCode < 300) {
                return response()->json(json_decode($responseBody), $statusCode);
            } else {
                return response()->json(['error' => 'Lỗi hệ thống'], $statusCode);
            }
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function textToVideo(Request $request)
    {
        if (!$this->checkUserPermission('virtualHuman')) {
            return response()->json(['error' => 'Unauthorized'], 500);
        }

        if (mb_strlen($request->input('text'), 'UTF-8') > 500) {
            return response()->json(['error' => 'Nội dung quá dài. Vui lòng thử lại.'], 422);
        }

        try {
            $start = microtime(true);
            $body = [
                "text" => $request->input('text'),
                "name_voice" => $request->input('name_voice'),
                "speed" => $request->input('speed'),
                "name_mc" => $request->input('name_mc')
            ];

            $res = $this->sendRequest(config('app.gen_video_by_text'), $body);
            if ($res->getStatusCode() != 200) {
                return $res;
            }

            $content = json_decode($res->getContent(), true);
            $path = $content['path_video'];
            $newPath = str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $path);
            $end = microtime(true);
            $this->executeTime = $end - $start;

            // Save to mongodb
            $body['prompt_original'] = $request->input('text');
            $this->saveToMongo($body, 'Video', $res);

            return response()->json(['path_video' => $newPath]);
        } catch (\Exception $e) {
            Log::error('Text to video error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function soundToVideo(Request $request)
    {
        if (!$this->checkUserPermission('virtualHuman')) {
            return response()->json(['error' => 'Unauthorized'], 500);
        }

        try {
            $file = $request->file('audio');
            $multipart = [
                [
                    'name' => 'name_mc',
                    'contents' => $request->input('name_mc'),
                ],
                [
                    'name' => 'file',
                    'contents' => fopen($file->getRealPath(), 'r'),
                    'filename' => $file->getClientOriginalName(),
                ],
            ];

            $res = $this->sendRequestMultipart(config('app.gen_video_by_audio'), $multipart);
            if ($res->getStatusCode() != 200) {
                return $res;
            }

            $content = json_decode($res->getContent(), true);
            $path = $content['path_video'];
            $newPath = str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $path);

            return response()->json(['path_video' => $newPath]);
        } catch (\Exception $e) {
            Log::error('Audio to video error: ' . $e->getMessage());

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function textToBackground(Request $request)
    {
        if (!$this->checkUserPermission('virtualHumanV2')) {
            return response()->json(['error' => 'Unauthorized'], 500);
        }

        try {
            $body = [];
            $requestAll = $request->all();
            foreach ($requestAll['artist_info'] as $key => $item) {
//                $background = $this->upload($requestAll['image'][$key], sprintf('%s_%s.%s', 'background', $key, 'png'));
                $background = $this->uploadFile($requestAll['image'][$key], '');
                if (gettype($requestAll['audio'][$key]) == 'object') {
//                    $linkFile = $this->upload($requestAll['audio'][$key], sprintf('%s_%s.%s', 'audio', $key, 'mp3'));
//                    $audio = config('app.minio_endpoint').$linkFile;
                    $linkFile = $this->uploadFile($requestAll['audio'][$key], '');
                    $audio = $linkFile;
                } else {
                    $audio = $requestAll['audio'][$key];
                }

                $artistInfo = json_decode($item, true);
                $artistAttr = json_decode($requestAll['artist_attr'][$key], true);
                $body[] = [
                    "voice" => $audio,
                    "name_voice" => $requestAll['voice_content'][$key] ?? 'hn-quynhanh',
//                    "background" => config('app.minio_endpoint').$background,
                    "background" => $background,
                    "name_mc" => $artistInfo['code'],
                    "speed" => 1.0,
                    "location" => [$artistAttr['x'], $artistAttr['y'], $artistAttr['width'], $artistAttr['height']],
                    "duration" => $requestAll['duration'][$key],
                ];
            }

            $client = new Client();
            $response = $client->post(config('app.gen_video_by_background'), [
                'body' => json_encode($body)
            ]);

            $content = json_decode($response->getBody()->getContents(), true);
            $path = $content['path_video'];
            $newPath = str_replace(config('app.main_domain_minio'), config('app.sub_domain_minio'), $path);

            // Lưu lại đường dẫn video
            ProjectModel::where('_id', $requestAll['project_id'])->update(['video_path' => $newPath]);

            return response()->json(['path_video' => $newPath]);
        } catch (\Exception $e) {
            Log::error(sprintf('Background to video error: %s. File: %s. Line: %s', $e->getMessage(), $e->getFile(), $e->getLine()));
            return $this->handleException($e);
        }
    }


    protected function checkUserPermission($feature): bool
    {
        $session = session(self::userLogin);
        $user = User::where('email', $session['email'])->first();
        if (empty($user)) {
            return false;
        }

        // Admin có full quyền
        if ($user->role === 'admin') {
            return true;
        }

        // Kiểm tra thời hạn sử dụng và quyền của user
         $permissions = json_decode($user->permissions, true);
         $startDate = Carbon::parse($permissions[$feature]['start_date'])->format('Y-m-d H:i:s');
         $endDate = Carbon::parse($permissions[$feature]['end_date'])->format('Y-m-d H:i:s');
         $now = Carbon::now()->format('Y-m-d H:i:s');
         if (($now >= $startDate && $now <= $endDate) && $permissions[$feature]['status']) {
             return true;
         }

         return false;
    }

    protected function saveToMongo($data, $type, $response)
    {
        $session = session(self::userLogin);

        AiGenerateModel::create(array_merge($data, [
            "email" => $session['email'] ?? null,
            "type" => $type,
            "execute_time" => $this->executeTime == 0 ? 0 : round($this->executeTime, 2),
            "status_code" => $response->getStatusCode(),
        ]));
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

    public function textToSpeech(Request $request)
    {
        try {
            $client = new Client();
            $res = $client->post(config('app.text_to_speech_url'), [
                'verify' => false,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => '*/*',
                ],
                'json' => [
                    "text" => $request->input('text'),
                    "speed" => 1.0,
                    "token" => config('app.text_to_speech_key'),
                    "tts_return_option" => 3,
                    "voice" => $request->input('voice') ?? "hn_quynhanh",
                    "without_filter" => false
                ]
            ]);

            $audioContent = $res->getBody()->getContents();

            return response($audioContent)
                ->header('Content-Type', 'audio/mpeg')
                ->header('Content-Disposition', 'inline; filename="audio.mp3"');
        } catch (\Exception $e) {
            Log::error('Text To Speech Fail: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function textToImageControlnet(Request $request)
    {
        if (!$this->checkUserPermission('imageToImage')) {
            return response()->json(['error' => 'Unauthorized'], 500);
        }

        $start = microtime(true);
        $dataFormat = $this->handlePrompt(json_decode($request->params, true));
        try {
            $image = $request->file('image');
            $req_cv = json_decode($request->params);
            $body = [
                "prompt_original" => $dataFormat['promptOriginal'] ?? "",
                "prompt" => $dataFormat['prompt'],
                "prompt_open_ai" => $dataFormat['promptOpenAI'] ?? "",
                "negative_prompt" => $req_cv->negative_prompt ?? "",
                "guidance_scale" => 7.5,
                "num_sample_steps" => 25,
                "image_height" => $req_cv->image_height,
                "image_width" => $req_cv->image_width,
                "num_images" => $req_cv->num_images,
                "seed" => 0,
                "prompt_styles" => [],
                "lora_names" => $req_cv->lora_names,
                "control_mode" => $req_cv->control_mode
            ];

            $multipart = [
                [
                    'name' => 'params',
                    'contents' => json_encode($body),
                ],
                [
                    'name' => 'image',
                    'contents' => fopen($image->getRealPath(), 'r'),
                    'filename' => $image->getClientOriginalName(),
                ],
            ];

            $responses = $this->sendRequestMultipart(config('app.base_api').'/generate/sketch', $multipart);
            $end = microtime(true);
            $this->executeTime = $end - $start;

            // Save to mongodb
            $this->saveToMongo($body, 'Sketch', $responses);
            return $responses;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function outPainting(Request $request)
    {
        try {
            $image = $request->file('image');
            $mask = $request->file('mask');
            $req_cv = json_decode($request->params, true);
            $body = [
                "prompt" => $req_cv['prompt'],
            ];

            $multipart = [
                [
                    'name' => 'params',
                    'contents' => json_encode($body),
                ],
                [
                    'name' => 'image',
                    'contents' => fopen($image->getRealPath(), 'r'),
                    'filename' => $image->getClientOriginalName(),
                ],
                [
                    'name' => 'mask',
                    'contents' => fopen($mask->getRealPath(), 'r'),
                    'filename' => $mask->getClientOriginalName(),
                ]
            ];

            return $this->sendRequestMultipart('outpainting.cyberspace.vn/api/v1/painting', $multipart);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }
}
