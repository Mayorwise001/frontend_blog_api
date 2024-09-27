// src/AllUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar'; // Assuming you have a Navbar component

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://blogapi2-o4p8.onrender.com/api/all-users', {
                    headers: {
                        Authorization: token
                    }
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in again.');
            return;
        }

        try {
            await axios.delete(`https://blogapi2-o4p8.onrender.com/api/all-users/${userId}`, {
                headers: {
                    Authorization: token
                }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user');
        }
    };



    return (
        <div className="main-container">
            <Navbar />
            <h2>All Registered Users</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <ul className="user-list">
                    {users.map((user, index) => (
                        <li key={index} className="user-item">
                            <p className="user-name">First Name: {user.firstName}</p>
                            <p className="user-name">Last Name: {user.lastName}</p>
                            <p className="user-username">Username: {user.username}</p>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(user._id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllUsers;
