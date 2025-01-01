import React from 'react'
import './Hero.css';
import logo from '../../assets/TravalMate Logo.png'
import SearchBar from '../searchBar/SearchBar';
import SigninModal from '../signinModal/SigninModal';
const Hero = () => {
    return (
        <>
            <header>
                <div className="wrapper">
                    <div className="logo">
                        <a href="#"><img src={logo} alt="" style={{ width: '150px', height: '150px' }} /></a>
                    </div>
                    <ul className="menu">
                        <li><a href="#">Explore</a></li>
                        <li><a href="#">Packages</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="/details">More</a></li>
                        <li><SigninModal /></li>


                        {localStorage.getItem("user") ? <li><a href="/mybookings">My Bookings</a></li> : null}


                    </ul>
                </div>
                <div className="banner-text">
                    <p>Let's Explore the Sri Lanka <br />with</p>
                    <h1>TRAVEL MATE </h1>
                    <SearchBar />
                </div>
            </header>
        </>
    )
}

export default Hero