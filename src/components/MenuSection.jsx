import { useState, useEffect } from 'react';
import { defaultCategories, defaultMenuItems } from '../data/defaultData.js';

export default function MenuSection() {
  const [filter, setFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, itemRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/menu'),
        ]);

        if (catRes.ok && itemRes.ok) {
          const catData = await catRes.json();
          const itemData = await itemRes.json();
          if (Array.isArray(catData) && catData.length > 0) {
            setCategories(catData);
          } else {
            setCategories(defaultCategories);
          }
          if (Array.isArray(itemData) && itemData.length > 0) {
            setMenuItems(itemData);
          } else {
            setMenuItems(defaultMenuItems);
          }
        } else {
          setCategories(defaultCategories);
          setMenuItems(defaultMenuItems);
        }
      } catch (err) {
        console.warn('Using fallback local menu data:', err);
        setCategories(defaultCategories);
        setMenuItems(defaultMenuItems);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const availableCategories = [
    { id: 'all', label: 'All Items', icon: '✨' },
    ...categories.map((cat) => ({
      id: cat.slug,
      label: `${cat.icon ? cat.icon + ' ' : ''}${cat.name}`,
    })),
  ];

  const sectionCategorySlugs = categories.map((cat) => cat.slug);
  const filteredItems = filter === 'all'
    ? sectionCategorySlugs.map((slug) => menuItems.find((item) => item.category === slug)).filter(Boolean)
    : menuItems.filter((item) => item.category === filter);

  return (
    <section className="section section-bg-main" id="menu">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-heading">
              <h1>Our Menu</h1>
              <h2>Handcrafted Selection of Sea-Side Delights</h2>
            </div>
            <p style={{ color: 'var(--theme-muted)' }}>
              Explore our complete menu prepared with authentic spices, fresh ingredients, and artisanal care.
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-12">
            <div className="menu-filter-nav" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {availableCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`menu-filter-btn ${filter === cat.id ? 'active' : ''}`}
                  onClick={() => setFilter(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="sr-only">Loading menu...</span>
            </div>
          </div>
        ) : (
          <div className="row" id="menu-grid">
            {filteredItems.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p style={{ color: 'var(--theme-muted)', fontSize: '18px' }}>No items found in this category.</p>
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div key={item._id || idx} className="col-lg-4 col-md-6 mb-4 menu-grid-item">
                  <div className="menu-dish-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="dish-img-container">
                        <span className="dish-price-tag">
                          {item.discountedPrice ? (
                            <>
                              <span>{item.discountedPrice}</span>
                              <del style={{ fontSize: '11px', opacity: 0.7, marginLeft: '6px' }}>{item.price}</del>
                            </>
                          ) : (
                            item.price
                          )}
                        </span>
                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                      </div>
                      <div className="dish-details" style={{ padding: '20px' }}>
                        <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h4>
                        <p style={{ color: 'var(--theme-muted)', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                    <div style={{ padding: '0 20px 20px 20px' }}>
                      <a
                        href={`https://wa.me/918980059595?text=Hello%20Kafe%20Affair%2C%20I%20want%20to%20order%20${encodeURIComponent(item.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dish-order-btn"
                        style={{ width: '100%', textAlign: 'center', display: 'block' }}
                      >
                        Order via WhatsApp <i className="fa fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
