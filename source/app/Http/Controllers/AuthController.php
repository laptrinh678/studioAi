<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class AuthController extends Controller
{
    const userLogin = 'user_logged_in';

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $this->typeLogin($request);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        return $this->createNewToken($token);
    }

    public function typeLogin($request)
    {
        $request = $request->only(['email', 'password']);

        if (is_numeric($request['email'])) {
            $fieldType = 'phone';
        } else {
            $fieldType = filter_var($request['email'], FILTER_VALIDATE_EMAIL) ? 'email' : 'user_name';
        }

        return [
            $fieldType => $request['email'],
            'password' => $request['password']
        ];
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        try {
            $client = new Client();
            $res = $client->request('POST', 'https://staging-sso.viettelai.vn/_backend/api/auth/logout', [
                'headers' => [
                    'Authorization' => 'Bearer '. $request->bearerToken(),
                    'content-type' => 'application/json',
                ],
            ]);

            Log::info($res->getBody()->getContents());

            return response()->json(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
//        auth()->logout();
//        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = session(self::userLogin);
        $email = $user['email'];
        $user = User::where('email', $email)->first();

        return response()->json($user);
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function getToken(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $req = new \GuzzleHttp\Client();
            $res = $req->request('POST', config('app.sso_token'), [
                "headers" => [
                    'proxy' => '',
                    'verify' => false,
                    'content-type' => 'application/x-www-form-urlencoded'
                ],
                'form_params' => [
                    'grant_type' => 'authorization_code',
                    'client_id' => config('app.client_id'),
                    'code' => $request->code ?? '',
                    'redirect_uri' => config('app.redirect_url'),
                    'code_verifier' => $request->code_verifier ?? ''
                ]
            ]);

            if ($res->getStatusCode() === 200) {
                $content = json_decode($res->getBody()->getContents(), true);
                // Save user to mongo
                $this->saveUser($content['id_token']);

                return response()->json([
                    'access_token' => $content['access_token'],
                    'id_token' => $content['id_token']
                ], Response::HTTP_OK);
            }

            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            Log::error('Get Token Failed: ' . $e->getMessage());
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
    }

    protected function saveUser($token)
    {
        $tokenDecode = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))), true);
        $existUser = User::where('email', $tokenDecode['email'])->first();
        if (empty($existUser)) {
            User::create([
                "email" => $tokenDecode['email'] ?? "",
                "name" => $tokenDecode['name'] ?? "",
                "phone_number" => $tokenDecode['phone_number'] ?? "",
                "role" => "user",
                "permissions" => json_encode([
                    "textToImage" => ["status" => false, "start_date" => "", "end_date" => ""],
                    "imageToImage" => ["status" => false, "start_date" => "", "end_date" => ""],
                    "virtualHuman" => ["status" => false, "start_date" => "", "end_date" => ""],
                    "virtualHumanV2" => ["status" => false, "start_date" => "", "end_date" => ""],
                ])
            ]);
        } else {
            if (empty($existUser->role)) {
                $existUser->update([
                    "role" => "user",
                    "permissions" => json_encode([
                        "textToImage" => ["status" => false, "start_date" => "", "end_date" => ""],
                        "imageToImage" => ["status" => false, "start_date" => "", "end_date" => ""],
                        "virtualHuman" => ["status" => false, "start_date" => "", "end_date" => ""],
                        "virtualHumanV2" => ["status" => false, "start_date" => "", "end_date" => ""],
                    ])
                ]);
            }
        }

        return true;
    }
}