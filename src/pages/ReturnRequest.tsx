import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowLeft, Camera, Check, X } from 'lucide-react';
import './ReturnRequest.css';

const ReturnRequest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const orders = useOrderStore(state => state.orders);
  const order = orders.find(o => o.id === id);

  const toggleItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || selectedItems.size === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      navigate('/app/orders');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="orders-container center-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="success-message-box" style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }}>
          <div className="success-icon-circle" style={{ width: '64px', height: '64px', background: 'var(--success)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Check size={32} />
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>Return Requested</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Your return request for Order {id} has been submitted successfully. Our team will contact you shortly.</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="orders-container center-content">
        <p>Order not found.</p>
        <button className="primary-btn mt-4" onClick={() => navigate('/app/orders')}>Back to Orders</button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="checkout-header">
        <button className="icon-btn back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>{t('request_return')}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="return-content">
        <div className="return-order-info">
          <p>{t('order_id')}: <strong>{id}</strong></p>
          <span className="return-policy-note">{t('select_items')}</span>
        </div>

        <form className="return-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('select_items')} *</label>
            <div className="return-items-list">
              {order.items.map((item: any) => (
                <div 
                  key={item.id} 
                  className={`return-item-card ${selectedItems.has(item.id) ? 'selected' : ''}`}
                  onClick={() => toggleItem(item.id)}
                >
                  <img src={item.imageUrl} alt={item.name} className="return-item-img" />
                  <div className="return-item-info">
                    <span className="return-item-name">{item.name}</span>
                    <span className="return-item-price">₹{item.price} × {item.quantity}</span>
                  </div>
                  <div className={`checkbox-custom ${selectedItems.has(item.id) ? 'checked' : ''}`}>
                    {selectedItems.has(item.id) && <Check size={14} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>{t('reason_for_return')} *</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              required
              className="reason-select"
            >
              <option value="" disabled>{t('reason_for_return')}...</option>
              <option value="Damaged">{t('damaged')}</option>
              <option value="Not Fresh">{t('not_fresh')}</option>
              <option value="Wrong Item">{t('wrong_item')}</option>
              <option value="Other">{t('other')}</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us exactly what was wrong..."
              rows={3}
              className="return-textarea"
            />
          </div>

          <div className="form-group">
            <label>{t('upload_photo')} ({t('other')})</label>
            <div className="upload-container">
              {!photoPreview ? (
                <div className="upload-placeholder" onClick={() => document.getElementById('photo-upload')?.click()}>
                  <Camera size={24} className="upload-icon" />
                  <span>{t('upload_photo')}</span>
                </div>
              ) : (
                <div className="photo-preview-wrapper">
                  <img src={photoPreview} alt="Preview" className="photo-preview" />
                  <button type="button" className="remove-photo-btn" onClick={() => setPhotoPreview(null)}>
                    <X size={16} />
                  </button>
                </div>
              )}
              <input 
                type="file" 
                id="photo-upload"
                accept="image/*" 
                className="hidden-file-input" 
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="primary-btn submit-return-btn" disabled={!reason || selectedItems.size === 0}>
            {t('submit_request')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnRequest;
