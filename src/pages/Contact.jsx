import React, { useState } from 'react';
import "../css/Contact.css";
import useFirestore from '../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

export default function Contact() {

  let { addCollection } = useFirestore();

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [body, setBody] = useState('');
  let [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  let addForm = async (e) => {
    e.preventDefault();

    let data = { name, email, body };

    await addCollection('contact', data);

    setSuccess(true);

    setName('');
    setEmail('');
    setBody('');

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    
    <form className='contact-form' onSubmit={addForm}>
      <div className='contact-container'>

        <h2>Contact Us</h2>
        <p>Have a question or feedback? We'd love to hear from you.</p>

        {success && (
          <div className="success-popup">
            Message sent successfully!
          </div>
        )}

        <div className='contact-input'>

          <label>UserName</label>
          <input
            type='text'
            placeholder='Enter your Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <label>Email Address</label>
          <input
            type='email'
            placeholder='Enter your Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <textarea
            placeholder='Write your Feedback here...'
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />

          <button className='contact-btn'>Send</button>

        </div>
      </div>
    </form>
  );
}