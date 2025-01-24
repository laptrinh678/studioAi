<?php

namespace App\Traits;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

trait OpenAI
{
    public function openAI($text)
    {
        try {
            $text = 'Hãy sửa lại câu prompt dưới đây để sinh ảnh có chất lượng tốt hơn. Chỉ đưa ra câu prompt, không có lời mở đầu và không giải thích gì thêm:'.$text;
            $key = config('app.google_api_key');
            $url = config('app.google_gemini_url');
            $option = [
                'verify' => false,
                'query' => ['key' => $key],
                'headers' => ['Content-Type' => 'application/json; charset=utf-8',],
                'proxy' => 'http://hungvm:Roger%4026@172.16.2.204:3128/',
                'json' => [
                    "contents" => [["parts" => [["text" => $text]]]],
                    "generationConfig" => [
                        "stopSequences" => ["Title"],
                        "temperature" => 1.0,
                        "maxOutputTokens" => 500,
                        "topP" => 0.8,
                        "topK" => 10
                    ]
                ]
            ];

            $client = new Client();
            $response = $client->request('POST', $url, $option);
            $content = json_decode($response->getBody()->getContents(), true);
            $text = $content['candidates'][0]['content']['parts'][0]['text'];
            return str_replace("\n", "", $text);
        } catch (Exception $e) {
            return response($e->getMessage(), 500);
        } catch (GuzzleException $e) {
            return response($e->getMessage(), 500);
        }
    }
}