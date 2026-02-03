"use client";

import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";

export interface WalletState {
    account: string | null;
    isConnecting: boolean;
    error: string | null;
    connect: () => Promise<void>;
    disconnect: () => void;
}

declare global {
    interface Window {
        ethereum?: any;
    }
}

export const useWallet = (): WalletState => {
    const [account, setAccount] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasUserDisconnected, setHasUserDisconnected] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage after component mounts (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedAccount = localStorage.getItem('wallet_account');
            const savedDisconnected = localStorage.getItem('wallet_disconnected') === 'true';

            if (savedAccount && !savedDisconnected) {
                setAccount(savedAccount);
            }
            setHasUserDisconnected(savedDisconnected);
            setIsInitialized(true);
        }
    }, []);

    const connect = useCallback(async () => {
        if (typeof window === 'undefined' || !window.ethereum) {
            setError("MetaMask is not installed. Please install it to connect.");
            return;
        }

        setIsConnecting(true);
        setError(null);

        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts && accounts.length > 0 && accounts[0]) {
                setAccount(accounts[0]);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('wallet_account', accounts[0]);
                    setHasUserDisconnected(false);
                    localStorage.setItem('wallet_disconnected', 'false');
                }
            } else {
                setError("No accounts found.");
                setAccount(null);
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
        setError(null);
        setHasUserDisconnected(true);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('wallet_account');
            localStorage.setItem('wallet_disconnected', 'true');
        }
    }, []);

    // Listen for account changes (only after initialization)
    useEffect(() => {
        if (!isInitialized) return;

        if (typeof window !== 'undefined' && window.ethereum) {
            const handleAccountsChanged = (accounts: string[]) => {
                // Add a small delay to avoid rapid disconnects from MetaMask
                setTimeout(() => {
                    if (accounts && Array.isArray(accounts) && accounts.length > 0 && accounts[0]) {
                        setAccount(accounts[0]);
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('wallet_account', accounts[0]);
                        }
                    } else {
                        setAccount(null);
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('wallet_account');
                        }
                    }
                }, 100);
            };

            // Listen for chain changes
            const handleChainChanged = (chainId: string) => {
                // Don't reload on chain change, just log it
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            // Check if already connected (only if user hasn't manually disconnected)
            if (!hasUserDisconnected) {
                window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
                    if (accounts && accounts.length > 0 && accounts[0]) {
                        setAccount(accounts[0]);
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('wallet_account', accounts[0]);
                        }
                    }
                }).catch((err: any) => {
                    // Silently handle errors during initial check
                });
            }

            return () => {
                if (window.ethereum) {
                    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                    window.ethereum.removeListener('chainChanged', handleChainChanged);
                }
            };
        }
    }, [isInitialized, hasUserDisconnected]);

    return { account, isConnecting, error, connect, disconnect };
};
