import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
// import '../components/app.css'; // Create and use this file for styling the navbar
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const username = localStorage.getItem('user'); 

    return (
        <>
        <button className="menu-toggle" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <div className="navbar-container">
        <div className="welcome-message">
            {username && <span>Welcome, {username}!</span>}
            
          </div>
        <ul className= "navbar-menu" >
            <li className="navbar-item">
              <Link to="/addjob" className="navbar-link">  <i className="fas fa-plus"></i>Add Job</Link>
            </li>
            <li className="navbar-item">
              <Link to="/change-password" className="navbar-link"> <i className="fa-solid fa-key"></i> Change Password</Link>
            </li>
            <li className="navbar-item">
              <Link to="/published-jobs" className="navbar-link"><i className="fas fa-book"></i>Published Jobs</Link>
            </li>
            <li className="navbar-item">
              <Link to="/unpublish" className="navbar-link"><i className="fas fa-book-dead"></i>Unpublished Jobs</Link>
            </li>
            <li className="navbar-item">
              <Link to="/allusers" className="navbar-link"> <i className="fas fa-users"></i>All Users</Link>
            </li>
            <li className="navbar-item">
              <Link to="/logout" className="navbar-link"> <i className="fas fa-sign-out-alt"></i>Logout</Link>
            </li>
            <li className="navbar-item">
              <Link to="/addcategory" className="navbar-link">  <i className="fas fa-plus"></i>Create category</Link>
            </li>
            <li className="navbar-item">
              <Link to="/allcategories" className="navbar-link">  <i className="fas fa-user-plus"></i>All Categories</Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">  <i className="fas fa-user-plus"></i>Signup</Link>
            </li>
          </ul>
        </div>
      </nav>
      </>
    );
};

export default Navbar;
