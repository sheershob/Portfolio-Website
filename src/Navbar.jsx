import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
      <nav>
      <div className="nav-container">
          <span className="site-name">Sheersho Banerjee</span>
          <ul className="nav-list">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/Leetcode'>Leetcode</Link></li>
            <li><Link to='/Hobbies'>Hobbies</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
