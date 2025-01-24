<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\AiGenerateRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    protected array $permissions = [];
    protected AiGenerateRepository $aiGenerateRepository;

    public function __construct(AiGenerateRepository $aiGenerateRepository)
    {
        $this->aiGenerateRepository = $aiGenerateRepository;
    }

    public function allUser()
    {
        $users = User::where('role', 'user')->orderByDesc('created_at')->paginate(15);

        return response()->json($users);
    }

    public function getUser($email)
    {
        $user = User::where('role', 'user')
            ->where('email', 'LIKE', "%{$email}%")
            ->orderByDesc('created_at')
            ->paginate(15);

        return response()->json($user);
    }

    public function userPermission(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();
        if ($this->isAdmin()) {
            return response()->json($user);
        }

        return response()->json(['message' => 'Permission denied'], 403);
    }

    protected function isAdmin(): bool
    {
        $user = session('user_logged_in');
        $email = $user['email'];
        $user = User::where('email', $email)->first();

        return $user->role == 'admin';
    }

    public function updatePermission(Request $request)
    {
        foreach ($request->input('features') as $key => $item) {
            $this->permissions[$key] = [
                'status' => $item['status'] ?? false,
                'start_date' => Carbon::parse($item['date'][0])->startOfDay()->format("Y/m/d H:i:s"),
                'end_date' => Carbon::parse($item['date'][1])->endOfDay()->format("Y/m/d H:i:s"),
            ];
        }

//        $date = $request->input('date');
        $user = User::where('email', $request->input('email'))->first()->update([
            'permissions' => json_encode($this->permissions),
//            'start_date' => $date[0] ?? null,
//            'end_date' => $date[1] ?? null,
        ]);

        if ($user) {
            $newUser = User::where('email', $request->input('email'))->first();
            return response()->json($newUser);
        }

        return response()->json(false);
    }

    public function deleteUser(Request $request) {
        try {
            $user = User::where('email', $request->input('email'))->first();
            if (!empty($user)) {
                return $user->delete();
            }

            return response()->json(false);
        } catch (\Exception $e) {
            Log::error('Delete User Fail: ' . $e->getMessage());
            return response()->json(false);
        }
    }

    public function searchAiGenerate(Request $request)
    {
        try {
            $query = DB::table('ai_generate');
            $date = $request->input('date') ?? null;
            $email = $request->input('email') ?? null;
            $type = $request->input('type') ?? null;
            $statusCode = $request->input('statusCode') ?? null;
            $prompt = $request->input('prompt') ?? null;
            $time = $request->input('time') ?? null;
            $perPage = $request->input('perPage') ?? 10;
            if (!empty($date) && $date != 'null') {
                $rangeDate = explode(',', $date);
                $startDate = Carbon::createFromFormat('Y-m-d', $rangeDate[0])->startOfDay();
                $endDate = Carbon::createFromFormat('Y-m-d', $rangeDate[1])->endOfDay();
                $query->whereBetween('created_at', [$startDate, $endDate]);
            }

            if (!empty($email)) {
                $query->where('email', 'LIKE', "%{$email}%");
            }

            if (!empty($type)) {
                $listType = explode(',', $type);
                $query->whereIn('type', $listType);
            }

            if (!empty($prompt)) {
                $query->where('prompt_original', 'LIKE', "%{$prompt}%")
                    ->orWhere('prompt', 'LIKE', "%{$prompt}%")
                    ->orWhere('prompt_open_ai', 'LIKE', "%{$prompt}%");
            }

            if (!empty($time)) {
                $timeRange = explode(',', $time);
                if ($timeRange[0] != 0 && $timeRange[1] != 0) {
                    $query->whereBetween('execute_time', [(float)$timeRange[0], (float)$timeRange[1]]);
                }
            }

            if (!empty($statusCode)) {
                $listCode = explode(',', $statusCode);
                $query->whereIn('status_code', $listCode);
            }
            return response()->json($query->orderByDesc('created_at')->paginate($perPage));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
