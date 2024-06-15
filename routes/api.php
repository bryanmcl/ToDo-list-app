<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', [UserController::class, 'getWithTasks']);
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/task/create', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);

    Route::post('/logout', [UserController::class, 'logout']);
});

Route::post("/auth/register", [UserController::class, 'register']);
Route::post("/auth/login", [UserController::class, 'login']);
