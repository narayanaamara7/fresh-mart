import React, { useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories, products } from '../data/mockData';
import { useCartStore, useSearchStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { Plus } from 'lucide-react';
import './Home.css';

const Home: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const addItem = useCartStore(state => state.addItem);
  const searchQuery = useSearchStore(state => state.query);
  
  // Get featured products (filtered by search query if present, else original slice)
  const featuredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products.slice(0, 8); // Show more by default on home
    const term = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      (p.description && p.description.toLowerCase().includes(term))
    );
  }, [searchQuery]);

  const handleAddToCart = useCallback((e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    // Could show a toast notification here
  }, [addItem]);

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Freshness Delivered</h1>
          <p>Farm-fresh vegetables & fruits to your doorstep in Jaggayyapeta.</p>
          <button className="primary-btn mt-4" onClick={() => window.scrollTo({ top: document.getElementById('categories')?.offsetTop, behavior: 'smooth' })}>
            Shop Now
          </button>
        </div>
      </div>

      {/* Category Grid */}
      <section id="categories" className="section-container">
        <div className="section-header">
          <h2>{t('shop_by_category')}</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link to={`/app/category/${category.id}`} key={category.id} className="category-card">
              <div className="category-img-wrapper">
                <img src={category.imageUrl} alt={category.name} loading="lazy" />
              </div>
              <span className="category-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Fresh Picks */}
      <section className="section-container bg-light">
        <div className="section-header">
          <h2>{t('todays_fresh_picks')}</h2>
          <Link to="/app/category/all" className="view-all">{t('view_all')}</Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => navigate(`/app/product/${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-img-wrapper">
                <img src={product.imageUrl} alt={product.name} loading="lazy" />
                {!product.inStock && <span className="out-of-stock-badge">{t('out_of_stock')}</span>}
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-unit">{product.unit}</span>
                <div className="product-bottom">
                  <div className="product-price">
                    <span className="current-price">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={!product.inStock}
                    aria-label={t('add_to_cart')}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Bottom padding for mobile to allow scrolling past fixed bottom elements if any */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
});

export default Home;
