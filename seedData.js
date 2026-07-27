const defaultCategories = [
  { name: 'Pizzas', slug: 'pizza', icon: '🍕', displayOrder: 1 },
  { name: 'Gourmet Burgers', slug: 'burger', icon: '🍔', displayOrder: 2 },
  { name: 'Wraps', slug: 'wraps', icon: '🌯', displayOrder: 3 },
  { name: 'Starters & Fries', slug: 'starters', icon: '🍟', displayOrder: 4 },
  { name: 'Keema & Biryani', slug: 'keema', icon: '🍛', displayOrder: 5 },
];

const defaultMenuItems = [
  // Pizzas
  {
    category: 'pizza',
    price: '₹249',
    img: '/images/pizza/Butter Paneer Pizza.jpeg',
    title: 'Butter Paneer Pizza',
    desc: 'Rich makhani sauce base topped with spiced paneer cubes, crisp capsicum & melted mozzarella cheese.',
  },
  {
    category: 'pizza',
    price: '₹299',
    img: '/images/pizza/Chick Loaded Chicken Pizza.jpeg',
    title: 'Loaded Chicken Pizza',
    desc: 'Succulent grilled chicken chunks, peri-peri drizzle, onions, bell peppers & extra mozzarella blend.',
  },
  {
    category: 'pizza',
    price: '₹199',
    img: '/images/pizza/Margherita pizza.jpeg',
    title: 'Margherita Classic',
    desc: 'Timeless classic featuring rich Italian tomato basil sauce layered with fresh melted mozzarella.',
  },
  {
    category: 'pizza',
    price: '₹229',
    img: '/images/pizza/Exotix Veg Pizza.jpeg',
    title: 'Exotic Veg Pizza',
    desc: 'A colorful mix of fresh vegetables seasoned lightly and topped on a crispy cheesy base.',
  },
  {
    category: 'pizza',
    price: '₹279',
    img: '/images/pizza/Namma chicken pizza.jpeg',
    title: 'Namma Chicken Pizza',
    desc: 'Spiced chicken chunks inspired by local flavors baked with melted cheese.',
  },
  {
    category: 'pizza',
    price: '₹289',
    img: '/images/pizza/Schezwan spice chicken pizza.jpeg',
    title: 'Schezwan Spice Chicken Pizza',
    desc: 'Fiery schezwan sauce paired with juicy chicken for a spicy punch.',
  },
  {
    category: 'pizza',
    price: '₹299',
    img: '/images/pizza/Smokey bbq chicken pizza.jpeg',
    title: 'Smokey BBQ Chicken Pizza',
    desc: 'Smoky barbecue glaze layered over tender chicken and melted cheese.',
  },

  // Burgers
  {
    category: 'burger',
    price: '₹189',
    img: '/images/burger/Ca Signature Non-veg Burger.png',
    title: 'CA Signature Grill Burger',
    desc: 'Flame-grilled chicken patty with caramelized onions, sharp cheddar cheese & secret house spread.',
  },
  {
    category: 'burger',
    price: '₹149',
    img: '/images/burger/Classic Veg Vibe Burger.png',
    title: 'Classic Veg Vibe Burger',
    desc: 'Crispy veg patty layered with fresh lettuce and signature house sauce.',
  },
  {
    category: 'burger',
    price: '₹179',
    img: '/images/burger/Cruncho Paneer King Burger.png',
    title: 'Cruncho Paneer King Burger',
    desc: 'Golden fried paneer patty with crunchy texture and bold flavors.',
  },
  {
    category: 'burger',
    price: '₹169',
    img: '/images/burger/Classic Cluckster Burger.png',
    title: 'Classic Cluckster Burger',
    desc: 'Crispy fried chicken fillet topped with fresh crisp lettuce, pickles & creamy garlic aioli spread.',
  },
  {
    category: 'burger',
    price: '₹179',
    img: '/images/burger/PeriGrill Blaze Chicken Burger.png',
    title: 'PeriGrill Blaze Burger',
    desc: 'Spicy peri-peri marinated chicken patty with jalapeños, spicy mayo & toasted artisan bun.',
  },
  {
    category: 'burger',
    price: '₹189',
    img: '/images/burger/Smoky Mood Burger.png',
    title: 'Smoky Mood Burger',
    desc: 'Smoky sauce infused burger made for rich and intense taste lovers.',
  },
  {
    category: 'burger',
    price: '₹199',
    img: '/images/burger/Zinger Beast Chicken Burger.png',
    title: 'Zinger Beast Chicken Burger',
    desc: 'Extra crunchy zinger patty loaded with sauces and fresh toppings.',
  },

  // Wraps
  {
    category: 'wraps',
    price: '₹159',
    img: '/images/wraps/Classic Chicken Wrap.png',
    title: 'Classic Chicken Wrap',
    desc: 'Soft tortilla filled with seasoned chicken, fresh veggies, and house sauces.',
  },
  {
    category: 'wraps',
    price: '₹169',
    img: '/images/wraps/Desi Tandoori Wrap.png',
    title: 'Desi Tandoori Wrap',
    desc: 'Tandoori spiced filling wrapped fresh for a smoky and bold flavor.',
  },
  {
    category: 'wraps',
    price: '₹159',
    img: '/images/wraps/Paneer Zesty Spice Wrap.png',
    title: 'Paneer Zesty Spice Wrap',
    desc: 'Zesty seasoned paneer rolled with tangy sauce and fresh fillings.',
  },
  {
    category: 'wraps',
    price: '₹179',
    img: '/images/wraps/Non Veg Cruncho Pop Wrap.png',
    title: 'Non Veg Cruncho Pop Wrap',
    desc: 'Crunchy chicken pops rolled with creamy sauces and crisp vegetables.',
  },
  {
    category: 'wraps',
    price: '₹169',
    img: '/images/wraps/Non Veg Namma Wrap.png',
    title: 'Non Veg Namma Wrap',
    desc: 'Local-style spiced chicken wrapped with onions and signature masala.',
  },
  {
    category: 'wraps',
    price: '₹169',
    img: '/images/wraps/Paneer Cheese Wrap.png',
    title: 'Paneer Cheese Wrap',
    desc: 'Soft paneer cubes tossed with cheese and wrapped fresh.',
  },
  {
    category: 'wraps',
    price: '₹159',
    img: '/images/wraps/Paneer Peri Punch Wrap.png',
    title: 'Paneer Peri Punch Wrap',
    desc: 'Peri peri paneer wrapped with crunchy veggies and spicy sauce.',
  },

  // Starters & Fries
  {
    category: 'starters',
    price: '₹149',
    img: '/images/popcorn.png',
    title: 'Crispy Chicken Popcorn',
    desc: 'Golden crunchy bite-sized chicken popcorn fried to perfection and served with house dipping sauce.',
  },
  {
    category: 'starters',
    price: '₹129',
    img: '/images/fries/Ca Special Fries N Fly.png',
    title: 'CA Special Fries N Fly',
    desc: 'Crispy french fries tossed in signature peri-peri spices, topped with melted cheese & herbs.',
  },
  {
    category: 'starters',
    price: '₹99',
    img: '/images/fries/Classic Fries N Fly.png',
    title: 'Classic Fries N Fly',
    desc: 'Golden fried potato fries served hot and lightly seasoned.',
  },
  {
    category: 'starters',
    price: '₹119',
    img: '/images/fries/Tandoori Fries N Fly.png',
    title: 'Tandoori Fries N Fly',
    desc: 'Tandoori spiced fries with bold Indian flavors.',
  },
  {
    category: 'starters',
    price: '₹119',
    img: '/images/fries/Zesty Fries N Fly.png',
    title: 'Zesty Fries N Fly',
    desc: 'Tangy and zesty fries tossed with citrus spice blend.',
  },
  {
    category: 'starters',
    price: '₹129',
    img: '/images/fries/Sriracha Fries N Fly.png',
    title: 'Sriracha Fries N Fly',
    desc: 'Spicy sriracha coated fries with a fiery kick.',
  },

  // Keema & Biryani
  {
    category: 'keema',
    price: '₹219',
    img: '/images/biryanikeema/Regular Keema.png',
    title: 'Regular Keema',
    desc: 'Slow-cooked minced meat infused with classic spices.',
  },
  {
    category: 'keema',
    price: '₹249',
    img: '/images/biryanikeema/Cheese Keema.png',
    title: 'Cheese Keema',
    desc: 'Slow-cooked savory minced meat blended with creamy melted cheese and classic spices.',
  },
  {
    category: 'keema',
    price: '₹189',
    img: '/images/biryanikeema/veg biryani.png',
    title: 'Veg Biryani',
    desc: 'Aromatic basmati rice cooked with fresh vegetables.',
  },
  {
    category: 'keema',
    price: '₹229',
    img: '/images/biryanikeema/chicken biryani.png',
    title: 'Chicken Biryani',
    desc: 'Aromatic basmati rice layered with spiced tender chicken, saffron, mint and fried onions.',
  },
];

module.exports = { defaultCategories, defaultMenuItems };
