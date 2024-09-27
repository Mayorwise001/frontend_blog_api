// src/AddCategory.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in again.');
            return;
        }

        try {
            const response = await axios.post('https://blogapi2-o4p8.onrender.com/api/addcategory', { name }, {
                headers: {
                    Authorization: token
                }
            });
            setSuccess(response.data.message);
            setName('');
        } catch (error) {
            console.error('Error adding category:', error);
            setError('Error adding category');
        }
    };

    return (
        <div className="main-container">
            <Navbar />
            <h2>Add Category</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
