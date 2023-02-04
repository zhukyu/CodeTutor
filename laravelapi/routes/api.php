<?php

use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\LessonController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ProgressController;
use App\Http\Controllers\API\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => ['json.response'],
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [UsersController::class, 'login']);
    Route::post('/register', [UsersController::class, 'register']);
});

// auth api
Route::group([
    'middleware' => ['json.response', 'apiAuth'],
    'prefix' => 'auth'
], function ($router) {
    Route::post('/logout', [UsersController::class, 'logout']);
    Route::post('/refresh', [UsersController::class, 'refresh']);
    Route::get('/user-profile', [UsersController::class, 'userProfile']);
    Route::post('/change-pass', [UsersController::class, 'changePassWord']);
    Route::get('/learning/{id}', [LessonController::class, 'learning']);
    Route::get('/progress', [ProgressController::class, 'index']);
    Route::post('/update-progress', [ProgressController::class, 'store']);
    Route::post('/update-progress-multiple', [ProgressController::class, 'storeMultiple']);
    Route::get('/course/{id}/percentage', [CourseController::class, 'getPercentage']);
    Route::get('/blogs', [BlogController::class, 'indexByUser']);
    Route::post('/add-blog', [BlogController::class, 'store']);
    Route::post('/edit-blog/{id}', [BlogController::class, 'update']);
    Route::delete('/delete-blog/{id}', [BlogController::class, 'destroy']);
    Route::get('/blog/{id}', [BlogController::class, 'isAuthor']);
    Route::put('/publish-blog/{id}', [BlogController::class, 'publish']);
});

// admin api
Route::group([
    'middleware' => ['json.response', 'apiAuth', 'admin'],
    'prefix' => 'admin'
], function ($router) {
    Route::post('/add-course', [CourseController::class, 'store']);
    Route::post('/edit-course/{id}', [CourseController::class, 'update']);
    Route::post('/add-lesson', [LessonController::class, 'store']);
    Route::post('/add-lesson-multiple', [LessonController::class, 'storeMultiple']);
    Route::post('/edit-lesson-multiple', [LessonController::class, 'updateMultiple']);
});

// author api
Route::group([
    'middleware' => ['json.response', 'apiAuth', 'author'],
    'prefix' => 'author'
], function ($router) {
    Route::get('/course/{id}', [CourseController::class, 'detail']);
});

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/course/{id}', [CourseController::class, 'detail']);
Route::get('/course/{id}/lessons', [LessonController::class, 'detail']);
Route::get('/lessons', [LessonController::class, 'index']);
Route::get('/blogs', [BlogController::class, 'indexSortByDate']);
Route::get('/blog/{id}', [BlogController::class, 'detail']);
