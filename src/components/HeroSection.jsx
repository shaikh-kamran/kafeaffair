import React from 'react';

export default function HeroSection() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="top" className="parallax-container" data-parallax-speed="0.12">
      <div className="hero-overlay-content">
        <span className="section-badge">
          <i className="fa fa-leaf"></i> Coastal Elegance & Ocean Views
        </span>
        <h1 className="hero-title">Kafe Affair</h1>
        <p className="hero-subtitle">
          Best Sea View Cafe in Daman • Artisanal Tea & Gourmet Delights
        </p>
        <div className="hero-actions">
          <div className="main-white-button">
            <a
              href="#reservation"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('reservation');
              }}
            >
              <i className="fa fa-calendar-check-o"></i> Make A Reservation
            </a>
          </div>
          <a
            href="https://wa.me/918980059595?text=Hello%20Kafe%20Affair%2C%20I%20would%20like%20to%20reserve%20a%20table%20or%20inquire"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <i className="fa fa-whatsapp"></i> Chat on WhatsApp (8980059595)
          </a>
          <a
            href="https://www.instagram.com/kafeaffair_daman/"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-btn"
          >
            <i className="fa fa-instagram"></i> Follow on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
