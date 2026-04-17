import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Register.css";
import useSignup from "../hooks/useSignup";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {auth} from "../firebase/Firebase";

export default function Register() {

    let [name,setName]=useState('');
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');

    let {error,loading,signUp}=useSignup();
    const navigate=useNavigate();

    if(error){
        return <p>{error}</p>
    }

    let regUser=async(e)=>{
        e.preventDefault();
        let user=await signUp(email,password);

        if(!user) return;
        
            await signOut(auth);
            navigate('/login');
        
    }

  return (
    <form className='register-form' onSubmit={regUser}>
        <div className='register-container'>
            <h2>Start Your Journey</h2>
            <p>Join MindLog and start writing your stories</p>

            <div className='register-input'>
                <label>Name</label>
                <input type='text' placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)} value={name}/>

                <label>Email Addess</label>
                <input type='email' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

                <label>Password</label>
                <input type='password' placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)} value={password} />

                <Link className="reg-link" to='/login'>Already have an account?</Link>

                    <button className='register-btn' disabled={loading}>
                    {loading ? <span className='loader'></span> : 'Login'}
                </button>
            </div>
        </div>
    </form>
  )
}
