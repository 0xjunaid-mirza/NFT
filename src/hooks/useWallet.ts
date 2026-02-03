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

    const connect = useCallback(async () => {
        if (!window.ethereum) {
            setError("MetaMask is not installed. Please install it to connect.");
            return;
        }

        setIsConnecting(true);
        setError(null);

        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts.length > 0) {
                setAccount(accounts[0]);
            } else {
                setError("No accounts found.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to connect wallet.");
        } finally {
            setIsConnecting(false);
        }
    const disconnect = useCallback(() => {
        setAccount(null);
        setError(null);
    }, []);

    // Auto-connect if already authorized
    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }
                } catch (err) {
                    console.error("Error checking connection:", err);
                }
            }
        };
        checkConnection();
    }, []);

    // Listen for account changes
    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    setAccount(null);
                }
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, []);

    return { account, isConnecting, error, connect, disconnect };
};
