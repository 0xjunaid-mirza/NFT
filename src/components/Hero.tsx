import React, { useState } from "react";
import Image from "next/image";
import { useWallet } from "@/hooks/useWallet";
import WalletModal from "./WalletModal";

const Hero = () => {
  // Mock Data for 7 NFTs
  const nftData = [
    {
      id: "01",
      name: "BEASTIE BOYS",
      trait: "BROOKLYN_ICON",
      number: "001",
      price: "2.5 ETH",
      image: "/cityscape/beastie-boys.jpeg",
    },
    {
      id: "02",
      name: "THE BEATLES",
      trait: "LONDON_LEGEND",
      number: "002",
      price: "3.0 ETH",
      image: "/cityscape/Beatles - London - CityscAPE.png",
    },
    {
      id: "03",
      name: "MICHAEL JACKSON",
      trait: "KING_OF_POP",
      number: "003",
      price: "4.0 ETH",
      image: "/cityscape/Michael Jackson - Neverland Ranch - CityscAPE.jpeg",
    },
    {
      id: "04",
      name: "PRINCE",
      trait: "MINNEAPOLIS_ICON",
      number: "004",
      price: "3.5 ETH",
      image: "/cityscape/Prince - Minneapolis - CityscAPE.jpeg",
    },
    {
      id: "05",
      name: "NOTORIOUS B.I.G.",
      trait: "BROOKLYN_LEGEND",
      number: "005",
      price: "2.8 ETH",
      image: "/cityscape/Notorious BIG - Brooklyn, NY.png",
    },
    {
      id: "06",
      name: "JOHNNY CASH",
      trait: "NASHVILLE_ICON",
      number: "006",
      price: "2.2 ETH",
      image: "/cityscape/Johnny Cash - Nashville, TN.jpeg",
    },
    {
      id: "07",
      name: "STEVEN TYLER",
      trait: "BOSTON_ROCKER",
      number: "007",
      price: "2.0 ETH",
      image: "/cityscape/Steven Tyler - Boston.jpeg",
    },
  ];

  const [queue, setQueue] = useState(nftData);
  const { account } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [mintStatus, setMintStatus] = useState<"idle" | "minting" | "success">(
    "idle",
  );

  // The first item in queue is Active/Selected
  const selectedNft = queue[0];

  // Ensure we always have at least 2 items to show for the carousel logic
  const visibleQueue = queue.slice(0, 2);

  const handleThumbnailClick = (clickedIndex: number) => {
    // If clicking the first item (Active), do nothing
    if (clickedIndex === 0) return;

    // If clicking the second item (Next), rotate the queue
    if (clickedIndex === 1) {
      // Move head to tail
      const newQueue = [...queue.slice(1), queue[0]];
      setQueue(newQueue);
    }
  };

  const handleMintAction = async () => {
    if (!account) {
      setIsWalletModalOpen(true);
      return;
    }

    if (mintStatus === "idle") {
      setMintStatus("minting");
      // Simulate minting delay
      setTimeout(() => {
        setMintStatus("success");
        // Reset after success
        setTimeout(() => setMintStatus("idle"), 3000);
      }, 2000);
    }
  };

  return (
    <section className="hero-section animate-fade-in">
      <div className="hero-meta-section animate-slide-up delay-1">
        <div className="meta-tag">[ SERIES: STASIS MK.I ]</div>
        <div className="meta-tag">[ SERIES ]</div>
      </div>

      <div className="hero-layout">
        {/* Left Side: Product Info */}
        <div className="hero-product-details animate-slide-up delay-2">
          <h1 className="hero-main-display">
            COLLECTION
            <br />
            ARTIC 01<sup>™</sup>
          </h1>

          <div className="selector-group">
            <span className="selector-title">TRAITS</span>
            <div className="selector-options">
              <span
                className="trait-display animate-fade-in"
                key={selectedNft.trait}
              >
                {selectedNft.trait}
              </span>
            </div>
          </div>

          <div className="selector-group">
            <span className="selector-title">NUMBER</span>
            <div className="selector-options">
              <span
                className="number-display animate-fade-in"
                key={selectedNft.number}
              >
                #{selectedNft.number}
              </span>
            </div>
          </div>

          <div className="hero-buy-action">
            <button
              className={`mint-action-btn ${mintStatus === "success" ? "success" : ""}`}
              onClick={handleMintAction}
              disabled={mintStatus !== "idle"}
            >
              <span className="btn-text">
                {mintStatus === "idle"
                  ? "MINT NOW"
                  : mintStatus === "minting"
                    ? "MINTING..."
                    : "SUCCESS"}
              </span>
              <span className="btn-icon">
                {mintStatus === "minting" ? (
                  <span className="loader-spinner">⟳</span>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
            <div className="buy-text">
              <span className="buy-price">{selectedNft.price}</span>
            </div>
          </div>
        </div>

        {/* Center: Character Display */}
        <div className="hero-character-display animate-fade-in delay-3">
          <div className="character-image-box">
            <Image
              src={`/${selectedNft.image}`}
              alt="Featured Product"
              width={500}
              height={700}
              priority
              className="animate-fade-in"
              key={selectedNft.id} // Re-render on change
            />
          </div>
        </div>

        {/* Right: Thumbnails */}
        <div className="hero-thumbnails-panel animate-slide-up delay-4">
          <div className="thumb-list">
            {visibleQueue.map((nft, index) => (
              <div
                key={nft.id}
                className={`thumb-card ${index === 0 ? "active" : ""}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={`/${nft.image}`}
                  alt={nft.name}
                  width={300} /* Request larger image for sharpness */
                  height={400}
                  quality={100}
                />
              </div>
            ))}
          </div>
          {/* Counter showing ID of Active Element */}
          <div className="thumb-counter">
            {selectedNft.id} — {String(nftData.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Socials */}
      <div className="hero-social-links-mobile">
        <a href="#" className="social-box">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png"
            alt="X"
          />
        </a>
        <a href="#" className="social-box">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png"
            alt="Facebook"
          />
        </a>
        <a href="#" className="social-box">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png"
            alt="Instagram"
          />
        </a>
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
