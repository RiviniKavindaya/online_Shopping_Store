import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Admin.css';
import './AllProduct.css';
import ProductForm from '../ProductForm'; // Import the ProductForm component

const AllProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Error fetching products. Please try again later.');
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/api/products/${productId}`);
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Error deleting product. Please try again later.');
        }
    };

    const handleEdit = async (productId) => {
        try {
            console.log(productId);
            const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
            const productToEdit = response.data;
            console.log(productToEdit);
            setEditingProduct(productToEdit);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Error fetching product details. Please try again later.');
        }
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <h2>Admin Dashboard</h2>
                <ul>
                    <li><Link to="/admin">Home</Link></li>
                    <li><Link to="/admin/allproducts">Products</Link></li>
                    <li><Link to="/admin/users">Users</Link></li>
                    <li><Link to="/admin/orders">Orders</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <h2>All Products</h2>
                <Link to="/admin/addproduct" className="add-product-button">Add Product</Link>
                {error && <p className="error-message">{error}</p>}
                
                    <div className="product-list">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <img src={require(`../../../images/${product.image}`)} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                <Link to={`/admin/editproduct/${product.id}`} className="edit-product-button">Edit</Link>
                            </div>
                        ))}
                    </div>
                
            </div>
        </div>
    );
};

export default AllProducts;
