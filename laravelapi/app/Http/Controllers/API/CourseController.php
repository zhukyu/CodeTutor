<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Lcobucci\JWT\Token;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class CourseController extends Controller
{
    public function index()
    {
        $courses = DB::table('course')
            ->join('users', 'users.id', '=', 'course.user_id')
            ->select('course.*', 'users.name')
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $courses,
        ]);
    }

    public function detail($id)
    {
        $courses = DB::table('course')
            ->join('users', 'users.id', '=', 'course.user_id')
            ->select('course.*', 'users.name')
            ->where('course.id', $id)
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $courses,
        ]);
    }

    public function store(Request $request)
    {


        $user_id = auth()->user()->id;


        $course = new Course;
        $course->title = $request->title;
        $course->user_id = $user_id;
        $course->description = $request->description;
        $course->image = $request->image;
        $course->price = $request->price;
        $course->rate = $request->rate;
        $course->save();
        return response()->json([
            'status' => 200,
            'message' => 'Course created successfully',
        ]);
    }
}
