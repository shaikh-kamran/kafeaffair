import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead.jsx';

export default function NotFound() {
  return (
    <>
      <SeoHead title="404 - Page Not Found | Kafe Affair" description="Page not found on Kafe Affair." />
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 20px 60px 20px',
        }}
      >
        <h1 style={{ fontSize: '72px', fontWeight: 800, color: 'var(--theme-accent)', marginBottom: '10px' }}>404</h1>
        <h2 style={{ fontSize: '28px', color: 'var(--theme-dark)', marginBottom: '15px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--theme-muted)', maxWidth: '480px', marginBottom: '30px' }}>
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="main-white-button">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </>
  );
}
