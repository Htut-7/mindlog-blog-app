import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-container'>

            <div className='footer-top'>
                <h2 className='footer-logo'>MindLog</h2>

                <div className='footer-links'>
                    <Link to='/'>Home</Link>
                    <Link to='/explore'>Explore</Link>
                    <Link to='/create'>Create</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>© 2026 MindLog. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}
