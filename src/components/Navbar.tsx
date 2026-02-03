"use client";

import React, { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from './WalletModal';

const Navbar = () => {
    const { account, isConnecting } = useWallet();
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const formatAddress = (addr: string) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const handleConnectClick = () => {
        if (!account) {
            setIsWalletModalOpen(true);
        }
    };

    return (
        <nav className="nav animate-fade-in">
            <div className="logo">FPRN</div>
            {/* Desktop Links */}
            <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <li><a href="#" onClick={() => setIsMobileMenuOpen(false)}>[ HOME ]</a></li>
                <li><a href="#collection" onClick={() => setIsMobileMenuOpen(false)}>[ COLLECTION ]</a></li>
                <li><a href="#roadmap" onClick={() => setIsMobileMenuOpen(false)}>[ ROADMAP ]</a></li>
                <li><a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>[ FAQS ]</a></li>
            </ul>
            <div className="nav-actions">
                <div className="nav-socials desktop-only">
                    <a href="#" className="nav-social-link">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/discord-logo.png" alt="Discord" />
                    </a>
                    <a href="#" className="nav-social-link">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="X" />
                    </a>
                    <a href="#" className="nav-social-link">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
                    </a>
                </div>
                <button
                    className="connect-btn"
                    onClick={handleConnectClick}
                    disabled={isConnecting}
                >
                    {isConnecting ? "..." : account ? formatAddress(account) : "CONNECT"}
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>

            <WalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
