<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Progress;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        $progress = Progress::where('user_id', $user_id)->get();
        return response()->json([
            'status' => 200,
            'progress' => $progress,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $user_id = auth()->user()->id;
        $progress = Progress::where('user_id', $user_id)->where('lesson_id', $input['lesson_id'])->first();
        if ($progress) {
            $progress->progress = $input['progress'];
            $progress->save();
        } else {
            $progress = Progress::create([
                'user_id' => $user_id,
                'lesson_id' => $input['lesson_id'],
                'progress' => $input['progress'],
            ]);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Progress created successfully',
        ]);
    }

    public function storeMultiple(Request $request)
    {
        $input = $request->all();
        $user_id = auth()->user()->id;
        foreach ($input as $key => $value) {
            $progress = Progress::where('user_id', $user_id)->where('lesson_id', $value['lesson_id'])->first();
            if ($progress) {
                $progress->progress = $value['progress'];
                $progress->save();
            } else {
                $progress = Progress::create([
                    'user_id' => $user_id,
                    'lesson_id' => $value['lesson_id'],
                    'progress' => $value['progress'],
                ]);
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'Progress created successfully',
        ]);
    }

    public function destroy($id)
    {
        $progress = Progress::find($id);
        $progress->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Progress deleted successfully',
        ]);
    }
}
