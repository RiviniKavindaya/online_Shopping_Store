<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Mail\OrderConfirmation;

class OrderController extends Controller
{
    
    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            'name' => 'required|string',
            'phoneNo' => 'required|string',
            'address' => 'required|string',
            'email' => 'required|email',
            'totalPay' => 'required|numeric',
            'selectedProducts' => 'required|array',
        ]);

        $order = Order::create([
            'name' => $validatedData['name'],
            'phoneNo' => $validatedData['phoneNo'],
            'address' => $validatedData['address'],
            'email' => $validatedData['email'],
            'totalPay' => $validatedData['totalPay'],
        ]);

        foreach ($validatedData['selectedProducts'] as $selectedProduct) {
            $product = Product::findOrFail($selectedProduct['id']);
            $product->decrement('quantity', $selectedProduct['quantity']);
        }
       # Mail::to($order->email)->send(new OrderConfirmation($order));
        return response()->json($order, 201);
    }
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    // Delete an order
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }
}
