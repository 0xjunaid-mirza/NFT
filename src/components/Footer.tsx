"use client";

import React from 'react';

const Footer = () => {
    return (
        <footer className="footer animate-fade-in delay-4">
            <div className="footer-top">
                <div className="footer-logo">CityScape</div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>EXPLORE</h4>
                        <a href="#">Collections</a>
                        <a href="#">Marketplace</a>
                        <a href="#">Drops</a>
                    </div>
                    <div className="footer-column">
                        <h4>PROJECT</h4>
                        <a href="#roadmap">Roadmap</a>
                        <a href="#faq">FAQs</a>
                        <a href="#">Whitepaper</a>
                    </div>
                    <div className="footer-column">
                        <h4>SOCIAL</h4>
                        <a href="#">Discord</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 CityScape STUDIOS. ALL RIGHTS RESERVED.</p>
            </div>
        </footer>
    );
};

export default Footer;
