"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from './WalletModal';

const Navbar = () => {
    const { account, isConnecting, disconnect } = useWallet();
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [renderKey, setRenderKey] = useState(0);
    const chains = [
        {
            id: 'eth',
            name: 'Ethereum',
            symbol: 'ETH',
            icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025'
        },
        {
            id: 'sol',
            name: 'Solana',
            symbol: 'SOL',
            icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=025'
        },
        {
            id: 'xrp',
            name: 'XRP Ledger',
            symbol: 'XRP',
            icon: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025'
        }
    ];
    const [selectedChain, setSelectedChain] = useState(chains[0]);
    const [isChainMenuOpen, setIsChainMenuOpen] = useState(false);
    const chainMenuRef = useRef<HTMLDivElement | null>(null);

    // Force re-render when account changes
    useEffect(() => {
        setRenderKey(prev => prev + 1);
    }, [account]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chainMenuRef.current && !chainMenuRef.current.contains(event.target as Node)) {
                setIsChainMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                <div className="chain-switch" ref={chainMenuRef}>
                    <button
                        type="button"
                        className={`chain-switch-btn ${isChainMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsChainMenuOpen(!isChainMenuOpen)}
                    >
                        <img src={selectedChain.icon} alt={selectedChain.name} className="chain-icon" />
                        <span className="chain-label">{selectedChain.symbol}</span>
                        <span className="chain-caret">▾</span>
                    </button>
                    {isChainMenuOpen && (
                        <div className="chain-menu">
                            {chains.map((chain) => (
                                <button
                                    key={chain.id}
                                    type="button"
                                    className={`chain-option ${selectedChain.id === chain.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedChain(chain);
                                        setIsChainMenuOpen(false);
                                    }}
                                >
                                    <img src={chain.icon} alt={chain.name} className="chain-option-icon" />
                                    <div className="chain-option-text">
                                        <span className="chain-option-name">{chain.name}</span>
                                        <span className="chain-option-symbol">{chain.symbol}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
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
