<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use getID3;

class LessonController extends Controller
{

    public function getDuration($path)
    {
        $video = file_get_contents($path);

        // Save the video file to a temporary location on the server
        $tempFile = storage_path('video.mp4');
        file_put_contents($tempFile, $video);

        // Initialize the getID3 class
        $getID3 = new getID3;

        // Analyze the video file
        $data = $getID3->analyze($tempFile);

        // Retrieve the duration of the video
        $duration = $data['playtime_string'];

        // Delete the temporary video file
        unlink($tempFile);

        return $duration;
    }

    public function index()
    {
        $lessons = Lesson::all();
        return response()->json([
            'status' => 200,
            'data' => $lessons,
        ]);
    }

    public function detail($courseId)
    {
        $lessons = DB::table('lessons')
            ->where('lessons.course_id', $courseId)
            ->get();
        $title = DB::table('course')
            ->select('course.title')
            ->where('course.id', $courseId)
            ->get();
        return response()->json([
            'status' => 200,
            'title' => $title,
            'data' => $lessons,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'course_id' => 'required',
            'name' => 'required',
            'URL' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ]);
        }

        $lesson = new Lesson();
        $lesson->course_id = $request->course_id;
        $lesson->name = $request->name;
        $lesson->URL = $request->URL;
        $durasi = $this->getDuration($lesson->URL);
        $lesson->duration = date('H:i:s', strtotime('00:' . $durasi));
        $lesson->save();
        return response()->json([
            'status' => 200,
            'message' => 'Lesson created successfully',
        ]);
    }

    public function storeMultiple(Request $request)
    {
        $temp = '';
        $inputs = $request->all();
        $validator = Validator::make($inputs, [
            'course_id' => 'required',
            'lessons' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ]);
        }
        $course_id = $request->course_id;
        $lessons = $request->lessons;
        foreach ($lessons as $lesson) {

            $validator = Validator::make($lesson, [
                'name' => 'required',
                'URL' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 400,
                    'message' => $validator->errors(),
                ]);
            }

            $temp = new Lesson();
            $temp->course_id = $course_id;
            $temp->name = $lesson['name'];
            $temp->URL = $lesson['URL'];
            $durasi = $this->getDuration($lesson['URL']);
            $temp->duration = date('H:i:s', strtotime('00:' . $durasi));
            $temp->save();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Lessons created successfully',
        ]);
    }
}
