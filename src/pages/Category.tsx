import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../data/mockData';
import { useCartStore } from '../store/useStore';
import { Plus, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Category.css';

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const addItem = useCartStore(state => state.addItem);

  const isAll = id === 'all';
  const category = isAll ? null : categories.find(c => c.id === id);
  const categoryProducts = isAll 
    ? products 
    : products.filter(p => p.categoryId === id);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="category-page-container">
      <div className="category-header-bar">
        <Link to="/app" className="back-btn">
          <ArrowLeft size={24} />
        </Link>
        <h1>{isAll ? t('all_products') : category?.name || t('category')}</h1>
        <div style={{ width: 24 }}></div> {/* Spacer for centering */}
      </div>

      <div className="product-grid" style={{ padding: '1.5rem' }}>
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <Link 
              to={`/app/product/${product.id}`} 
              key={product.id} 
              className="product-card"
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
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <p>{t('no_products_found')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
