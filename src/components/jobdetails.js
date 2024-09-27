// src/JobDetails.js
import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import { Link, useNavigate } from 'react-router-dom';


const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);

                return;

            }


            try {
                const response = await axios.get(`https://blogapi2-o4p8.onrender.com/api/job-details/${id}`,{
                    headers: {
                        Authorization: token
                      }
                });
                setJob(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job details:', error);
                setError('Error fetching job details');
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleDelete = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this job post?');
        if (!confirmDelete) {
            return;
        }


        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in again.');
            return;
        }

        try {
            await axios.delete(`https://blogapi2-o4p8.onrender.com/api/job-details/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            navigate('/published-jobs');
        } catch (error) {
            console.error('Error deleting job:', error);
            setError('Error deleting job');
        }
    };

    return (
        <div className="main-container">
            <Navbar />
            <h2>Job Details</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {job ? (
                <div className="job-details">
                    <h3>{job.jobTitle}</h3>
                    <p className="job-deadline">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                    <p className="job-description">Job Description: {job.jobDescription}</p>
                    <p className="job-posted-by  details">Posted by: {job.postedBy}</p>
                    <p className="job-posted-by  details">Category: {job.category}</p>
                    <p className="job-posted-by  details">Date Created: {new Date(job.createdDate).toLocaleDateString()}</p>
                </div>
            ) : (
                !loading && !error && <p>No job details available</p>
            )}
            <div className="button-container">
                    <Link to={`/editjob/${id}`} className="btn btn-grey">
                        Edit Job
                    </Link>
                    <button onClick={handleDelete} className="btn btn-danger">Delete Job</button>
            <Link to="/published-jobs" className="btn btn-back">
                Back to Published Jobs
            </Link>
            </div>
        </div>
    );
};

export default JobDetails;
