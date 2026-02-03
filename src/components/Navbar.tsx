"use client";

import React, { useState, useEffect } from 'react';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from './WalletModal';

const Navbar = () => {
    const { account, isConnecting, disconnect } = useWallet();
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [renderKey, setRenderKey] = useState(0);

    // Force re-render when account changes
    useEffect(() => {
        setRenderKey(prev => prev + 1);
    }, [account]);

    const formatAddress = (addr: string) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const handleWalletClick = () => {
        if (account) {
            // If connected, show disconnect modal
            setIsDisconnectModalOpen(true);
        } else {
            // If not connected, show connect modal
            setIsWalletModalOpen(true);
        }
    };

    const handleDisconnect = () => {
        disconnect();
        setIsDisconnectModalOpen(false);
    };

    return (
        <nav className="nav animate-fade-in">
            <div className="logo">CityscAPE</div>
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
                    key={`connect-btn-${renderKey}`}
                    className="connect-btn"
                    onClick={handleWalletClick}
                    disabled={isConnecting}
                >
                    {isConnecting ? "CONNECTING..." : account ? formatAddress(account) : "CONNECT"}
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
                key={account ? 'connected' : 'disconnected'}
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
            />

            {/* Disconnect Modal */}
            {isDisconnectModalOpen && (
                <div className="modal-overlay" onClick={() => setIsDisconnectModalOpen(false)}>
                    <div className="modal-content disconnect-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>DISCONNECT WALLET</h2>
                            <button className="modal-close" onClick={() => setIsDisconnectModalOpen(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to disconnect your wallet?</p>
                            <div className="wallet-address-display">
                                <span>{account ? formatAddress(account) : ''}</span>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="modal-btn cancel-btn" onClick={() => setIsDisconnectModalOpen(false)}>
                                CANCEL
                            </button>
                            <button className="modal-btn disconnect-btn" onClick={handleDisconnect}>
                                DISCONNECT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
