<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = DB::table('blogs')
            ->where('blogs.published', 1)
            ->join('users', 'users.id', '=', 'blogs.user_id')
            ->select('blogs.*', 'users.name')
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $blogs,
        ]);
    }

    public function indexSortByDate()
    {
        $blogs = DB::table('blogs')
            ->where('blogs.published', 1)
            ->join('users', 'users.id', '=', 'blogs.user_id')
            ->select('blogs.*', 'users.name')
            ->orderBy('blogs.created_at', 'desc')
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $blogs,
        ]);
    }

    public function indexByUser()
    {
        $user_id = auth()->user()->id;
        $blogs = Blog::where('user_id', $user_id)->get();
        return response()->json([
            'status' => 200,
            'data' => $blogs,
        ]);
    }

    public function detail($id)
    {
        $blog = Blog::where('id', $id)
            ->where('published', 1)->first();
        if (is_null($blog)) {
            return response()->json([
                'status' => 404,
                'message' => 'Blog not found',
            ]);
        }
        $user_name = DB::table('users')
            ->where('id', $blog->user_id)
            ->select('name')
            ->first();
        return response()->json([
            'status' => 200,
            'data' => $blog,
            'user_name' => $user_name->name,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $user_id = auth()->user()->id;
        $validator = Validator::make($input, [
            'title' => 'required',
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ]);
        }
        $blog = Blog::create([
            'user_id' => $user_id,
            'title' => $input['title'],
            'content' => $input['content'],
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Blog created successfully',
            'blog' => $blog,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $user_id = auth()->user()->id;
        $validator = Validator::make($input, [
            'title' => 'required',
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ]);
        }
        $blog = Blog::where('id', $id)->where('user_id', $user_id)->first();
        if ($blog) {
            $blog->title = $input['title'];
            $blog->content = $input['content'];
            $blog->save();
            return response()->json([
                'status' => 200,
                'message' => 'Blog updated successfully',
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Blog not found',
            ]);
        }
    }

    public function destroy(Request $request, $id)
    {
        $input = $request->all();
        $user_id = auth()->user()->id;
        $blog = Blog::where('id', $id)->where('user_id', $user_id)->first();
        if ($blog) {
            $blog->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Blog deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Blog not found',
            ]);
        }
    }

    public function isAuthor($id)
    {
        $user_id = auth()->user()->id;
        $blog = Blog::where('id', $id)->where('user_id', $user_id)->first();
        if ($blog) {
            return response()->json([
                'status' => 200,
                'message' => 'Author',
                'blog' => $blog,
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Not Author',
            ]);
        }
    }

    public function publish($id)
    {
        $user_id = auth()->user()->id;
        $blog = Blog::where('id', $id)->where('user_id', $user_id)->first();
        if ($blog) {
            $blog->published = 1;
            $blog->save();
            return response()->json([
                'status' => 200,
                'message' => 'Blog published successfully',
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Blog not found',
            ]);
        }
    }
}
