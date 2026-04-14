import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'
const Navbar = (props) => {
    const {tab,setTab} = props
    const { isLoggedIn } = useAuth();
  return (
    <div className='navbarContainer'>
        <div className='logo'> <NavLink to='/'>Rajesh</NavLink></div>
        <div className='nav-links'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/s'>Search Page</NavLink>
            <NavLink to='/checkout'>Checkout Page</NavLink>
            <NavLink to='/orders'>Order History</NavLink>
            <NavLink to='/create-listing'>List Your Item</NavLink>
            {!isLoggedIn && <NavLink to='/signup' onClick={() => setTab('signup')}>Sign Up / Login</NavLink>}
        </div>
    </div>
  )
}

export default Navbar