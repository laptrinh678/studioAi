<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminPermission
{
    /**
     * @param Request $request
     * @param Closure $next
     * @return JsonResponse|void
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $session = session('user_logged_in');
            $admin = User::where('email', $session['email'])->first();
            if ($admin->role == 'admin') {
                return $next($request);
            }

            return response()->json(['error' => 'Unauthorized']);
        } catch (\Exception $e) {
            Log::error("Permission Deny: " . $e->getMessage());
            return response()->json(['error' => 'Unauthorized']);
        }
    }
}
