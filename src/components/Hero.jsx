import React from 'react';
import "../css/Hero.css";
import { Link } from 'react-router-dom';

export default function Hero() {

  return (
    <div className='hero-section'>
        <div className='hero-container'>
            <h1>Welcome to MindLog</h1>
            <p>
                Write your thoughts, share your stories, and keep your memories in one place.
            </p>

            <div className='hero-buttons'>
                <Link className='primary-btn' to='/create'>Start Writing</Link>
                <Link className='secondary-btn' to='/explore'>Explore</Link>
            </div>
        </div>
    </div>
  )
}
