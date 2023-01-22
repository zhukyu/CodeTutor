<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Progress;
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

    public function myCourses()
    {
        $user_id = auth()->user()->id;
        $courses = DB::table('course')
            ->join('users', 'users.id', '=', 'course.user_id')
            ->select('course.*', 'users.name')
            ->where('course.user_id', $user_id)
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $courses,
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

    public function countPercentage($course_id)
    {
        $lessons = DB::table('lessons')
            ->where('lessons.course_id', $course_id)
            ->get();
        $progress = DB::table('progress')
            ->select('progress.lesson_id', 'progress.progress', 'progress.completed')
            ->where('progress.user_id', auth()->user()->id)
            ->whereIn('progress.lesson_id', $lessons->pluck('id'))
            ->orderBy('progress.lesson_id', 'asc')
            ->get();
        $total = $lessons->count();
        $completed = $progress->where('completed', 1)->count();
        if ($total == 0) {
            $percentage = 0;
        } else {
            $percentage = ($completed / $total) * 100;
        }
        return $percentage;
    }

    public function getPercentage($course_id)
    {
        $percentage = $this->countPercentage($course_id);
        return response()->json([
            'status' => 200,
            'percentage' => $percentage,
        ]);
    }
}
