import { useState, useEffect, useRef } from 'react';
import SeoHead from '../components/SeoHead.jsx';

export default function AdminPanel() {
  const fileInputRef = useRef(null);
  const [token, setToken] = useState(() => localStorage.getItem('kafe_admin_token') || '');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'categories'
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Category Form State
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catIcon, setCatIcon] = useState('🍕');
  const [editingCatId, setEditingCatId] = useState(null);

  // Menu Item Form State
  const [itemTitle, setItemTitle] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDiscountedPrice, setItemDiscountedPrice] = useState('');
  const [itemImg, setItemImg] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant Base64 preview & local fallback so itemImg is never empty!
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setItemImg(event.target.result);
      }
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setItemImg(data.url);
        showMessage('success', 'Image uploaded successfully!');
      } else {
        console.warn('Backend upload notice (using local image):', data.error);
        showMessage('info', 'Local image ready! (Server upload skipped)');
      }
    } catch (err) {
      console.warn('Upload error, using local image fallback:', err.message);
      showMessage('info', 'Local image file ready.');
    } finally {
      setUploading(false);
    }
  };

  // Verify stored token on mount
  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (authToken) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        fetchAllData();
      } else {
        handleLogout();
      }
    } catch (err) {
      console.warn('Failed to verify admin token:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('kafe_admin_token', data.token);
        setToken(data.token);
        setUser(data.user);
        showMessage('success', `Welcome back, ${data.user.username}!`);
        fetchAllData();
      } else {
        showMessage('danger', data.error || 'Login failed.');
      }
    } catch (err) {
      showMessage('danger', 'Error connecting to server.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('kafe_admin_token');
    setToken('');
    setUser(null);
    showMessage('info', 'Logged out successfully.');
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [catRes, itemRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/menu'),
      ]);
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
        if (catData.length > 0 && !itemCategory) {
          setItemCategory(catData[0].slug);
        }
      }
      if (itemRes.ok) {
        const itemData = await itemRes.json();
        setMenuItems(itemData);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  // --- Category Actions ---
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!catName || !catSlug) {
      showMessage('danger', 'Category name and slug are required!');
      return;
    }

    const payload = { name: catName, slug: catSlug.toLowerCase().trim(), icon: catIcon };
    try {
      const url = editingCatId ? `/api/categories/${editingCatId}` : '/api/categories';
      const method = editingCatId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showMessage('success', editingCatId ? 'Category updated!' : 'Category created!');
        setCatName('');
        setCatSlug('');
        setCatIcon('🍕');
        setEditingCatId(null);
        fetchAllData();
      } else {
        showMessage('danger', data.error || 'Operation failed');
      }
    } catch (err) {
      showMessage('danger', err.message);
    }
  };

  const handleEditCategory = (cat) => {
    setEditingCatId(cat._id);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatIcon(cat.icon || '🍕');
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showMessage('success', 'Category deleted.');
        fetchAllData();
      }
    } catch (err) {
      showMessage('danger', 'Failed to delete category.');
    }
  };

  // --- Menu Item Actions ---
  const handleSaveMenuItem = async (e) => {
    e.preventDefault();
    const selectedCat = itemCategory || (categories.length > 0 ? categories[0].slug : 'pizza');
    
    if (!itemTitle.trim()) {
      showMessage('danger', 'Please enter an Item Title.');
      return;
    }
    if (!selectedCat) {
      showMessage('danger', 'Please select a Category.');
      return;
    }
    if (!itemPrice.trim()) {
      showMessage('danger', 'Please enter an Original Price.');
      return;
    }
    if (!itemImg.trim()) {
      showMessage('danger', 'Please select an Image file or provide an Image URL.');
      return;
    }

    const payload = {
      title: itemTitle,
      category: selectedCat,
      price: itemPrice,
      discountedPrice: itemDiscountedPrice,
      img: itemImg,
      desc: itemDesc,
    };

    try {
      const url = editingItemId ? `/api/menu/${editingItemId}` : '/api/menu';
      const method = editingItemId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showMessage('success', editingItemId ? 'Menu item updated!' : 'Menu item created!');
        resetItemForm();
        fetchAllData();
      } else {
        showMessage('danger', data.error || 'Operation failed');
      }
    } catch (err) {
      showMessage('danger', err.message);
    }
  };

  const handleEditMenuItem = (item) => {
    setEditingItemId(item._id);
    setItemTitle(item.title);
    setItemCategory(item.category);
    setItemPrice(item.price);
    setItemDiscountedPrice(item.discountedPrice || '');
    setItemImg(item.img);
    setItemDesc(item.desc || '');
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showMessage('success', 'Menu item deleted.');
        fetchAllData();
      }
    } catch (err) {
      showMessage('danger', 'Failed to delete menu item.');
    }
  };

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const resetItemForm = () => {
    setEditingItemId(null);
    setItemTitle('');
    setItemPrice('');
    setItemDiscountedPrice('');
    setItemImg('');
    setItemDesc('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Render Login Screen if unauthenticated
  if (!token || !user) {
    return (
      <>
        <SeoHead title="Admin Login | Kafe Affair" description="Admin portal login." />
        <div style={{ paddingTop: '150px', paddingBottom: '90px', minHeight: '85vh', background: '#121214' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-8">
                <div
                  style={{
                    background: '#1a1a1e',
                    border: '1px solid #2a2a30',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="text-center mb-4">
                    <img src="/assets/logo.png" alt="Kafe Affair Logo" style={{ maxHeight: '50px', marginBottom: '15px' }} />
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>Admin Access Portal</h2>
                    <p style={{ color: '#aaa', fontSize: '14px' }}>Sign in to manage categories & menu items</p>
                  </div>

                  {message && (
                    <div className={`alert alert-${message.type} mb-4`} style={{ borderRadius: '10px', fontSize: '14px' }}>
                      {message.text}
                    </div>
                  )}

                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                      <label style={{ color: '#ccc', fontSize: '13px', fontWeight: 600 }}>Username</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        placeholder="admin"
                        required
                        style={{ height: '48px', borderRadius: '10px' }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label style={{ color: '#ccc', fontSize: '13px', fontWeight: 600 }}>Password</label>
                      <input
                        type="password"
                        className="form-control bg-dark text-white border-secondary"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter admin password"
                        required
                        style={{ height: '48px', borderRadius: '10px' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="btn btn-warning font-weight-bold btn-block"
                      style={{ height: '48px', borderRadius: '10px', fontSize: '16px' }}
                    >
                      {loginLoading ? 'Signing In...' : 'Sign In to Dashboard'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SeoHead title="Admin Dashboard | Kafe Affair" description="Admin management dashboard for Kafe Affair." />

      <div style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '85vh', background: '#121214' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <div>
              <span className="section-badge">ADMIN CONTROL CENTER</span>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--theme-dark)', marginTop: '5px' }}>
                Kafe Affair Management
              </h1>
            </div>
            <div className="d-flex gap-2 mt-3 mt-md-0 align-items-center">
              <span style={{ color: '#aaa', fontSize: '14px', marginRight: '10px' }}>
                Logged in as <strong style={{ color: '#ffb703' }}>{user.username}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
                style={{ borderRadius: '10px', fontWeight: 600 }}
              >
                🔒 Logout
              </button>
            </div>
          </div>

          {message && (
            <div className={`alert alert-${message.type} mb-4`} style={{ borderRadius: '12px', fontWeight: 600 }}>
              {message.text}
            </div>
          )}

          {/* Navigation Tabs */}
          <ul className="nav nav-pills mb-4" style={{ gap: '10px' }}>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'menu' ? 'active bg-warning text-dark' : 'text-white'}`}
                onClick={() => setActiveTab('menu')}
                style={{ borderRadius: '10px', fontWeight: 700 }}
              >
                🍕 Menu Items ({menuItems.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'categories' ? 'active bg-warning text-dark' : 'text-white'}`}
                onClick={() => setActiveTab('categories')}
                style={{ borderRadius: '10px', fontWeight: 700 }}
              >
                📂 Categories ({categories.length})
              </button>
            </li>
          </ul>

          {/* Tab 1: Menu Items Management */}
          {activeTab === 'menu' && (
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div style={{ background: '#1a1a1e', border: '1px solid #2a2a30', borderRadius: '16px', padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
                    {editingItemId ? '✏️ Edit Menu Item' : '➕ Add New Menu Item'}
                  </h3>
                  <form onSubmit={handleSaveMenuItem}>
                    <div className="form-group mb-3">
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Item Title *</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        value={itemTitle}
                        onChange={(e) => setItemTitle(e.target.value)}
                        placeholder="e.g. Cheese Burst Pizza"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Category *</label>
                      <select
                        className="form-control bg-dark text-white border-secondary"
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat._id || cat.slug} value={cat.slug}>
                            {cat.icon} {cat.name} ({cat.slug})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label style={{ color: '#aaa', fontSize: '13px' }}>Original Price *</label>
                          <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            placeholder="e.g. ₹249"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group mb-3">
                          <label style={{ color: '#aaa', fontSize: '13px' }}>Discounted Price</label>
                          <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            value={itemDiscountedPrice}
                            onChange={(e) => setItemDiscountedPrice(e.target.value)}
                            placeholder="e.g. ₹199 (Optional)"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Upload Image File</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="form-control-file text-white mb-2"
                      />
                      {uploading && <small style={{ color: '#ffb703' }}>⏳ Uploading image file...</small>}

                      <label style={{ color: '#aaa', fontSize: '13px', marginTop: '8px' }}>Or Image Path / URL *</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        value={itemImg}
                        onChange={(e) => setItemImg(e.target.value)}
                        placeholder="/images/pizza/... or /uploads/... or https://..."
                      />
                      {itemImg && (
                        <div className="mt-2 d-flex align-items-center">
                          <img
                            src={itemImg}
                            alt="Preview"
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px', border: '1px solid #ffb703' }}
                          />
                          <span style={{ color: '#2ec4b6', fontSize: '12px', fontWeight: 600 }}>✓ Image set</span>
                        </div>
                      )}
                    </div>

                    <div className="form-group mb-3">
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Description</label>
                      <textarea
                        className="form-control bg-dark text-white border-secondary"
                        rows="3"
                        value={itemDesc}
                        onChange={(e) => setItemDesc(e.target.value)}
                        placeholder="Short description of ingredients or taste"
                      ></textarea>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-warning font-weight-bold flex-grow-1" style={{ borderRadius: '10px' }}>
                        {editingItemId ? 'Update Item' : 'Add Item'}
                      </button>
                      {editingItemId && (
                        <button type="button" className="btn btn-secondary" onClick={resetItemForm} style={{ borderRadius: '10px' }}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-8">
                <div style={{ background: '#1a1a1e', border: '1px solid #2a2a30', borderRadius: '16px', padding: '24px' }}>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 pb-2 border-bottom border-secondary">
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>Current Menu Items</h3>
                    <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
                      <span style={{ color: '#aaa', fontSize: '13px', whiteSpace: 'nowrap' }}>Filter Category:</span>
                      <select
                        className="form-control form-control-sm bg-dark text-white border-secondary"
                        style={{ width: 'auto', borderRadius: '8px' }}
                        value={selectedCategoryFilter}
                        onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      >
                        <option value="all">All Categories ({menuItems.length})</option>
                        {categories.map((cat) => {
                          const count = menuItems.filter((i) => i.category === cat.slug).length;
                          return (
                            <option key={cat._id || cat.slug} value={cat.slug}>
                              {cat.icon ? cat.icon + ' ' : ''}{cat.name} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <p style={{ color: '#aaa' }}>Loading items...</p>
                  ) : menuItems.length === 0 ? (
                    <p style={{ color: '#aaa' }}>No menu items found in MongoDB.</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-hover mb-0" style={{ background: 'transparent' }}>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(selectedCategoryFilter === 'all'
                            ? menuItems
                            : menuItems.filter((item) => item.category === selectedCategoryFilter)
                          ).map((item) => (
                            <tr key={item._id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img
                                    src={item.img}
                                    alt={item.title}
                                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', marginRight: '12px' }}
                                  />
                                  <div>
                                    <strong style={{ color: '#fff' }}>{item.title}</strong>
                                    <div style={{ fontSize: '12px', color: '#888' }}>{item.desc?.substring(0, 45)}...</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="badge badge-secondary">{item.category}</span>
                              </td>
                              <td>
                                {item.discountedPrice ? (
                                  <div>
                                    <span style={{ color: '#2ec4b6', fontWeight: 700, fontSize: '15px' }}>{item.discountedPrice}</span>
                                    <span style={{ color: '#888', textDecoration: 'line-through', fontSize: '12px', marginLeft: '6px' }}>{item.price}</span>
                                  </div>
                                ) : (
                                  <span style={{ color: '#ffb703', fontWeight: 700 }}>{item.price}</span>
                                )}
                              </td>
                              <td className="text-right">
                                <button className="btn btn-sm btn-outline-warning mr-2" onClick={() => handleEditMenuItem(item)}>
                                  Edit
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMenuItem(item._id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Categories Management */}
          {activeTab === 'categories' && (
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div style={{ background: '#1a1a1e', border: '1px solid #2a2a30', borderRadius: '16px', padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
                    {editingCatId ? '✏️ Edit Category' : '➕ Add New Category'}
                  </h3>
                  <form onSubmit={handleSaveCategory}>
                    <div className="form-group mb-3">
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Category Name *</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        value={catName}
                        onChange={(e) => {
                          setCatName(e.target.value);
                          if (!editingCatId) {
                            setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                          }
                        }}
                        placeholder="e.g. Soft Drinks"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Slug (URL identifier) *</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        value={catSlug}
                        onChange={(e) => setCatSlug(e.target.value)}
                        placeholder="e.g. drinks"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label style={{ color: '#aaa', fontSize: '13px' }}>Icon / Emoji</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        value={catIcon}
                        onChange={(e) => setCatIcon(e.target.value)}
                        placeholder="e.g. 🥤"
                      />
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-warning font-weight-bold flex-grow-1" style={{ borderRadius: '10px' }}>
                        {editingCatId ? 'Update Category' : 'Add Category'}
                      </button>
                      {editingCatId && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setEditingCatId(null);
                            setCatName('');
                            setCatSlug('');
                            setCatIcon('🍕');
                          }}
                          style={{ borderRadius: '10px' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-8">
                <div style={{ background: '#1a1a1e', border: '1px solid #2a2a30', borderRadius: '16px', padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>Categories List</h3>
                  {loading ? (
                    <p style={{ color: '#aaa' }}>Loading categories...</p>
                  ) : categories.length === 0 ? (
                    <p style={{ color: '#aaa' }}>No categories found.</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-hover mb-0">
                        <thead>
                          <tr>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((cat) => (
                            <tr key={cat._id}>
                              <td style={{ fontSize: '24px' }}>{cat.icon}</td>
                              <td style={{ color: '#fff', fontWeight: 700 }}>{cat.name}</td>
                              <td>
                                <code style={{ color: '#ffb703' }}>{cat.slug}</code>
                              </td>
                              <td className="text-right">
                                <button className="btn btn-sm btn-outline-warning mr-2" onClick={() => handleEditCategory(cat)}>
                                  Edit
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteCategory(cat._id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
