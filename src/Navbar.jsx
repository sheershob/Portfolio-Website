import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav>
        <div className="nav-container">
          <span className="site-name">Sheersho Banerjee</span>

          {/* Hamburger Menu */}
          <div className={`menu-toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-list ${isOpen ? "show" : ""}`}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/Leetcode'>Leetcode</Link></li>
            <li><Link to='/Hobbies'>Hobbies</Link></li>
            {/* <li><Link to='/Projects'>Projects</Link></li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;