<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Lcobucci\JWT\Token;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

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
        $lessons = DB::table('lessons')
            ->where('course_id', $id)
            ->get();
        return response()->json([
            'status' => 200,
            'courses' => $courses,
            'lessons' => $lessons,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required',
            'description' => 'required',
            'image' => 'required',
            'price' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ]);
        }

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
            'course_id' => $course->id,
        ]);
    }
}
