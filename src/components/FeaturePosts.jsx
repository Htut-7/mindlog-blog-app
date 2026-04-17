import React from 'react';
import image from "../assets/react.jpg";
import "../css/FeaturePosts.css";

export default function FeaturePosts() {
  return (
    <section className='featured-section'>
        <div className='featured-container'>

            <div className='featured-card'>
                <div className='featured-image'>
                    <img src={image}/>
                </div>

                <div className='featured-content'>
                    <span className='tag'>Featured</span>
                    <h2 className='featured-heading'>Build Modern Apps with React and Firebase</h2>

                    <p>
                Learn how to create scalable and powerful web applications using React
              and Firebase with real-world examples.
                    </p>

                    <div className='featured-bottom'>
                        <span>By Admin</span>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
