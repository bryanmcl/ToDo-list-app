<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:6']
        ]);

        $user = User::create($data);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users'],
            'password' => ['required', 'min:6']
        ]);

        $user = User::where('email', $data['email'])->first();

        if(!Auth::attempt($data)) {
            return response([
                'message' => 'Bad creds'
            ], 401);
        }
        
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            $request->user()->tokens()->delete();
            return response()->json(['message' => 'Successfully logged out']);
        }

        return response()->json(['message' => 'No authenticated user'], 401);
    }

    public function getWithTasks(Request $request)
    {
        $user = $request->user();
        $user->load('tasks');

        return response()->json($user);
    }
}
