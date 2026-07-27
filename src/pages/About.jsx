import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead.jsx';

export default function About() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Kafe Affair',
    description: 'A cozy sea-facing cafe offering quality Tea and delicious food in Daman',
    url: 'https://kafeaffair.in/about',
    image: 'https://kafeaffair.in/assets/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sea View, Daman',
      addressLocality: 'Daman',
      addressCountry: 'India',
    },
    foundingDate: '2020',
  };

  return (
    <>
      <SeoHead
        title="About Kafe Affair - Quality Tea & Cafe Experience in Daman"
        description="Learn about Kafe Affair - a sea-facing cafe in Daman dedicated to quality Tea, delicious food, and creating memorable experiences."
        keywords="Kafe Affair, about cafe, Tea culture, Daman cafe, quality Tea"
        canonical="https://kafeaffair.in/about"
        jsonLd={jsonLd}
      />

      <div
        style={{
          paddingTop: '150px',
          paddingBottom: '60px',
          background: 'linear-gradient(180deg, rgba(18,18,20,0.9) 0%, rgba(24,24,27,1) 100%)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span className="section-badge">OUR STORY</span>
          <h1 style={{ fontSize: '42px', fontWeight: 800, marginTop: '10px', marginBottom: '15px', color: 'var(--theme-dark)' }}>
            About Kafe Affair
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--theme-muted)' }}>
            Crafting delicious food, specialty Tea, and unforgettable sea-facing memories in Daman.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '90px' }}>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div
              style={{
                background: 'var(--theme-bg-card)',
                border: '1px solid var(--theme-border)',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--theme-dark)', marginBottom: '20px' }}>
                A Place for Tea & Ocean Views
              </h2>
              <p style={{ color: 'var(--theme-muted)', marginBottom: '20px', lineHeight: 1.8 }}>
                Kafe Affair was founded with a simple vision — to create a warm, cozy sanctuary where people can enjoy quality Tea,
                mouth-watering gourmet bites, and meaningful conversations.
              </p>
              <p style={{ color: 'var(--theme-muted)', marginBottom: '20px', lineHeight: 1.8 }}>
                Situated right along the serene coastline of Daman, every detail of our café is curated to evoke comfort. From artisanal
                tea leaves to freshly toasted wraps and wood-fired style pizzas, every dish tells a story of passion.
              </p>
              <div className="main-white-button">
                <Link to="/contact">Visit Us Today</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--theme-border)' }}>
              <img src="/images/interior.png" alt="Kafe Affair Interior Ambiance" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
