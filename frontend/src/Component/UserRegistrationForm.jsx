import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './UserRegistrationForm.css';

const UserRegistrationForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phoneNo: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Form Data:', formData); 
            const response = await axios.post('http://localhost:8000/api/users', formData); 
            
            if (response.status === 201) {
                localStorage.setItem('userName', formData.name);
                localStorage.setItem('userEmail', formData.email);
                navigate('/products'); 
                
            } else {
                throw new Error('Failed to register user');
            }

            

        } catch (error) {
            console.error('Error registering user:', error);
            setError('Failed to register user. Please try again.or You already register.');
        }
    };

    return (
        <div className="registration-container">
            <h1 className="title">Adikari Online Store</h1>
            <div className="registration-form-container">
            {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="registration-form">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required /><br/><br/>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br/><br/>
                    <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" required /><br/><br/>
                    <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="PhoneNo" required /><br/><br/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password (min 8 characters)" minLength={8} required /><br/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserRegistrationForm;
