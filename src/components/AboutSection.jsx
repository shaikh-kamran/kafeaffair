import React from 'react';

export default function AboutSection() {
  const showcases = [
    {
      tag: '🍕 SIGNATURE PIZZAS',
      title: 'The Artisan Wood-Fired Crust',
      subtitle: 'Crispy, Cheesy & Flame-Baked',
      img: '/images/pizza/Chick Loaded Chicken Pizza.jpeg',
      desc: 'Hand-stretched sourdough pizza layered with rich makhani sauce, succulent grilled chicken, bell peppers, and melted mozzarella blend.',
    },
    {
      tag: '🍔 CRAFT BURGERS',
      title: 'The Flame-Kissed Gourmet Stack',
      subtitle: 'Juicy Patties & Artisan Buns',
      img: '/images/burger/Ca Signature Non-veg Burger.png',
      desc: 'Flame-grilled tender patties topped with sharp melted cheddar, caramelized sweet onions, crisp lettuce, and signature house drizzle.',
    },
    {
      tag: '🌊 COASTAL AMBIANCE',
      title: 'Ocean View Sea Sanctuary',
      subtitle: 'Serene Waves & Artisanal Brews',
      img: '/images/interior.png',
      desc: 'Experience relaxing coastal vibes in Daman. Pair soothing ocean breezes with our freshly roasted espresso, frappes, and signature bites.',
    },
    {
      tag: '🍟 CRISPY DELIGHTS',
      title: 'Sensational Golden Crunch',
      subtitle: 'Bite-Sized Indulgence',
      img: '/images/popcorn.png',
      desc: 'Tender bite-sized chicken popcorn fried to golden crunchy perfection, tossed in secret coastal spices with house dip sauces.',
    },
  ];

  const highlights = [
    { icon: '⭐', title: '4.7 / 5.0 Rating', desc: 'Loved by 10,000+ Guests' },
    { icon: '🌊', title: 'Sea-Facing View', desc: 'Prime Ocean Frontage' },
    { icon: '🍕', title: '30+ Craft Recipes', desc: 'Fresh & Artisanal' },
    { icon: '🍵', title: 'Specialty Tea', desc: 'Specialty Tea Blends' },
  ];

  return (
    <section className="section section-bg-alt" id="about" style={{ position: 'relative', overflow: 'hidden', padding: '100px 0' }}>
      <div className="container">
        {/* Header Heading */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-8 offset-lg-2 text-center">
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(255, 183, 3, 0.12)',
                color: '#ffb703',
                border: '1px solid rgba(255, 183, 3, 0.3)',
                padding: '6px 18px',
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '1px',
                marginBottom: '15px',
              }}
            >
              ✨ COASTAL GASTRONOMY & SPECIALTY TEA
            </span>
            <h1 style={{ fontSize: '42px', fontWeight: 800, color: 'var(--theme-dark)', marginBottom: '16px' }}>
              Where Ocean Breezes Meet Culinary Artistry
            </h1>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--theme-muted)', maxWidth: '750px', margin: '0 auto' }}>
              Kafe Affair is Daman’s premier sea-view destination. We blend artisanal Tea culture with gourmet recipes,
              creating an unmatched seaside dining experience right along the ocean shoreline.
            </p>
          </div>
        </div>

        {/* Big Product Showcases Grid */}
        <div className="row">
          {showcases.map((item, idx) => (
            <div key={idx} className="col-lg-6 mb-4">
              <div
                className="showcase-card"
                style={{
                  background: 'rgba(24, 24, 28, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  height: '100%',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(255, 183, 3, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 183, 3, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                {/* Big Image Container */}
                <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      zIndex: 2,
                      background: 'rgba(15, 15, 18, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffb703',
                      border: '1px solid rgba(255, 183, 3, 0.4)',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {item.tag}
                  </span>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '80px',
                      background: 'linear-gradient(to top, rgba(24,24,28,1), transparent)',
                    }}
                  ></div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: '#ffb703', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {item.subtitle}
                    </span>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginTop: '6px', marginBottom: '12px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--theme-muted)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Stats Bar */}
        <div
          className="row mt-5"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '30px 15px',
            margin: '40px 0 0 0',
          }}
        >
          {highlights.map((h, i) => (
            <div key={i} className="col-lg-3 col-6 text-center mb-3 mb-lg-0">
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{h.icon}</div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{h.title}</h4>
              <span style={{ color: 'var(--theme-muted)', fontSize: '13px' }}>{h.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
