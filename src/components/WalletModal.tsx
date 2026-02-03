"use client";

import React from 'react';
import Modal from './Modal';
import { useWallet } from '@/hooks/useWallet';
import Image from 'next/image';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
    const { account, connect, disconnect } = useWallet();

    const formatAddress = (addr: string) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const handleConnect = async (walletType: string) => {
        try {
            if (walletType === 'metamask') {
                await connect();
                // Small delay to ensure state updates
                setTimeout(() => {
                    onClose();
                }, 100);
            } else {
                alert("Coming Soon!");
            }
        } catch (error) {
            console.error("Connection error:", error);
        }
    };

    const handleDisconnect = () => {
        disconnect();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={account ? "WALLET CONNECTED" : "CONNECT WALLET"}>
            {account ? (
                <div className="connected-wallet-info">
                    <div className="wallet-connected-header">
                        <div className="wallet-icon-wrapper">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" width={40} height={40} />
                        </div>
                        <div className="connected-wallet-details">
                            <span className="wallet-name">METAMASK</span>
                            <span className="wallet-address">{formatAddress(account)}</span>
                        </div>
                    </div>
                    <div className="wallet-actions">
                        <button className="wallet-option-btn disconnect-btn" onClick={handleDisconnect}>
                            <span className="wallet-name">DISCONNECT</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="wallet-options-grid">
                    <button className="wallet-option-btn" onClick={() => handleConnect('metamask')}>
                        <div className="wallet-icon-wrapper">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" width={40} height={40} />
                        </div>
                        <span className="wallet-name">METAMASK</span>
                    </button>

                    <button className="wallet-option-btn" onClick={() => handleConnect('phantom')}>
                        <div className="wallet-icon-wrapper">
                            {/* Placeholder for Phantom icon */}
                            <div className="placeholder-icon">P</div>
                        </div>
                        <span className="wallet-name">PHANTOM</span>
                        <span className="wallet-badge">SOON</span>
                    </button>

                    <button className="wallet-option-btn" onClick={() => handleConnect('walletconnect')}>
                        <div className="wallet-icon-wrapper">
                            <div className="placeholder-icon">WC</div>
                        </div>
                        <span className="wallet-name">WALLET CONNECT</span>
                        <span className="wallet-badge">SOON</span>
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default WalletModal;
