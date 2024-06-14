<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', [UserController::class, 'getWithTasks']);
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/task/create', [TaskController::class, 'store']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
});

Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
