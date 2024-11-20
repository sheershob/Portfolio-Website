import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div>
        <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <a href="https://leetcode.com/sheersho_b" target="_blank" rel="noopener noreferrer">
            Leetcode
          </a>
          <a href="https://linkedin.com/in/sheershobanerjee" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/sheershob" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:sheersho.banerjee@gmail.com" target="_blank" rel="noopener noreferrer">
            Mail
          </a>
        </div>
        <div className="contact-info">
          <p>Sheersho Banerjee © 2024</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
