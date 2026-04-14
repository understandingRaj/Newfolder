import React from 'react'
import heroimage from '../../assets/images/banner.png'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div>
        <section className='heroSection'>
            <div className='heroContent'>
                <h1>Welcome to Our Website</h1>
                <p>Discover amazing content and connect with others.</p>
                <button>Get Started</button>
            </div>
            <div className='heroImage'>
                <img src={heroimage} alt='Hero' />
            </div>
        </section>
    </div>
  )
}

export default LandingPage