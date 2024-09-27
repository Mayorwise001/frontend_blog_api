import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const AddJob = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [category, setCategory] = useState('');
    const [published, setPublished] = useState(false);
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('You need to be logged in to add a job');
                return;
            }
            try {
                const response = await axios.get('https://blogapi2-o4p8.onrender.com/api/categories', {
                    headers: {
                        Authorization: token
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setMessage('Error fetching categories');
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You need to be logged in to post a job');
            return;
        }

        try {
            const response = await axios.post('https://blogapi2-o4p8.onrender.com/api/add-job', {
                jobTitle,
                jobDescription,
                deadline,
                category,
                published
            }, {
                headers: {
                    Authorization: token
                }
            });

            setMessage(response.data.message);
            setTimeout(() => navigate('/published-jobs'), 2000);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div className='main-container'>
                    
            <Navbar />
            <h2>Add Job</h2>
            {message && <p className='message success'>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job Title:</label>
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Job Description:</label><br></br>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Deadline:</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Published:</label>
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                    />
                </div>
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default AddJob;
