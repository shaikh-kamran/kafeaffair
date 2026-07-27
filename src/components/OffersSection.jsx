import { useState } from 'react';

export default function OffersSection() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: 'Pizza', icon: '/images/tab-icon-01.png' },
    { id: 2, label: 'Burgers', icon: '/images/tab-icon-02.png' },
    { id: 3, label: 'Wraps', icon: '/images/tab-icon-03.png' },
    { id: 4, label: 'Fried', icon: '/images/tab-icon-03.png' },
    { id: 5, label: 'Keema & Biryani', icon: '/images/tab-icon-03.png' },
  ];

  const tabData = {
    1: [
      {
        title: 'Butter Paneer Pizza',
        img: '/images/pizza/Butter Paneer Pizza.jpeg',
        desc: 'Rich paneer chunks layered with creamy sauce and baked to perfection for a bold flavorful bite.',
      },
      {
        title: 'Exotic Veg Pizza',
        img: '/images/pizza/Exotix Veg Pizza.jpeg',
        desc: 'A colorful mix of fresh vegetables seasoned lightly and topped on a crispy cheesy base.',
      },
      {
        title: 'Namma Chicken Pizza',
        img: '/images/pizza/Namma chicken pizza.jpeg',
        desc: 'Spiced chicken chunks inspired by local flavors baked with melted cheese.',
      },
      {
        title: 'Schezwan Spice Chicken Pizza',
        img: '/images/pizza/Schezwan spice chicken pizza.jpeg',
        desc: 'Fiery schezwan sauce paired with juicy chicken for a spicy punch.',
      },
      {
        title: 'Smokey BBQ Chicken Pizza',
        img: '/images/pizza/Smokey bbq chicken pizza.jpeg',
        desc: 'Smoky barbecue glaze layered over tender chicken and melted cheese.',
      },
      {
        title: 'Margherita Pizza',
        img: '/images/pizza/Margherita pizza.jpeg',
        desc: 'Classic delight with rich mozzarella cheese and signature tomato sauce on a soft crust.',
      },
    ],
    2: [
      {
        title: 'Classic Veg Vibe Burger',
        img: '/images/burger/Classic Veg Vibe Burger.png',
        desc: 'Crispy veg patty layered with fresh lettuce and signature house sauce.',
      },
      {
        title: 'Cruncho Paneer King Burger',
        img: '/images/burger/Cruncho Paneer King Burger.png',
        desc: 'Golden fried paneer patty with crunchy texture and bold flavors.',
      },
      {
        title: 'Classic Cluckster Burger',
        img: '/images/burger/Classic Cluckster Burger.png',
        desc: 'Juicy chicken patty paired with crisp veggies and soft toasted buns.',
      },
      {
        title: 'PeriGrill Blaze Chicken Burger',
        img: '/images/burger/PeriGrill Blaze Chicken Burger.png',
        desc: 'Peri peri spiced chicken grilled and stacked for a fiery bite.',
      },
      {
        title: 'Smoky Mood Burger',
        img: '/images/burger/Smoky Mood Burger.png',
        desc: 'Smoky sauce infused burger made for rich and intense taste lovers.',
      },
      {
        title: 'Zinger Beast Chicken Burger',
        img: '/images/burger/Zinger Beast Chicken Burger.png',
        desc: 'Extra crunchy zinger patty loaded with sauces and fresh toppings.',
      },
    ],
    3: [
      {
        title: 'Classic Chicken Wrap',
        img: '/images/wraps/Classic Chicken Wrap.png',
        desc: 'Soft tortilla filled with seasoned chicken, fresh veggies, and house sauces.',
      },
      {
        title: 'Desi Tandoori Wrap',
        img: '/images/wraps/Desi Tandoori Wrap.png',
        desc: 'Tandoori spiced filling wrapped fresh for a smoky and bold flavor.',
      },
      {
        title: 'Paneer Zesty Spice Wrap',
        img: '/images/wraps/Paneer Zesty Spice Wrap.png',
        desc: 'Zesty seasoned paneer rolled with tangy sauce and fresh fillings.',
      },
      {
        title: 'Non Veg Cruncho Pop Wrap',
        img: '/images/wraps/Non Veg Cruncho Pop Wrap.png',
        desc: 'Crunchy chicken pops rolled with creamy sauces and crisp vegetables.',
      },
      {
        title: 'Non Veg Namma Wrap',
        img: '/images/wraps/Non Veg Namma Wrap.png',
        desc: 'Local-style spiced chicken wrapped with onions and signature masala.',
      },
      {
        title: 'Paneer Cheese Wrap',
        img: '/images/wraps/Paneer Cheese Wrap.png',
        desc: 'Soft paneer cubes tossed with cheese and wrapped fresh.',
      },
    ],
    4: [
      {
        title: 'Classic Fries N Fly',
        img: '/images/fries/Classic Fries N Fly.png',
        desc: 'Golden fried potato fries served hot and lightly seasoned.',
      },
      {
        title: 'CA Special Fries N Fly',
        img: '/images/fries/Ca Special Fries N Fly.png',
        desc: 'Chef’s special fries tossed with signature spice mix.',
      },
      {
        title: 'Tandoori Fries N Fly',
        img: '/images/fries/Tandoori Fries N Fly.png',
        desc: 'Tandoori spiced fries with bold Indian flavors.',
      },
      {
        title: 'Zesty Fries N Fly',
        img: '/images/fries/Zesty Fries N Fly.png',
        desc: 'Tangy and zesty fries tossed with citrus spice blend.',
      },
      {
        title: 'Sriracha Fries N Fly',
        img: '/images/fries/Sriracha Fries N Fly.png',
        desc: 'Spicy sriracha coated fries with a fiery kick.',
      },
    ],
    5: [
      {
        title: 'Regular Keema',
        img: '/images/biryanikeema/Regular Keema.png',
        desc: 'Slow-cooked minced meat infused with classic spices.',
      },
      {
        title: 'Cheese Keema',
        img: '/images/biryanikeema/Cheese Keema.png',
        desc: 'Rich keema blended with melted cheese for a creamy bite.',
      },
      {
        title: 'Veg Biryani',
        img: '/images/biryanikeema/veg biryani.png',
        desc: 'Aromatic basmati rice cooked with fresh vegetables.',
      },
      {
        title: 'Chicken Biryani',
        img: '/images/biryanikeema/chicken biryani.png',
        desc: 'Fragrant rice layered with spiced chicken and herbs.',
      },
    ],
  };

  return (
    <section className="section section-bg-main" id="offers">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 text-center">
            <div className="section-heading">
              <h1>Affair's Deals</h1>
              <h2>Our Special Menu</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="row" id="tabs">
                <div className="col-lg-12">
                  <div className="heading-tabs">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul>
                          {tabs.map((tab) => (
                            <li key={tab.id}>
                              <a
                                href={`#tabs-${tab.id}`}
                                className={activeTab === tab.id ? 'active' : ''}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveTab(tab.id);
                                }}
                              >
                                <img src={tab.icon} alt={tab.label} />
                                {tab.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="tabs-content" style={{ width: '100%' }}>
                  <article id={`tabs-${activeTab}`}>
                    <div className="row">
                      {tabData[activeTab]?.map((item, idx) => (
                        <div key={idx} className="col-lg-4 col-md-6 mb-4">
                          <div className="tab-item" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                              <div className="tab-item-img">
                                <img src={item.img} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} />
                              </div>
                              <h4 style={{ marginTop: '15px' }}>{item.title}</h4>
                              <p style={{ color: 'var(--theme-muted)', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                            <a
                              href={`https://wa.me/918980059595?text=Hello%20Kafe%20Affair%2C%20I%20want%20to%20order%20${encodeURIComponent(item.title)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tab-order-btn"
                              style={{ marginTop: '15px' }}
                            >
                              Order via WhatsApp <i className="fa fa-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
