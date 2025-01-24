<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\VirtualHuman\SceneController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\VirtualHuman\ProjectController;
use App\Http\Controllers\VirtualHuman\ArtistController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::group(['prefix' => 'api'], function () {
     Route::group(['prefix' => 'auth', 'middleware' => 'auth.sso'], function () {
    //     Route::post('login', ['as' => 'login', 'uses' => 'AuthController@login']);
         Route::post('/logout', [AuthController::class, 'logout']);
    //     Route::post('/refresh', [AuthController::class, 'refresh']);
         Route::get('/me', [AuthController::class, 'me']);
     });

     Route::post('get-token', [AuthController::class, 'getToken']);
     Route::group(['middleware' => 'auth.sso'], function () {
        Route::post('text-to-images', 'AiGenarateController@textToImages');
        Route::post('image-to-images', 'AiGenarateController@imageToImages');
        Route::post('inpainting', 'AiGenarateController@inpainting');
        Route::post('upscale-images', 'AiGenarateController@upScaleImage');
        Route::get('get-prompt-styles', 'AiGenarateController@getPromptStyle');
        Route::post('vn-to-eng', 'AiGenarateController@translatorEng');
        Route::post('text-to-video', 'AiGenarateController@textToVideo');
        Route::post('sound-to-video', 'AiGenarateController@soundToVideo');
        Route::post('sound-to-background', 'AiGenarateController@textToBackground');
        Route::post('text-to-speech', 'AiGenarateController@textToSpeech');
        Route::post('text-to-image-controlnet', 'AiGenarateController@textToImageControlnet');
        Route::post('out-painting', 'AiGenarateController@outPainting');
        Route::get('user-permission', [AdminController::class, 'userPermission']);
        Route::post('save-project', [ProjectController::class, 'save']);

        // User asset
         Route::get('image-asset', [UserController::class, 'getImageAsset']);
         Route::post('upload', [UserController::class, 'upload']);
         Route::post('share-image', [UserController::class, 'shareImage']);
         Route::get('share-generated', [UserController::class, 'getShareGenerated']);
         Route::post('share-generated', [UserController::class, 'shareGenerated']);
         Route::post('user-interact', [UserController::class, 'interaction']);

         // Quản lý user
         Route::group(['middleware' => 'admin.permission'], function () {
             Route::get('user/{email}', [AdminController::class, 'getUser']);
             Route::get('users', [AdminController::class, 'allUser']);
             Route::post('user-permission', [AdminController::class, 'updatePermission']);
             Route::post('delete-user', [AdminController::class, 'deleteUser']);
             Route::get('user-prompt', [AdminController::class, 'searchAiGenerate']);
         });

         // Phát thanh viên ảo
         Route::group(['prefix' => 'project'], function () {
             Route::post('', [ProjectController::class, 'create']);
             Route::get('', [ProjectController::class, 'list']);
             Route::post('delete', [ProjectController::class, 'delete']);
         });

         Route::group(['prefix' => 'artist'], function () {
             Route::post('', [ArtistController::class, 'create']);
             Route::get('', [ArtistController::class, 'list']);
         });

         Route::group(['prefix' => 'scene'], function () {
             Route::get('/{id}', [SceneController::class, 'list']);
             Route::post('', [SceneController::class, 'createOrUpdate']);
         });
     });

    // Xử lý thanh toán
    Route::post('extend-service', [PaymentController::class, 'payment']);
    Route::group(['prefix' => 'user'], function () {
        Route::get('info/{email}', [PaymentController::class, 'getUserByEmail']);
        Route::post('sync', [PaymentController::class, 'syncUser']);
    });

// });

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
