import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useCartStore, useSearchStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { products } from '../data/mockData';
import './Navbar.css';

const Navbar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { query: searchQuery, setQuery: setSearchQuery, clearQuery } = useSearchStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const cartItemCount = useCartStore(state => state.items.reduce((acc, item) => acc + item.quantity, 0));

  useEffect(() => {
    setIsDropdownOpen(false);
    // Don't clear query on navigate if we want persistent search, but user said "if user enter single letter ALSO the Fresh picks should be updated"
    // which implies they stay on the home page or want to see it filtered.
    // However, if they navigate to search results page, we should keep it.
    // Let's NOT clear it automatically on every location change if it's the search page itself.
    if (location.pathname !== '/app/search' && location.pathname !== '/app') {
       clearQuery();
    }
  }, [location.pathname, clearQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const term = searchQuery.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      (p.description && p.description.toLowerCase().includes(term))
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsDropdownOpen(false);
      navigate(`/app/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/app" className="navbar-logo">
            <span className="logo-fresh">Fresh</span>
            <span className="logo-mart">Mart</span>
          </Link>
        </div>

        <div className="navbar-search hidden-mobile" style={{ position: 'relative' }} ref={dropdownRef}>
          <form className="search-wrapper" onSubmit={handleSearch}>
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
          </form>
          {isDropdownOpen && searchQuery.trim() && (
            <div className="search-suggestions">
              {searchResults.length > 0 ? (
                searchResults.map(product => (
                  <Link
                    to={`/app/product/${product.id}`}
                    key={product.id}
                    className="suggestion-item"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      clearQuery();
                    }}
                  >
                    <img src={product.imageUrl} alt={product.name} className="suggestion-img" />
                    <div className="suggestion-details">
                      <span className="suggestion-name">{product.name}</span>
                      <span className="suggestion-price">₹{product.price} / {product.unit}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-suggestions">No matches found for "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>

        <div className="navbar-actions">
          <Link to="/app/profile" className="icon-btn profile-btn" aria-label={t('profile')}>
            <User size={24} />
          </Link>
          <Link to="/app/cart" className="icon-btn cart-btn" aria-label={t('cart')}>
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div className="navbar-search-mobile" style={{ position: 'relative' }} ref={mobileDropdownRef}>
        <form className="search-wrapper" onSubmit={handleSearch}>
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
          />
        </form>
        {isDropdownOpen && searchQuery.trim() && (
          <div className="search-suggestions">
            {searchResults.length > 0 ? (
              searchResults.map(product => (
                <Link
                  to={`/app/product/${product.id}`}
                  key={product.id}
                  className="suggestion-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    clearQuery();
                  }}
                >
                  <img src={product.imageUrl} alt={product.name} className="suggestion-img" />
                  <div className="suggestion-details">
                    <span className="suggestion-name">{product.name}</span>
                    <span className="suggestion-price">₹{product.price} / {product.unit}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-suggestions">No matches found for "{searchQuery}"</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
});

export default Navbar;
