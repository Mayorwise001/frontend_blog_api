// src/ViewCategories.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';

const ViewCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                setError('You need to be logged in to view categories');
                return;
            }
            try {
                const response = await axios.get('https://blogapi2-o4p8.onrender.com/api/all-categories', {
                    headers: {
                        Authorization: token
                    }
                });
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Error fetching categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://blogapi2-o4p8.onrender.com/api/delete-category/${categoryId}`, {
                headers: {
                    Authorization: token
                }
            });
            setCategories(categories.filter(category => category._id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
            setError('Error deleting category');
        }
    };
    return (
        <div className='main-container'>
            <Navbar />
            <h2>All Categories</h2>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && categories.length === 0 && <p className="no-categories-message">No categories available</p>}
            {categories.length > 0 && (
                <ul className="category-list">
                    {categories.map((category, index) => (
                        <li key={index} className="category-item">
                            <h6 className="category-name">{category.name}</h6>
                            <button className="delete-button" onClick={() => handleDelete(category._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewCategories;
