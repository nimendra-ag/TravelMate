import React from 'react';
import './Hero.css';
import SearchBar from '../searchBar/SearchBar';
import NavbarComponent from '../navbarComponent/NavbarComponent';

const Hero = () => {
    return (
        <>
            <NavbarComponent />
            <header className="hero-section">
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
