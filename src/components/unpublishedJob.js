import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';

const UnpublishedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get('https://blogapi2-pxnf.onrender.com/api/unpublished-posts', {
                    headers: {
                        Authorization: token
                    }
                });
                setJobs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Error fetching jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handlePublish = async (jobId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`https://blogapi2-pxnf.onrender.com/api/publish-job/${jobId}`, {}, {
                headers: {
                    Authorization: token
                }
            });
            setJobs(jobs.filter(job => job._id !== jobId));
            
        } catch (error) {
            console.error('Error publishing job:', error);
            setError('Error publishing job');
        }
    };

    return (
        <div className='main-container'>
            <Navbar />
            <h2>Unpublished Jobs</h2>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && jobs.length === 0 && <p className="no-jobs-message">No unpublished jobs available</p>}
            {jobs.length > 0 && (
                <ul className="job-list">
                    {jobs.map((job, index) => (
                        <li key={index} className="job-item">
                            <h3 className="job-title">{job.jobTitle}</h3>
                            <p className="job-deadline">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                            <p className="job-description">
                                {job.jobDescription.length > 100 ? `${job.jobDescription.substring(0, 100)}...` : job.jobDescription}
                            </p>
                                                        <p className="job-posted-by">Posted by: <em>{job.postedBy}</em></p>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={() => handlePublish(job._id)}
                                />
                                Publish
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UnpublishedJobs;