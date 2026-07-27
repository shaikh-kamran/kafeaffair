import React from 'react';
import SeoHead from '../components/SeoHead.jsx';
import HeroSection from '../components/HeroSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import MenuSection from '../components/MenuSection.jsx';
import ReservationSection from '../components/ReservationSection.jsx';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Kafe Affair',
    description:
      'A sea-facing cafe in Daman offering quality Tea, delicious food, pizza, burgers, wraps and ocean view experience',
    image: 'https://kafeaffair.in/assets/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sea View, Daman',
      addressLocality: 'Daman',
      addressRegion: 'Daman and Diu',
      postalCode: '396210',
      addressCountry: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+91-8980059595',
      email: 'info@kafeaffair.com',
    },
    servesCuisine: ['Cafe', 'Fast Food', 'Pizza', 'Burgers'],
    telephone: '+91-8980059595',
    url: 'https://kafeaffair.in',
    priceRange: '₹₹',
  };

  return (
    <>
      <SeoHead
        title="Kafe Affair | Best Cafe in Daman | Pizza, Burgers & Sea View"
        description="Kafe Affair is a sea-facing cafe in Daman offering delicious food, pizza, burgers, wraps, and a relaxing ocean view experience."
        keywords="cafe in Daman, best cafe, pizza, burgers, wraps, sea view cafe, Tea shop, fast food"
        canonical="https://kafeaffair.in/"
        jsonLd={jsonLd}
      />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <ReservationSection />
    </>
  );
}
