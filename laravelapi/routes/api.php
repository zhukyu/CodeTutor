<?php

use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\ProductController;
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
    'middleware' => 'json.response',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [UsersController::class, 'login']);
    Route::post('/register', [UsersController::class, 'register']);
    Route::post('/logout', [UsersController::class, 'logout']);
    Route::post('/refresh', [UsersController::class, 'refresh']);
    Route::get('/user-profile', [UsersController::class, 'userProfile']);
    Route::post('/change-pass', [UsersController::class, 'changePassWord']);
    Route::post('/add-product', [UsersController::class, 'store']);
    Route::post('/add-product', [ProductController::class, 'store']);
    Route::post('/add-course', [CourseController::class, 'store']);
});

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/course/{id}', [CourseController::class, 'detail']);
