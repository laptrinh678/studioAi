<?php

namespace App\Traits;


trait ImageGenerateManagement
{
    public function convertPrompt(string $prompt, array $promptStyle): string
    {
        if (empty($promptStyle)) {
            return $prompt;
        }

        $char = '. ';
        if (str_ends_with($prompt, ',') || str_ends_with($prompt, '.')) {
            $char = ' ';
        }

        return $prompt . $char . $promptStyle[0];
    }
}