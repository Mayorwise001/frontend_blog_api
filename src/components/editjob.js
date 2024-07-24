// src/EditJob.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        deadline: '',
        postedBy: '',
        category: ''
    });

    useEffect(() => {
        const fetchJobDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://blogapi2-pxnf.onrender.com/api/job-details/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });
                setFormData({
                    jobTitle: response.data.jobTitle,
                    jobDescription: response.data.jobDescription,
                    deadline: new Date(response.data.deadline).toISOString().split('T')[0],
                    postedBy: response.data.postedBy,
                    category: response.data.category
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job details:', error);
                setError('Error fetching job details');
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in again.');
            return;
        }

        try {
            await axios.put(`https://blogapi2-pxnf.onrender.com/api/job-details/${id}`, formData, {
                headers: {
                    Authorization: token
                }
            });
            navigate(`/job-details/${id}`);
        } catch (error) {
            console.error('Error updating job:', error);
            setError('Error updating job');
        }
    };

    return (
        <div className="main-container">
            <Navbar />
            <h2>Edit Job</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {formData && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Job Title:</label><br></br>
                        <input
                        className='text'
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Job Description:</label>
                        <textarea
                        className='textarea'
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label>Deadline:</label><br></br>
                        <input
                        className='text'
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Posted By:</label>
                        <input
                            type="text"
                            name="postedBy"
                            value={formData.postedBy}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn btn-grey">Save Changes</button>
                        <Link to={`/job-details/${id}`} className="btn btn-back">Back</Link>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditJob;
