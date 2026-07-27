import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0d0d0f', borderTop: '1px solid var(--theme-border)', padding: '40px 0' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-xs-12 text-center text-lg-left mb-3 mb-lg-0">
            <ul className="social-icons" style={{ display: 'flex', gap: '15px', padding: 0, margin: 0, listStyle: 'none', justifyContent: 'center' }}>
              <li>
                <a href="https://www.instagram.com/kafeaffair_daman/#" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--theme-muted)' }}>
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/kafeaffair" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--theme-muted)' }}>
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 text-center my-3 my-lg-0">
            <Link to="/">
              <img className="logoimage" src="/assets/logo.png" alt="Kafe Affair Logo" style={{ maxHeight: '45px' }} />
            </Link>
          </div>
          <div className="col-lg-4 col-xs-12 text-center text-lg-right">
            <p style={{ margin: 0, color: 'var(--theme-muted)', fontSize: '13px' }}>
              © Copyright Kafe Affair Co. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
