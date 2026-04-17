import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Login.css";
import "../hooks/useSignin";
import useSignin from '../hooks/useSignin';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');

    let {error,loading,signIn}=useSignin();
    const navigate=useNavigate();

    if(error){
        return <p>{error}</p>
    }

    let signInUser=async(e)=>{
        e.preventDefault();
        let user=await signIn(email,password);

        if(user){
            navigate('/');
        }
    }

  return (
    <form className='login-form' onSubmit={signInUser}>
        <div className='login-container'>
            <h2>Welcome Back</h2>
            <p>Sign in to continue to MindLog</p>

            <div className='login-input'>
                <label>Email Address</label>
                <input type='email' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

                <label>Password</label>
                <input type='password' placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)} value={password}/>

                <Link className='login-link' to='/register'>Don't have an account?</Link>

                <button className='login-btn' disabled={loading}>
                    {loading ? <span className='loader'></span> : 'Login'}
                </button>
            </div>
        </div>
    </form>
  )
}
