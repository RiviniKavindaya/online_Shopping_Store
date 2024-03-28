import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
    const [userData, setUserData] = useState({});
    const [orderData, setOrderData] = useState({});
    const [productData, setProductData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/dashboard')
            .then(response => {
                const { users, orders, products } = response.data;
                console.log(users, orders, products);
                setUserData(users);
                setOrderData(orders);
                setProductData(products);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <h2>Welcome Admin</h2>
                <ul>
                    <li><Link to="/admin">Home</Link></li>
                    <li><Link to="/admin/allproducts">Products</Link></li>
                    <li><Link to="/admin/users">Users</Link></li>
                    <li><Link to="/admin/orders">Orders</Link></li>
                </ul>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="main-content">
                <div className="summary-cards">
                    <div className="admin-summary-card">
                        <h3>Total Users</h3>
                        <p>{userData.total || 0}</p> {/* Check this line */}
                    </div>
                    <div className="admin-summary-card">
                        <h3>Total Orders</h3>
                        <p>{orderData.total || 0}</p> {/* Check this line */}
                    </div>
                    <div className="admin-summary-card">
                        <h3>Total Products</h3>
                        <p>{productData.total || 0}</p> {/* Check this line */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
