import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditProduct.css'


const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState('');

    useEffect(() => {
        fetchProduct();
    }, []);
    const navigate = useNavigate();
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/products/${id}`, product);
            setUpdateSuccess(true);
            setUpdateError('');
        } catch (error) {
            console.error('Error updating product:', error);
            setUpdateError('Error updating product. Please try again later.');
            setUpdateSuccess(false);
        }
    };
    const handleBack = () => {
        navigate('/admin/allproducts'); 
    };

    return (
        <div>
            <h2>Edit Product</h2>
            {updateSuccess && <p>Product updated successfully!</p>}
            {updateError && <p className="error-message">{updateError}</p>}
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
                {/* <label>
                    Image URL:
                    <input type="text" name="image" value={product.image} onChange={handleInputChange} />
                </label> */}
                <button type="submit" className='update-button'>Update Product</button>
                <button type="button" className='back-button' onClick={handleBack}>Back</button>
            </form>
            
        </div>
    );
};

export default EditProduct;
