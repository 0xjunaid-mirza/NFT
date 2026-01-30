import React, { useState } from 'react';
import Image from 'next/image';
import { useWallet } from '@/hooks/useWallet';
import WalletModal from './WalletModal';

const Collection = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const { account } = useWallet();
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [mintStatus, setMintStatus] = useState<Record<string, 'idle' | 'minting' | 'success'>>({});

    const collections = [
        { id: 'c1', name: 'AURORA LEGENDS', type: 'CORE • GENESIS', category: 'GENESIS', price: '0.45 ETH', usd: '$862.20', image: 'aurora-silver.png', featured: true },
        { id: 'c2', name: 'GLACIER GHOST', type: 'CORE • RARE', category: 'ELITE', price: '0.22 ETH', usd: '$421.50', image: 'glacier-white.png' },
        { id: 'c3', name: 'STEALTH OPS', type: 'CORE • EPIC', category: 'ELITE', price: '0.35 ETH', usd: '$670.60', image: 'stealth-black.png' },
        { id: 'c4', name: 'POLAR PULSE', type: 'CORE • RARE', category: 'ELITE', price: '0.18 ETH', usd: '$344.90', image: 'polar-gloss.png' },
        { id: 'c5', name: 'VOID SHADOW', type: 'CORE • EPIC', category: 'GENESIS', price: '0.55 ETH', usd: '$980.10', image: 'stealth-black.png' },
        { id: 'c6', name: 'ARCTIC STORM', type: 'CORE • RARE', category: 'ELITE', price: '0.28 ETH', usd: '$510.30', image: 'polar-white.png' }
    ];

    const handleMint = async (id: string) => {
        if (!account) {
            setIsWalletModalOpen(true);
            return;
        }

        if (mintStatus[id] === 'minting' || mintStatus[id] === 'success') return;

        setMintStatus(prev => ({ ...prev, [id]: 'minting' }));

        // Simulate minting
        setTimeout(() => {
            setMintStatus(prev => ({ ...prev, [id]: 'success' }));
            setTimeout(() => {
                setMintStatus(prev => ({ ...prev, [id]: 'idle' }));
            }, 3000);
        }, 2000);
    };

    const filteredCollections = activeFilter === 'ALL'
        ? collections
        : collections.filter(item => item.category === activeFilter);

    const filters = ['ALL', 'GENESIS', 'ELITE'];

    return (
        <section className="new-collection-section animate-fade-in delay-2" id="collection">
            <div className="section-header">
                <h2 className="section-title">THE COLLECTION</h2>
                <div className="collection-filters">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="new-collection-grid">
                {filteredCollections.map((item, idx) => (
                    item.featured ? (
                        <div key={idx} className="featured-collection-card animate-slide-up">
                            <Image src={`/images/${item.image}`} alt={item.name} width={600} height={800} className="featured-collection-image" />
                            <div className="featured-badge">FEATURED</div>
                            <div className="featured-collection-overlay">
                                <div className="featured-content-wrapper">
                                    <div className="featured-title-section">
                                        <h3 className="featured-collection-title-new">{item.name}<sup className="tm-symbol">™</sup></h3>
                                    </div>
                                    <div className="featured-action-section">
                                        <button
                                            className="featured-mint-btn"
                                            onClick={() => handleMint(item.id)}
                                        >
                                            <span className="mint-arrow">
                                                {mintStatus[item.id] === 'minting' ? '⟳' : mintStatus[item.id] === 'success' ? '✓' : '↗'}
                                            </span>
                                        </button>
                                        <div className="featured-mint-info">
                                            <span className="mint-label">
                                                {mintStatus[item.id] === 'success' ? 'SUCCESS' : 'MINT NOW'}
                                            </span>
                                            <span className="mint-price">{item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={idx} className="collection-product-card animate-slide-up">
                            <div className="nft-image-wrapper">
                                <Image src={`/images/${item.image}`} alt={item.name} width={400} height={500} className="collection-product-image" />
                                <div className="nft-rank">STASIS</div>
                            </div>
                            <div className="collection-product-info">
                                <h4 className="collection-product-name">{item.name}</h4>
                                <p className="collection-product-type">{item.type}</p>
                                <div className="nft-pricing">
                                    <div className="current-price">
                                        <span className="price-eth">{item.price}</span>
                                        <span className="price-usd">{item.usd}</span>
                                    </div>
                                    <button
                                        className={`quick-buy-btn ${mintStatus[item.id] === 'success' ? 'success' : ''}`}
                                        onClick={() => handleMint(item.id)}
                                    >
                                        {mintStatus[item.id] === 'minting' ? '...' : mintStatus[item.id] === 'success' ? 'OWNED' : 'MINT'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>

            <WalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
            />
        </section>
    );
};

export default Collection;
