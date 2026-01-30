"use client";

import React from 'react';

const Roadmap = () => {
    const phases = [
        {
            phase: 'PHASE 01',
            title: 'FOUNDATION MK.I',
            items: ['Launch of the Artic 01 Collection', 'Community building & Discord launch', 'Initial whitelist distribution']
        },
        {
            phase: 'PHASE 02',
            title: 'EVOLUTION MK.II',
            items: ['Secondary marketplace integration', 'Exclusive merchandise drop for holders', 'Collaborations with winter sport brands']
        },
        {
            phase: 'PHASE 03',
            title: 'INTERACTIVE HUB',
            items: ['Release of the STASIS VR experience', 'Governance token distribution', 'Metaverse avatar integration']
        },
        {
            phase: 'PHASE 04',
            title: 'HORIZON EXPANSION',
            items: ['Global community meetups', 'Partnerships with environmental groups', 'Phase 2 collection reveal']
        }
    ];

    return (
        <section className="roadmap-section animate-fade-in delay-3" id="roadmap">
            <div className="section-header">
                <h2 className="section-title">PROJECT ROADMAP</h2>
                <div className="section-subtitle">OUR FUTURE MILESTONES</div>
            </div>
            <div className="roadmap-container">
                {phases.map((item, idx) => (
                    <div key={idx} className={`roadmap-item animate-on-scroll delay-${idx + 1}`}>
                        <div className="roadmap-phase">{item.phase}</div>
                        <div className="roadmap-card">
                            <h3 className="roadmap-title">{item.title}</h3>
                            <ul className="roadmap-list">
                                {item.items.map((li, i) => (
                                    <li key={i}>{li}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Roadmap;
