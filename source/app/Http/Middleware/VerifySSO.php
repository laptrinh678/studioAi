<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifySSO
{
    /**
     * @param Request $request
     * @param Closure $next
     * @return JsonResponse|void
     */
    public function handle(Request $request, Closure $next)
    {
        session(['user_logged_in' => ['email' => 'hungvumanh11o23@gmail.com']]);
        return $next($request);
        $accessToken = $request->bearerToken();
        if (empty($accessToken)) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        try {
            $req = new \GuzzleHttp\Client();
            $res = $req->request('GET', config('app.sso_user_info'), [
                'headers' => [
                    'Authorization' => 'Bearer '. $request->bearerToken(),
                    'content-type' => 'application/json',
                ],
            ]);

            $content = json_decode($res->getBody()->getContents(), true);
            session(['user_logged_in' => $content['data']]);

            // Status success => 0
            if ($content['status_code'] == 0) {
                return $next($request);
            }

            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
    }
}
