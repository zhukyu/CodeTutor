<?php

use App\Http\Controllers\API\ProductController;
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

Route::get('products', [ProductController::class, 'index']);

Route::middleware('auth:sanctum')->group(function (){
    Route::get('/user', [App\Http\Controllers\API\UsersController::class, 'user']);
});

/* Api Register */
Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return Response()->json(array("token" => $token));
});
Route::post('login', [App\Http\Controllers\API\UsersController::class, 'login']);
Route::post('register', [App\Http\Controllers\API\UsersController::class, 'register']);
