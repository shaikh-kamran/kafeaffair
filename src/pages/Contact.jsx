import React from 'react';
import SeoHead from '../components/SeoHead.jsx';

export default function Contact() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Kafe Affair',
    url: 'https://kafeaffair.in/contact',
    image: 'https://kafeaffair.in/assets/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sea View, Daman',
      addressLocality: 'Daman',
      addressCountry: 'India',
    },
    telephone: '+918980059595',
    email: 'kafeaffair26@gmail.com',
  };

  return (
    <>
      <SeoHead
        title="Contact Kafe Affair - Daman | Phone, Email & Location"
        description="Contact Kafe Affair - Get in touch with our friendly team at our Daman location. Visit us, call us, or send us an email."
        keywords="contact cafe, Kafe Affair contact, Daman cafe location, cafe phone number"
        canonical="https://kafeaffair.in/contact"
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
          <span className="section-badge">GET IN TOUCH</span>
          <h1 style={{ fontSize: '42px', fontWeight: 800, marginTop: '10px', marginBottom: '15px', color: 'var(--theme-dark)' }}>
            Contact Kafe Affair
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--theme-muted)' }}>
            We would love to serve you. Visit our sea-view location or drop us a message!
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '90px' }}>
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div
              style={{
                background: 'var(--theme-bg-card)',
                border: '1px solid var(--theme-border)',
                borderRadius: '20px',
                padding: '32px',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(240,87,35,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--theme-accent)',
                  fontSize: '20px',
                  marginBottom: '20px',
                }}
              >
                <i className="fa fa-map-marker"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--theme-dark)', marginBottom: '10px' }}>Our Location</h3>
              <p style={{ color: 'var(--theme-muted)', marginBottom: 0 }}>Sea View Coastal Area, Daman, India 396210</p>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div
              style={{
                background: 'var(--theme-bg-card)',
                border: '1px solid var(--theme-border)',
                borderRadius: '20px',
                padding: '32px',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(240,87,35,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--theme-accent)',
                  fontSize: '20px',
                  marginBottom: '20px',
                }}
              >
                <i className="fa fa-phone"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--theme-dark)', marginBottom: '10px' }}>
                Phone & Reservations
              </h3>
              <p style={{ color: 'var(--theme-muted)', marginBottom: '6px' }}>
                <a href="tel:+918980059595" style={{ color: 'var(--theme-dark)' }}>
                  +91-8980059595
                </a>
              </p>
              <p style={{ color: 'var(--theme-muted)', marginBottom: 0 }}>
                <a href="tel:+919898585915" style={{ color: 'var(--theme-dark)' }}>
                  +91-9898585915
                </a>
              </p>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <div
              style={{
                background: 'var(--theme-bg-card)',
                border: '1px solid var(--theme-border)',
                borderRadius: '20px',
                padding: '32px',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(240,87,35,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--theme-accent)',
                  fontSize: '20px',
                  marginBottom: '20px',
                }}
              >
                <i className="fa fa-envelope"></i>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--theme-dark)', marginBottom: '10px' }}>Email Us</h3>
              <p style={{ color: 'var(--theme-muted)', marginBottom: 0 }}>
                <a href="mailto:kafeaffair26@gmail.com" style={{ color: 'var(--theme-dark)' }}>
                  kafeaffair26@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
