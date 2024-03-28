import React from 'react'
import axios from 'axios';

import UserRegistrationForm from '../Component/UserRegistrationForm';

function Register() {
    
    const handleSubmit = async (formData) => {
        try {
           await axios.post('http://localhost:8000/api/users', formData); // Assuming your backend endpoint is /api/users
            
            // Redirect to products page after successful registration
            // You can use react-router-dom's useHistory hook for this
        } catch (error) {
            console.error('Error registering user:', error);
            // Display error message to the user
        }
    };

  return (
    <div>
        <div>
            
            <UserRegistrationForm onSubmit={handleSubmit} />
        </div>
    </div>
  )
}

export default Register
