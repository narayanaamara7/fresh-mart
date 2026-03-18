import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCartStore } from '../store/useStore';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);

  const product = products.find(p => p.id === id);

  const weightVariants = ['250 g', '500 g', '1 kg', '2 kg'];
  const isWeightItem = product && (product.unit.toLowerCase().includes('kg') || (product.unit.toLowerCase().includes('g') && !product.unit.toLowerCase().includes('pc')));

  const getWeightInGrams = (unitStr: string) => {
    const amount = parseFloat(unitStr);
    if (unitStr.toLowerCase().includes('kg')) return amount * 1000;
    if (unitStr.toLowerCase().includes('g')) return amount;
    return 0;
  };

  const baseWeightGrams = product ? getWeightInGrams(product.unit) : 0;
  
  // Set default selected weight if not set and it's a weight item
  if (isWeightItem && !selectedWeight) {
    setSelectedWeight(product.unit);
  }

  const getVariantPrice = (weightStr: string) => {
    if (!product || baseWeightGrams === 0) return product?.price || 0;
    const targetGrams = getWeightInGrams(weightStr);
    return (product.price / baseWeightGrams) * targetGrams;
  };

  const currentPrice = isWeightItem && selectedWeight 
    ? getVariantPrice(selectedWeight) 
    : product?.price || 0;

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="header-padding">
          <button className="icon-btn back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="empty-state">
          <p>Product not found.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const finalProduct = {
      ...product,
      id: isWeightItem && selectedWeight ? `${product.id}-${selectedWeight.replace(' ', '')}` : product.id,
      name: isWeightItem && selectedWeight ? `${product.name} (${selectedWeight})` : product.name,
      price: currentPrice,
      unit: isWeightItem && selectedWeight ? selectedWeight : product.unit
    };
    addItem(finalProduct, quantity);
    navigate('/app/cart'); // Navigate to full cart page
  };

  const handleDecreaseBtn = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleIncreaseBtn = () => {
    setQuantity(q => q + 1);
  };

  return (
    <div className="product-detail-container">
      <div className="header-absolute">
        <button className="icon-btn back-btn-overlay" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        {/* Can add share or favorite buttons here */}
      </div>
      
      <div className="product-image-section">
        <img src={product.imageUrl} alt={product.name} className="product-image-large" />
      </div>
      
      <div className="product-info-section">
        <div className="info-header">
          <h1 className="detail-product-name">{product.name}</h1>
          <div className="detail-price-wrapper">
            <span className="detail-current-price">₹{currentPrice}</span>
            {product.originalPrice && !isWeightItem && (
              <span className="detail-original-price">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
        
        <p className="detail-unit">{product.unit} ({t('base_price')})</p>

        {isWeightItem && (
          <div className="weight-selection-section">
            <h3>{t('select_weight_title')}</h3>
            <div className="weight-chips">
              {weightVariants.map(weight => (
                <button
                  key={weight}
                  className={`weight-chip ${selectedWeight === weight ? 'active' : ''}`}
                  onClick={() => setSelectedWeight(weight)}
                >
                  <span className="chip-label">{weight}</span>
                  <span className="chip-price">₹{getVariantPrice(weight)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="stock-indicator">
          {product.inStock 
            ? <span className="in-stock-badge">{t('in_stock')}</span> 
            : <span className="out-of-stock-badge-sm">{t('out_of_stock')}</span>
          }
        </div>
        
        <div className="detail-description">
          <h3>{t('description')}</h3>
          <p>{product.description}</p>
        </div>
      </div>
      
      {/* Sticky Bottom Action Bar */}
      <div className="product-bottom-bar">
        {product.inStock ? (
          <>
            <div className="quantity-selector-large">
              <button 
                className="qty-btn" 
                onClick={handleDecreaseBtn}
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </button>
              <span className="qty-value">{quantity}</span>
              <button className="qty-btn" onClick={handleIncreaseBtn}>
                <Plus size={20} />
              </button>
            </div>
            
            <button className="primary-btn flex-1 add-to-cart-large" onClick={handleAddToCart}>
              <ShoppingBag size={20} />
              {t('add_to_cart_btn')} - ₹{(currentPrice * quantity).toFixed(2)}
            </button>
          </>
        ) : (
          <button className="primary-btn flex-1 disabled-btn" disabled>
            {t('currently_unavailable')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
