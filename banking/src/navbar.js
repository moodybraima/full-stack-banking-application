import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { useContext } from 'react';
import { store } from './App';


function NavBar() {
  const [token, setToken] = useContext(store);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'navbar-brand text-white')} to="/" data-toggle="tooltip" data-placement="bottom" title="Bad Bank">Bad Bank Home</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'active' : 'navbar-brand text-white')} to="/createaccount" data-toggle="tooltip" data-placement="bottom" title="Create Account">Create Account</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'active' : 'navbar-brand text-white')} to="/login" data-toggle="tooltip" data-placement="bottom" title="Login">Login</NavLink>
            </li>
            {token && (<ul className='navbar-nav'>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'navbar-brand text-white')} to="/deposit" data-toggle="tooltip" data-placement="bottom" title="Deposit">Deposit</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'navbar-brand text-white')} to="/withdraw" data-toggle="tooltip" data-placement="bottom" title="Withdraw">Withdraw</NavLink>
              </li>
               <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'navbar-brand text-white')} to="/logout" data-toggle="tooltip" data-placement="bottom" title="All Data">Logout</NavLink>
              </li> 
            </ul>)}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar;