"use client";

import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";

export interface WalletState {
    account: string | null;
    isConnecting: boolean;
    error: string | null;
    connect: () => Promise<void>;
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
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);

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
    }, []);

    // Auto-connect if already authorized
    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0].address);
                }
            }
        };
        checkConnection();
    }, []);

    return { account, isConnecting, error, connect };
};
