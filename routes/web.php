<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{pathMatch}', function () {
    return view('welcome');
})->where('pathMatch', '.*');
