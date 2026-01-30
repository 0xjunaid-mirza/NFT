"use client";

import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'WHAT IS THE FPRN COLLECTION?',
            answer: "FPRN is a premium NFT collection focused on high-end digital apparel and metaverse-ready character assets, starting with the Artic 01 puffer series."
        },
        {
            question: 'HOW CAN I PURCHASE AN NFT?',
            answer: "You can purchase directly on our minting page using a compatible Web3 wallet like MetaMask, or find us on secondary marketplaces."
        },
        {
            question: 'WHAT ARE THE BENEFITS FOR HOLDERS?',
            answer: "Holders get early access to future drops, exclusive physical merch, and voting rights in the project's direction via the Horizon DAO."
        }
    ];

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section animate-fade-in delay-4" id="faq">
            <div className="section-header">
                <h2 className="section-title">QUESTIONS & ANSWERS</h2>
                <div className="section-subtitle">EVERYTHING YOU NEED TO KNOW</div>
            </div>
            <div className="faq-container">
                {faqs.map((faq, idx) => (
                    <div key={idx} className={`faq-item animate-slide-up delay-${idx + 1} ${activeIndex === idx ? 'active' : ''}`}>
                        <button className="faq-question" onClick={() => toggleFAQ(idx)}>
                            <span>{faq.question}</span>
                            <span className="faq-toggle">{activeIndex === idx ? '-' : '+'}</span>
                        </button>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
