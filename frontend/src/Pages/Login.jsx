import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login', formData); 
            
            if (response.status === 200) {
                const { user_name, email, redirect_to } = response.data;
                localStorage.setItem('userName', user_name);
                localStorage.setItem('userEmail', email);
                navigate(redirect_to); 
                
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Failed to login. Please check your credentials.');
        }
    };
    const handleSignUp = () => {
        navigate('/register'); // Redirect to the registration page
    };

    return (
        <div className="login-container">
            <h1 className="title">Adikari Online Store</h1>
            <div className="login-form-container">
            {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br/><br/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required /><br/><br/>
                    <button type="submit">Login</button>

                </form>
                <p>Don't have an account? <button onClick={handleSignUp} className="signup-link">Sign Up</button></p>
            </div>
        </div>
    );
};

export default Login;
