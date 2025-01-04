import React from 'react';
import './Hero.css';
import SearchBar from '../searchBar/SearchBar';
import NavbarComponent from '../navbarComponent/NavbarComponent';

const Hero = () => {
    return (
        <>
            <NavbarComponent />
            <header className="hero-section">
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


                        {localStorage.getItem("user") ? <li><a href="/mybookings/available">My Bookings</a></li> : null}


                    </ul>
                </div>
                <div className="banner-text">
                    <p>Let's Explore Sri Lanka <br /> with</p>
                    <h1>TRAVEL MATE</h1>
                    <SearchBar />
                </div>
            </header>
        </>
    );
};

export default Hero;
