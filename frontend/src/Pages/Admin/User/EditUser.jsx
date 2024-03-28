import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditUser.css';

function EditUser() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phoneNo: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                address: user.address,
                phoneNo: user.phoneNo
            });
        }
    }, [user]);

    const fetchUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/users/${userId}`, formData);
            setMessage('User updated successfully');
            setError('');
        } catch (error) {
            setMessage('');
            setError('Error updating user');
            console.error('Error updating user:', error);
        }
    };

    const handleBack = () => {
        navigate('/admin/users'); // Redirect back to Users page
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
                <label>Phone Number:</label>
                <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                <button type="submit">Save Changes</button>
                {message && <p>{message}</p>}
                <button onClick={handleBack} className='backbutton1'>Back</button>
                {error && <p>{error}</p>}
            </form>
            
        </div>
    );
}

export default EditUser;
