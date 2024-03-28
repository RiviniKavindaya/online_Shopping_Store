<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product; 

class ProductController extends Controller
{
    // Get all products
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }
    
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        // Update fields
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->category = $request->input('category');
        
        // // Handle image upload and update
        // if ($request->hasFile('image')) {
        //     $image = $request->file('image');
        //     $imageName = time() . '.' . $image->getClientOriginalExtension();
        //     $image->move('../../../../frontend/src/images', $imageName);
            
        //     // Delete old image if exists
        //     if ( '../../../../frontend/src/images'. $product->image) {
        //         unlink(public_path('../../../../frontend/src/images' . $product->image));
        //     }
            
        //     $product->image = $imageName;
        // }
        
        // Save the updated product
        $product->save();
        
        return response()->json($product);
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
