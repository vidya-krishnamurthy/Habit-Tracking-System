// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Ensure this file is created

const Navbar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in by accessing localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!user;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setIsMenuOpen(false); // Close menu on logout
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="HabitForge Home">
          HabitForge
        </Link>
        
        <button
          className={`navbar-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger"></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`} role="menubar">
          <li role="none">
            <Link to="/" role="menuitem" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li role="none">
                <Link to="/tracking" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                  Habits Tracking
                </Link>
              </li>
              <li role="none">
                <Link to="/dashboard" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li role="none">
                <Link to="/analysis" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                  Report & Analysis
                </Link>
              </li>
              <li role="none">
                <button
                  className="nav-button"
                  onClick={handleLogout}
                  role="menuitem"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li role="none">
                <Link to="/login" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li role="none">
                <Link to="/signup" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar1;