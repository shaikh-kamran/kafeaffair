import React from 'react';

export default function ReservationSection() {
  return (
    <section className="section section-bg-accent" id="reservation">
      <div className="container">
        <div className="row mb-5 text-center">
          <div className="col-lg-8 offset-lg-2">
            <div className="section-heading mb-3">
              <h1>Contact Us</h1>
              <h2>Visit Us or Connect With Us</h2>
            </div>
            <p style={{ color: 'var(--theme-muted)', fontSize: '16px' }}>
              Whether you’re planning a cozy meet-up, a quick Tea break, or a special sea-side celebration, we’d love to welcome you.
            </p>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="contact-info-card h-100">
              <div className="icon-box mx-auto">
                <i className="fa fa-map-marker"></i>
              </div>
              <h4>Sea View Location</h4>
              <p>Coastal View Road, Daman, India 396210</p>
              <a
                href="https://maps.google.com/?q=Daman"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: '12px', fontWeight: 600 }}
              >
                Get Directions <i className="fa fa-external-link"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="contact-info-card h-100">
              <div className="icon-box mx-auto">
                <i className="fa fa-phone"></i>
              </div>
              <h4>Phone & Social</h4>
              <p>
                <a href="tel:+918980059595">+91-8980059595</a> &nbsp;•&nbsp; <a href="tel:+919898585915">+91-9898585915</a>
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '12px' }}>
                <a
                  href="https://wa.me/918980059595?text=Hello%20Kafe%20Affair"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#25D366', fontWeight: 600, display: 'inline-block' }}
                >
                  <i className="fa fa-whatsapp"></i> Chat on WhatsApp
                </a>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                <a
                  href="https://www.instagram.com/kafeaffair_daman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#e6683c', fontWeight: 600, display: 'inline-block' }}
                >
                  <i className="fa fa-instagram"></i> Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 mb-4">
            <div className="contact-info-card h-100">
              <div className="icon-box mx-auto">
                <i className="fa fa-clock-o"></i>
              </div>
              <h4>Opening Hours</h4>
              <p>Monday – Sunday: 12:00 PM – 12:00 AM</p>
              <p style={{ marginTop: '6px', fontSize: '13px' }}>
                Email: <a href="mailto:kafeaffair26@gmail.com">kafeaffair26@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
