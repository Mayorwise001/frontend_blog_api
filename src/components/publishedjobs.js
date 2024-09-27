
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { Link } from 'react-router-dom';


const PublishedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(''); // Add error state


    useEffect(() => {
        const fetchJobs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);

                return;
            
            }
            try {
                const response = await axios.get('https://blogapi2-o4p8.onrender.com/api/published-jobs', {
                    headers: {
                        Authorization: token
                      }
                });
                setJobs(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                
                console.error('Error fetching jobs:', error);
                setError('Error fetching jobs'); // Set error message if there's an issue
                setLoading(false); // Set loading to false on error
            }
        };

        fetchJobs();
    }, []);
    const handleUnpublish = async (jobId) => {
        try {
        const token = localStorage.getItem('token');
        await axios.put(`https://blogapi2-o4p8.onrender.com/api/${jobId}/unpublish`, null, {
                headers: {
                    Authorization: token
                }
            });
            setJobs(jobs.filter(job => job._id !== jobId));
            
        } catch (error) {
            console.error('Error unpublishing job:', error);
            setError('Error unpublishing job');
        }
    };



    return (
        <div className='main-container'>
          <Navbar />
            <h2>Published Jobs</h2>
            {loading && <p className="loading-message">Loading...</p>} {/* Display loading message if loading */}
            {error && <p className="error-message">{error}</p>}
           {/* Display error message if error */}

            {!loading && !error && ( 
                <>
            {jobs.length > 0 ? (
                <ul className="job-list">
                    {jobs.map((job, index) => (
                        <li key={index} className="job-item">
                            <h3 className="job-title">{job.jobTitle}</h3>
                            <p className="job-deadline">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                            <p className="job-description">Description: 
                                {job.jobDescription.length > 10 ? ` ${job.jobDescription.substring(0, 25)}...` : job.jobDescription}
                            </p>
                            
                            <p className="job-posted-by">Posted by: {job.postedBy}</p>
                            <Link to={`/job-details/${job.jobid}`} className="view-details-link">
                                        Click here to view details
                                    </Link>
                                    <div className="unpublish-container">
                                        <label className="unpublish-label">
                                            Unpublish
                                            <input
                                                type="checkbox"
                                                className="unpublish-checkbox"
                                                onChange={() => handleUnpublish(job.jobid)}
                                            />
                                        </label>
                                    </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-jobs-message">No published jobs available</p>
                
            )}
            </>
            )}
        </div>
    );
};

export default PublishedJobs;
