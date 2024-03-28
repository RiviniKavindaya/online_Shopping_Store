// AddProduct.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '', 
        image: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/products', product);
            setProduct({
                name: '',
                description: '',
                price: '',
                category: '', 
                image: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={product.name} onChange={handleInputChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={product.description} onChange={handleInputChange}></textarea>
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={product.price} onChange={handleInputChange} />
                </label>
                <label>
                    Category:
                    <select name="category" value={product.category} onChange={handleInputChange}>
                        <option value="">Select a category</option>
                        <option value="grocery">Grocery</option>
                        <option value="fashion">Fashion</option>
                        <option value="Electronic">Electronic</option>
                    </select>
                </label>
                <label>
                    Image URL:
                    <input type="text" name="image" value={product.image} onChange={handleInputChange} />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
