import React, { useState } from "react";
import Image from "next/image";
import { useWallet } from "@/hooks/useWallet";
import WalletModal from "./WalletModal";

const Collection = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const { account } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [mintStatus, setMintStatus] = useState<
    Record<string, "idle" | "minting" | "success">
  >({});

  const collections = [
    {
      id: "c1",
      name: "BEASTIE BOYS",
      type: "LEGENDARY • ICON",
      category: "GENESIS",
      price: "2.5 ETH",
      usd: "$4,750",
      image: "/cityscape/beastie-boys.jpeg",
      featured: true,
    },
    {
      id: "c2",
      name: "THE BEATLES",
      type: "LEGENDARY • ICON",
      category: "GENESIS",
      price: "3.0 ETH",
      usd: "$5,700",
      image: "/cityscape/Beatles - London - CityscAPE.png",
    },
    {
      id: "c3",
      name: "CELEBRATION",
      type: "EPIC • PERFORMANCE",
      category: "ELITE",
      price: "1.8 ETH",
      usd: "$3,420",
      image: "/cityscape/celebratie.jpeg",
    },
    {
      id: "c4",
      name: "JOHNNY CASH",
      type: "LEGENDARY • ICON",
      category: "GENESIS",
      price: "2.2 ETH",
      usd: "$4,185",
      image: "/cityscape/Johnny Cash - Nashville, TN.jpeg",
    },
    {
      id: "c5",
      name: "MICHAEL JACKSON",
      type: "LEGENDARY • ICON",
      category: "GENESIS",
      price: "4.0 ETH",
      usd: "$7,600",
      image: "/cityscape/Michael Jackson - Neverland Ranch - CityscAPE.jpeg",
    },
    {
      id: "c6",
      name: "NOTORIOUS B.I.G.",
      type: "LEGENDARY • ICON",
      category: "GENESIS",
      price: "2.8 ETH",
      usd: "$5,325",
      image: "/cityscape/Notorious BIG - Brooklyn, NY.png",
    },
    {
      id: "c7",
      name: "ON STAGE",
      type: "EPIC • PERFORMANCE",
      category: "ELITE",
      price: "1.5 ETH",
      usd: "$2,850",
      image: "/cityscape/on-stage.jpeg",
    },
    {
      id: "c8",
      name: "ON THE ROOF",
      type: "RARE • URBAN",
      category: "ELITE",
      price: "1.2 ETH",
      usd: "$2,280",
      image: "/cityscape/ontheroof.jpeg",
    },
    {
      id: "c9",
      name: "PRINCE",
      type: "LEGENDARY • ICON",
      category: "GENESIS",
      price: "3.5 ETH",
      usd: "$6,650",
      image: "/cityscape/Prince - Minneapolis - CityscAPE.jpeg",
    },
    {
      id: "c10",
      name: "STEVEN TYLER",
      type: "LEGENDARY • ICON",
      category: "GENESIS",
      price: "2.0 ETH",
      usd: "$3,800",
      image: "/cityscape/Steven Tyler - Boston.jpeg",
    },
    {
      id: "c11",
      name: "GRATEFUL DEAD",
      type: "LEGENDARY • ICON",
      category: "GENESIS",
      price: "2.5 ETH",
      usd: "$4,750",
      image: "/cityscape/The Greatful Dead - San Fransisco, CA.jpeg",
    },
  ];

  const handleMint = async (id: string) => {
    if (!account) {
      setIsWalletModalOpen(true);
      return;
    }

    if (mintStatus[id] === "minting" || mintStatus[id] === "success") return;

    setMintStatus((prev) => ({ ...prev, [id]: "minting" }));

    // Simulate minting
    setTimeout(() => {
      setMintStatus((prev) => ({ ...prev, [id]: "success" }));
      setTimeout(() => {
        setMintStatus((prev) => ({ ...prev, [id]: "idle" }));
      }, 3000);
    }, 2000);
  };

  const filteredCollections =
    activeFilter === "ALL"
      ? collections
      : collections.filter((item) => item.category === activeFilter);

  const filters = ["ALL", "GENESIS", "ELITE"];

  return (
    <section
      className="new-collection-section animate-fade-in delay-2"
      id="collection"
    >
      <div className="section-header">
        <h2 className="section-title">THE COLLECTION</h2>
        <div className="collection-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="new-collection-grid">
        {filteredCollections.map((item, idx) =>
          item.featured ? (
            <div
              key={idx}
              className="featured-collection-card animate-slide-up"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={800}
                className="featured-collection-image"
              />
              <div className="featured-badge">FEATURED</div>
              <div className="featured-collection-overlay">
                <div className="featured-content-wrapper">
                  <div className="featured-title-section">
                    <h3 className="featured-collection-title-new">
                      {item.name}
                      <sup className="tm-symbol">™</sup>
                    </h3>
                  </div>
                  <div className="featured-action-section">
                    <button
                      className="featured-mint-btn"
                      onClick={() => handleMint(item.id)}
                    >
                      <span className="mint-arrow">
                        {mintStatus[item.id] === "minting"
                          ? "⟳"
                          : mintStatus[item.id] === "success"
                            ? "✓"
                            : "↗"}
                      </span>
                    </button>
                    <div className="featured-mint-info">
                      <span className="mint-label">
                        {mintStatus[item.id] === "success"
                          ? "SUCCESS"
                          : "MINT NOW"}
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
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={500}
                  className="collection-product-image"
                />
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
                    className={`quick-buy-btn ${mintStatus[item.id] === "success" ? "success" : ""}`}
                    onClick={() => handleMint(item.id)}
                  >
                    {mintStatus[item.id] === "minting"
                      ? "..."
                      : mintStatus[item.id] === "success"
                        ? "OWNED"
                        : "MINT"}
                  </button>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </section>
  );
};

export default Collection;
