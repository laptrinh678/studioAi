<?php

namespace App\Http\Controllers\VirtualHuman;

use App\Http\Controllers\Controller;
use App\Repositories\ArtistRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ArtistController extends Controller
{
    protected ArtistRepository $artistRepository;

    public function __construct(ArtistRepository $artistRepository)
    {
        $this->artistRepository = $artistRepository;
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $params = json_decode($request->get('params'), true);
            $image = $request->file('image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images/artists'), $filename);

            $this->artistRepository->create([
                'name' => $params['name'],
                'code' => $params['code'],
                'image_path' => 'images/artists/'.$filename,
                'order_number' => $request->get('order_number') ?? 0,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);

            return response()->json(['message' => 'Scenes created'], 201);
        } catch (\Exception $e) {
            Log::error('Create scenes error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request): \Illuminate\Http\JsonResponse
    {

    }

    public function list(): \Illuminate\Http\JsonResponse
    {
        try {
            $projects = $this->artistRepository
                ->orderBy('order_number')
                ->orderBy('created_at')
                ->get();

            return response()->json(['data' => $projects, 'message' => 'Artists retrieved successfully']);
        } catch (\Exception $e) {
            Log::error('List artists error: ' . $e->getMessage() . ' Line: ' . $e->getLine());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function delete()
    {

    }
}
