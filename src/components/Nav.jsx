import React from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom';
import "../css/Nav.css";
import { useContext } from 'react';
import {AuthContext} from "../Contexts/AuthContext";
import useSignout from '../hooks/useSignout';

export default function Nav() {

  let { user } = useContext(AuthContext);
  let { logOut } = useSignout();
  const navigate = useNavigate();

  let logOutUser = async (e) => {
    e.preventDefault();
    await logOut();
    navigate('/login');
  };

  return (
    <nav className='nav-bar'>
      <div className='nav-container'>

        <Link className='nav-heading'>Mind Log</Link>

        <ul className='nav-link'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/explore'>Explore</NavLink>
          <NavLink to='/create'>Create</NavLink>
        </ul>

        <div className='nav-control'>
          {!user && (
            <>
              <NavLink to='/login'>Login</NavLink>
              <NavLink to='/register'>Register</NavLink>
            </>
          )}

          {!!user && (
            <button onClick={logOutUser}>Logout</button>
          )}
        </div>

      </div>
    </nav>
  );
}
