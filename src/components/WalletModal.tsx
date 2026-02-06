"use client";

import React from 'react';
import Modal from './Modal';
import { useWallet } from '@/hooks/useWallet';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
    const { account, walletType, connect, disconnect } = useWallet();

    const formatAddress = (addr: string) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const handleConnect = async (walletType: string) => {
        try {
            await connect(walletType);
            onClose();
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
                            <img
                                src={walletType === 'phantom'
                                    ? "https://phantom.app/img/phantom-logo.svg"
                                    : "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                                }
                                alt={walletType === 'phantom' ? "Phantom" : "MetaMask"}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className="connected-wallet-details">
                            <span className="wallet-name">{walletType === 'phantom' ? 'PHANTOM' : 'METAMASK'}</span>
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
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" width={40} height={40} />
                        </div>
                        <span className="wallet-name">METAMASK</span>
                    </button>

                    <button className="wallet-option-btn" onClick={() => handleConnect('phantom')}>
                        <div className="wallet-icon-wrapper">
                            <img src="https://phantom.app/img/phantom-logo.svg" alt="Phantom" width={40} height={40} />
                        </div>
                        <span className="wallet-name">PHANTOM</span>
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
