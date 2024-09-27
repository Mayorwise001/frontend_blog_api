import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate
    useEffect(() => {
        setUsername(`${firstName}${lastName}`);
    }, [firstName,lastName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            setMessageType('error')
            return;
        }
        
        try {
            const response = await axios.post('https://blogapi2-o4p8.onrender.com/api/register',  {
                firstName,
                lastName,
                username,
                email,
                password
            });
            setMessage(response.data.message);
            setMessageType('success')
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setMessage(error.response.data.error);
            setMessageType('error')
        }
    };

        return (
            <div className='container'>
                <div className="login-container">
                <h2>Register</h2>
                {message && <p className={`message ${messageType}`}>
                    {message}
                </p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            readOnly
                        />
                    </div>
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
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit">Register</button>
                        <Link to="/" className="btn btn-back">Back to Login</Link>
                    </div>
                </form>
            </div>
            </div>
        );
    };

export default Register;
