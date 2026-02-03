"use client";

import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";

export interface WalletState {
    account: string | null;
    walletType: string | null;
    isConnecting: boolean;
    error: string | null;
    connect: (walletType?: string) => Promise<void>;
    disconnect: () => void;
}

declare global {
    interface Window {
        ethereum?: any;
        solana?: any;
    }
}

export const useWallet = (): WalletState => {
    const [account, setAccount] = useState<string | null>(null);
    const [walletType, setWalletType] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasUserDisconnected, setHasUserDisconnected] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage after component mounts (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedAccount = localStorage.getItem('wallet_account');
            const savedWalletType = localStorage.getItem('wallet_type');
            const savedDisconnected = localStorage.getItem('wallet_disconnected') === 'true';

            if (savedAccount && !savedDisconnected) {
                setAccount(savedAccount);
                setWalletType(savedWalletType);
            }
            setHasUserDisconnected(savedDisconnected);
            setIsInitialized(true);
        }
    }, []);

    const connect = useCallback(async (walletType: string = 'metamask') => {
        if (walletType === 'metamask') {
            if (typeof window === 'undefined' || !window.ethereum) {
                setError("MetaMask is not installed. Please install it to connect.");
                return;
            }
        } else if (walletType === 'phantom') {
            if (typeof window === 'undefined' || !window.solana || !window.solana.isPhantom) {
                setError("Phantom wallet is not installed. Please install it to connect.");
                return;
            }
        } else {
            setError("Unsupported wallet type.");
            return;
        }

        setIsConnecting(true);
        setError(null);

        try {
            if (walletType === 'metamask') {
                // Request account access if needed
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                if (accounts && accounts.length > 0 && accounts[0]) {
                    setAccount(accounts[0]);
                    setWalletType('metamask');
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('wallet_account', accounts[0]);
                        localStorage.setItem('wallet_type', 'metamask');
                        setHasUserDisconnected(false);
                        localStorage.setItem('wallet_disconnected', 'false');
                    }
                } else {
                    setError("No accounts found.");
                    setAccount(null);
                }
            } else if (walletType === 'phantom') {
                // Connect to Phantom wallet
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();

                setAccount(publicKey);
                setWalletType('phantom');
                if (typeof window !== 'undefined') {
                    localStorage.setItem('wallet_account', publicKey);
                    localStorage.setItem('wallet_type', 'phantom');
                    setHasUserDisconnected(false);
                    localStorage.setItem('wallet_disconnected', 'false');
                }
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to connect wallet.");
        } finally {
            setIsConnecting(false);
        }
    }, []);

    const disconnect = useCallback(() => {
        setAccount(null);
        setWalletType(null);
        setError(null);
        setHasUserDisconnected(true);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('wallet_account');
            localStorage.removeItem('wallet_type');
            localStorage.setItem('wallet_disconnected', 'true');
        }
    }, []);

    // Listen for account changes (only after initialization)
    useEffect(() => {
        if (!isInitialized) return;

        if (typeof window !== 'undefined') {
            // MetaMask event listeners
            if (window.ethereum) {
                const handleAccountsChanged = (accounts: string[]) => {
                    // Add a small delay to avoid rapid disconnects from MetaMask
                    setTimeout(() => {
                        if (accounts && Array.isArray(accounts) && accounts.length > 0 && accounts[0]) {
                            setAccount(accounts[0]);
                            setWalletType('metamask');
                            if (typeof window !== 'undefined') {
                                localStorage.setItem('wallet_account', accounts[0]);
                                localStorage.setItem('wallet_type', 'metamask');
                            }
                        } else {
                            setAccount(null);
                            setWalletType(null);
                            if (typeof window !== 'undefined') {
                                localStorage.removeItem('wallet_account');
                                localStorage.removeItem('wallet_type');
                            }
                        }
                    }, 100);
                };

                const handleChainChanged = (chainId: string) => {
                    // Don't reload on chain change, just log it
                };

                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);

                // Check if already connected to MetaMask (only if user hasn't manually disconnected)
                if (!hasUserDisconnected && walletType === 'metamask') {
                    window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
                        if (accounts && accounts.length > 0 && accounts[0]) {
                            setAccount(accounts[0]);
                            setWalletType('metamask');
                            if (typeof window !== 'undefined') {
                                localStorage.setItem('wallet_account', accounts[0]);
                                localStorage.setItem('wallet_type', 'metamask');
                            }
                        }
                    }).catch((err: any) => {
                        // Silently handle errors during initial check
                    });
                }
            }

            // Phantom event listeners
            if (window.solana && window.solana.isPhantom) {
                const handlePhantomDisconnect = () => {
                    setAccount(null);
                    setWalletType(null);
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('wallet_account');
                        localStorage.removeItem('wallet_type');
                    }
                };

                window.solana.on('disconnect', handlePhantomDisconnect);

                // Check if already connected to Phantom (only if user hasn't manually disconnected)
                if (!hasUserDisconnected && walletType === 'phantom') {
                    try {
                        if (window.solana.isConnected) {
                            const publicKey = window.solana.publicKey.toString();
                            setAccount(publicKey);
                            setWalletType('phantom');
                            if (typeof window !== 'undefined') {
                                localStorage.setItem('wallet_account', publicKey);
                                localStorage.setItem('wallet_type', 'phantom');
                            }
                        }
                    } catch (err) {
                        // Silently handle errors during initial check
                    }
                }
            }

            return () => {
                // Cleanup listeners
                if (window.ethereum) {
                    // Note: We can't easily remove listeners here without storing references
                    // This is a limitation of the current implementation
                }
                if (window.solana && window.solana.isPhantom) {
                    // Same limitation for Phantom
                }
            };
        }
    }, [isInitialized, hasUserDisconnected, walletType]);

    return { account, walletType, isConnecting, error, connect, disconnect };
};
