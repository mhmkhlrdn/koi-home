<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Try logging in as a User
        if (Auth::guard('web')->attempt($request->only('email', 'password'))) {
            return redirect()->intended('/kh-admin/dashboard');
        }

        // Try logging in as a Customer
        $customer = Customer::where('email', $request->email)->first();
        if ($customer && Hash::check($request->password, $customer->password)) {
            Auth::guard('web')->loginUsingId($customer->id);
            return redirect()->intended('/');
        }

        return back()->withErrors(['email' => 'Invalid credentials.']);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
}