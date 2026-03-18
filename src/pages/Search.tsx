import React, { useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCartStore } from '../store/useStore';
import { Plus, ArrowLeft, Search as SearchIcon } from 'lucide-react';
import './Category.css'; // Reusing Category styles for the grid

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const SearchPage: React.FC = () => {
  const query = useQuery();
  const searchQuery = query.get('q') || '';
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const term = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      (p.description && p.description.toLowerCase().includes(term))
    );
  }, [searchQuery]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="category-page-container">
      <div className="category-header-bar">
        <button onClick={() => navigate(-1)} className="icon-btn back-btn">
          <ArrowLeft size={24} />
        </button>
        <h1>Search: "{searchQuery}"</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="product-grid" style={{ padding: '1.5rem' }}>
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <Link 
              to={`/app/product/${product.id}`} 
              key={product.id} 
              className="product-card"
            >
              <div className="product-img-wrapper">
                <img src={product.imageUrl} alt={product.name} loading="lazy" />
                {!product.inStock && <span className="out-of-stock-badge">Out of Stock</span>}
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
                    aria-label="Add to Cart"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem' }}>
            <SearchIcon size={48} color="var(--text-light)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3>No results found</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>We couldn't find any products matching "{searchQuery}".</p>
            <button className="primary-btn mt-4" onClick={() => navigate('/app')}>
              Browse All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
