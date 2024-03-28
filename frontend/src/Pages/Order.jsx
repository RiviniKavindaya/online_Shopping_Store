import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Order.css'; 


const Order = () => {
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: '',
        phoneNo: '',
        address: '',
        email: ''
    });

    const [totalPay, setTotalPay] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const { state } = location;
        if (state) {
            const { totalPay, selectedProducts, userName } = state;
            setTotalPay(totalPay);
            setSelectedProducts(selectedProducts);
            
        }
    }, [location]);

    const handleChange = (e) => {
        setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/order', {
                name: deliveryDetails.name,
                phoneNo: deliveryDetails.phoneNo,
                address: deliveryDetails.address,
                email: deliveryDetails.email,
                totalPay: totalPay,
                selectedProducts: selectedProducts,
            });

            
            alert('Order confirmed! An email has been sent to ' + deliveryDetails.email);
            window.location.href = '/products';
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Error confirming order. Please try again.');

        }
    };
    const handleBack = () => {
        navigate('/products'); 
    };

    return (
        <div className="order-container">
            <h2 className="order-heading ">Confirm Your Order</h2>
            <form onSubmit={handleSubmit} className="order-form">
                <label>Name:</label>
                <input type="text" name="name" value={deliveryDetails.name} onChange={handleChange} required /><br /><br />
                <label>Phone Number:</label>
                <input type="text" name="phoneNo" value={deliveryDetails.phoneNo} onChange={handleChange} required /><br /><br />
                <label>Address:</label>
                <input type="text" name="address" value={deliveryDetails.address} onChange={handleChange} required /><br /><br />
                <label>Email:</label>
                <input type="email" name="email" value={deliveryDetails.email} onChange={handleChange} required /><br /><br />
                <label>Total Amount:</label>
                <input type="text" value={totalPay.toFixed(2)} readOnly /><br /><br />
                <button type="submit" className='confirm-button'>Confirm Order</button>
                <button type="button" className='confirm-button' onClick={handleBack}>Back</button>
            </form>
        </div>

    );
};

export default Order;
