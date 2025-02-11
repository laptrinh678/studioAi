<?php

use Illuminate\Support\Facades\Facade;

return [

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application. This value is used when the
    | framework needs to place the application's name in a notification or
    | any other location as required by the application or its packages.
    |
    */

    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" your application is currently
    | running in. This may determine how you prefer to configure various
    | services the application utilizes. Set this in your ".env" file.
    |
    */

    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your application is in debug mode, detailed error messages with
    | stack traces will be shown on every error that occurs within your
    | application. If disabled, a simple generic error page is shown.
    |
    */

    'debug' => (bool) env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the console to properly generate URLs when using
    | the Artisan command line tool. You should set this to the root of
    | your application so that it is used when running Artisan tasks.
    |
    */

    'url' => env('APP_URL', 'http://localhost'),

    'asset_url' => env('ASSET_URL'),

    'base_api' => env('BASE_API', 'stableai.cyberspace.vn'),

    'sso_verify_api' => env('SSO_VERIFY_URL', 'https://sso.viettelai.vn/me'),
    'redirect_url' => env('MIX_REDIRECT_URL', 'http://genai.cyberspace.vn/auth/callback'),
    'sso_user_info' => env('SSO_USER_INFO_URL', 'https://sso.viettelai.vn/api/user/me'),
    'sso_token' => env('MIX_SSO_TOKEN_URL', 'https://sso.viettelai.vn/oauth/token'),
    'client_id' => env('CLIENT_ID', '9c6427e2-367b-4ff1-ae20-9e753a9fa7b6'),

    // Gen video
    'gen_video_by_text' => env('GEN_VIDEO_BY_TEXT', 'http://genvideo-ai:8888/api/v1/genvideo/text'),
    'gen_video_by_audio' => env('GEN_VIDEO_BY_AUDIO', 'http://genvideo-ai:8888/api/v1/genvideo/audio'),
    'gen_video_by_background' => env('GEN_VIDEO_BY_BACKGROUND', 'http://genvideo-ai:8888/api/v1/genvideo/background'),

    // Nginx proxy
    'main_domain_minio' => env('MAIN_DOMAIN_MINIO', 'stable-minio:9000'),
    'sub_domain_minio' => env('SUB_DOMAIN_MINIO', 'https://studio.viettelai.vn/storage'),

    // Google Translate Api
    'google_translate_url' => env('GOOGLE_TRANSLATE_URL', 'https://translation.googleapis.com/language/translate/v2'),
    'google_api_key' => env('GOOGLE_API_KEY', 'AIzaSyBVwHhzdc8IphWQvz1emcH5P3W2rwXPHug'),
    'google_gemini_url' => env('GOOGLE_GEMINI_URL', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'),

    // Minio
    'minio_bucket' => env('MINIO_DEFAULT_BUCKET', 'video'),
    'minio_endpoint' => env('MINIO_ENDPOINT', 'stable-minio:9000'),

    // Gen ai Flux
    'scheduler' => env('GEN_AI_SCHEDULER', 'FlowMatchEulerDiscrete'),
    'num_sample_steps' => env('GEN_AI_STEPS', 20),
    'guidance_scale' => env('GEN_AI_GUIDANCE_SCALE', 3.5),

    // Text to speech
    'text_to_speech_url' => env('TEXT_TO_SPEECH_URL', 'https://viettelai.vn/tts/speech_synthesis'),
    'text_to_speech_key' => env('TEXT_TO_SPEECH_KEY', 'd64c36670bfb595014a4581a6949e1fa'),

    // Payment
    'partner_id' => env('PARTNER_ID', '7bd2023f-13ff-49c4-b0fd-17123d0ad6f6'),
    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. We have gone
    | ahead and set this to a sensible default for you out of the box.
    |
    */

    'timezone' => 'Asia/Ho_Chi_Minh',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation service provider. You are free to set this value
    | to any of the locales which will be supported by the application.
    |
    */

    'locale' => 'vi',

    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | The fallback locale determines the locale to use when the current one
    | is not available. You may change the value to correspond to any of
    | the language folders that are provided through your application.
    |
    */

    'fallback_locale' => 'vi',

    /*
    |--------------------------------------------------------------------------
    | Faker Locale
    |--------------------------------------------------------------------------
    |
    | This locale will be used by the Faker PHP library when generating fake
    | data for your database seeds. For example, this will be used to get
    | localized telephone numbers, street address information and more.
    |
    */

    'faker_locale' => 'en_US',

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | This key is used by the Illuminate encrypter service and should be set
    | to a random, 32 character string, otherwise these encrypted strings
    | will not be safe. Please do this before deploying an application!
    |
    */

    'key' => env('APP_KEY'),

    'cipher' => 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Maintenance Mode Driver
    |--------------------------------------------------------------------------
    |
    | These configuration options determine the driver used to determine and
    | manage Laravel's "maintenance mode" status. The "cache" driver will
    | allow maintenance mode to be controlled across multiple machines.
    |
    | Supported drivers: "file", "cache"
    |
    */

    'maintenance' => [
        'driver' => 'file',
        // 'store'  => 'redis',
    ],

    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'providers' => [

        /*
         * Laravel Framework Service Providers...
         */
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Notifications\NotificationServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        /*
         * Package Service Providers...
         */

        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        // App\Providers\BroadcastServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
        Jenssegers\Mongodb\MongodbServiceProvider::class,

        Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
        \App\Providers\MinIOServiceProvider::class
    ],

    /*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */

    'aliases' => Facade::defaultAliases()->merge([
        'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
        'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class
    ])->toArray(),

];
