<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if ($user->email === 'admin@gmail.com') {
                return response()->json([
                    'user_name' => $user->name,
                    'email' => $user->email,
                    'message' => 'Admin login successful',
                    'redirect_to' => '/admin',
                ], 200);
            }

            return response()->json([
                'user_name' => $user->name,
                'email'=> $user->email,
                'message' => 'Login successful',
                'redirect_to' => '/products'
            ], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // public function logout(Request $request)
    // {
    //     $request->user()->currentAccessToken()->delete();
    //     return response()->json(['message' => 'Logged out successfully'], 200);
    // }

    public function register(Request $request)
    {
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|',
            'address' => 'required|string|max:255',
            'phoneNo' => 'required|string|max:20', 
            'password' => 'required|string|min:8',
            
        ]);

       
        $validatedData['password'] = bcrypt($validatedData['password']);

        
        $user = User::create($validatedData);

        
        return response()->json(['message' => 'User registered successfully'], 201);
    }


    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function store(Request $request)
    {
        $user = User::create($request->all());
        return response()->json(['message' => 'User created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
    
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'address' => 'required|string|max:255',
            'phoneNo' => 'required|string|max:20',
        ]);
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->address = $validatedData['address'];
        $user->phoneNo = $validatedData['phoneNo'];
        
       
        $user->save();
        return response()->json(['message' => 'User updated successfully'], 200);
    }
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }
    
}
