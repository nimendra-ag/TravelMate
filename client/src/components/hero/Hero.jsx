import React from 'react'
import './Hero.css';
import logo from '../../assets/TravalMate Logo.png'
import SignupModal from '../signupModal/SignupModal';
import SearchBar from '../searchBar/SearchBar';
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
                        <li><a href="#">More</a></li>
                        <li><SignupModal/></li>
                       


                      
                    </ul>
                </div>
                <div className="banner-text">
                    <h1> WELCOME TO <span> TRAVEL MATE </span></h1>
                    <p>Let's Explore the Sri Lanka</p>
                    <SearchBar/>
                </div>
            </header>
        </>
    )
}

export default Hero