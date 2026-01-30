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
    const { connect } = useWallet();

    const handleConnect = async (walletType: string) => {
        if (walletType === 'metamask') {
            await connect();
            onClose();
        } else {
            alert("Coming Soon!");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="CONNECT WALLET">
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
        </Modal>
    );
};

export default WalletModal;
