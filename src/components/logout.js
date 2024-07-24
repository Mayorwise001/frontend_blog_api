
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      try {
        await axios.post('https://blogapi2-pxnf.onrender.com/api/logout', {}, { withCredentials: true });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    signOut();
  }, [navigate]);

  return <p>Signing out...</p>;
};

export default SignOut;
