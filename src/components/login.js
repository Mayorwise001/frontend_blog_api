import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Add state for message type

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://blogapi2-pxnf.onrender.com/api/login', {
                email,
                password
            });
            setMessage(response.data.message);
            const token = response.data.token;
            const user = response.data.user.username;
            setMessageType('success'); // Set message type to success
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            console.log(response.data.token);
            console.log(response.data.user);

            // Redirect to dashboard or home page after successful login
            setTimeout(() => {
                navigate('/published-jobs'); // Or any route you want to redirect to
            }, 2000);

        } catch (error) {
            setMessage('wrong email or password');
            setMessageType('error'); // Set message type to error
        }
    };

  return (
    <div className="container">
    <div className="login-container">
        <h2>Admin Login</h2>
        {message && (
                <p className={`message ${messageType}`}>
                    {message}
                </p>
            )}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="button-group">
                        <button type="submit">Login</button>
                        <Link to="/register" className="btn">Register</Link>
                    </div>
        </form>



    </div>
</div>
  );
};

export default Login;
