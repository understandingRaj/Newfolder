import React, { useEffect, useState } from 'react'
import './LoginForm.css'
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext.jsx';
const LoginForm = (props) => {
    const { tab, setTab } = props;
    const { isLoggedIn, login } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/s');
        }
    }, [isLoggedIn, navigate]);
    const [error, setError] = useState(null)
    const [details, setDetails] = useState({
        password: '',
        email: ''
    });
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setDetails((prev) => ({ ...prev, [name]: value }))
  
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/api/login/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        });
        const resp = await response.json();
        if (resp.status === 200 && resp.token) {
            setDetails({
                password: '',
                email: ''
            })
            login(resp.token)
            return navigate('/s')
        } else {
            setError(resp.message)
        }
    }
    return (
        <div className='loginContainer'>
            <h2> <span onClick={() => setTab('signup')}><NavLink to='/signup'>Sign Up</NavLink></span><span onClick={() => setTab('login')}><NavLink to='/login'>Login</NavLink></span></h2>
            <form onSubmit={handleSubmit}>
                <input className='inputbox' type="email" placeholder="Email" name='email' onChange={handleChange} value={details.email} />
                <input className='inputbox' type="password" placeholder="Password" name='password' onChange={handleChange} value={details.password} />
                <button className='signupbtn' type="submit">Login</button>
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default LoginForm