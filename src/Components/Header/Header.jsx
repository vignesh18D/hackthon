import React, { useState } from 'react';
import logo from "../../assets/assets/resized_logo_40x40.png";
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger and close icons
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className="logo">
        <img src={logo} alt='logo' />
        <h1>ED TECH</h1>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <div className={`nav-right ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to='create' smooth={true} duration={500} onClick={() => setIsMobileMenuOpen(false)}>
          <h4>Create</h4>
        </Link>
        <Link to='benefit' smooth={true} duration={500} onClick={() => setIsMobileMenuOpen(false)}>
          <h4>Benefits</h4>
        </Link>
        <Link to='explore' smooth={true} duration={500} onClick={() => setIsMobileMenuOpen(false)}>
          <h4>Explore</h4>
        </Link>
      </div>
    </div>
  );
};

export default Header;
