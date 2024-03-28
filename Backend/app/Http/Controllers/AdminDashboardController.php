<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Fetch data for the admin dashboard
        $userData = [
            'total' => User::count(),
        ];

        $orderData = [
            'total' => Order::count(),
        ];

        $productData = [
            'total' => Product::count(),
        ];

        return response()->json([
            'users' => $userData,
            'orders' => $orderData,
            'products' => $productData,
        ]);
    }
}
