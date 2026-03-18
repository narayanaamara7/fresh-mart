import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useStore';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Cart.css';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const discount = subtotal >= 1000 ? subtotal * 0.1 : 0;
  // Delivery fee logic will be fully finalized in checkout when distance is known
  // For cart, we show Free if subtotal >= 150, else standard rate
  const deliveryFee = subtotal >= 150 ? 0 : 30; // base fee representation
  const total = subtotal - discount + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="header-padding">
          <button className="icon-btn back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="page-title">{t('my_cart')}</h1>
        </div>
        <div className="empty-cart-state">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <h2>{t('empty_cart')}</h2>
          <p>Looks like you haven't added any fresh items yet.</p>
          <button className="primary-btn mt-4" onClick={() => navigate('/app')}>
            {t('start_shopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-header-bar">
         <button className="icon-btn back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h1>{t('my_cart')} ({items.length})</h1>
          <div style={{ width: 40 }}></div>
      </div>

      <div className="cart-content">
        <div className="cart-items-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <div className="cart-item-header">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <button className="delete-btn" onClick={() => removeItem(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="cart-item-unit">{item.unit}</div>
                <div className="cart-item-bottom">
                  <span className="cart-item-price">₹{item.price * item.quantity}</span>
                  <div className="quantity-selector-sm">
                    <button 
                      className="qty-btn-sm" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty-value-sm">{item.quantity}</span>
                    <button 
                      className="qty-btn-sm" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bill-details">
          <h3>{t('item_total')}</h3>
          <div className="bill-row">
            <span>{t('item_total')}</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="bill-row discount">
              <span>{t('discount')} (10% over ₹1000)</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="bill-row">
            <span>{t('delivery_fee')}</span>
            {deliveryFee === 0 ? (
              <span className="free-delivery">{t('free')}</span>
            ) : (
              <span>₹{deliveryFee.toFixed(2)}</span>
            )}
          </div>
          {subtotal < 150 && (
            <div className="bill-notice">
              Add ₹{(150 - subtotal).toFixed(2)} more for FREE delivery
            </div>
          )}
          <hr className="bill-divider" />
          <div className="bill-row total-row">
            <span>{t('total_payable')}</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="cart-bottom-bar">
        <div className="bottom-total-info">
          <span className="bottom-total-label">{t('total_payable')}</span>
          <span className="bottom-total-amount">₹{total.toFixed(2)}</span>
        </div>
        <Link to="/app/checkout" className="primary-btn checkout-btn">
          {t('proceed_to_checkout')}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
