import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import './Profile.css'; // Reusing profile styles or adding specific ones

const Addresses: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addresses, addAddress, removeAddress, setDefaultAddress } = useAuthStore();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    landmark: '',
    pincode: ''
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const address = {
      ...newAddress,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0
    };
    addAddress(address);
    setShowAddForm(false);
    setNewAddress({ fullName: '', phone: '', street: '', landmark: '', pincode: '' });
  };

  return (
    <div className="profile-container">
      <div className="category-header-bar">
        <button onClick={() => navigate(-1)} className="icon-btn back-btn">
          <ArrowLeft size={24} />
        </button>
        <h1>{t('saved_addresses')}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="profile-content p-4">
        {!showAddForm ? (
          <button className="add-address-card" onClick={() => setShowAddForm(true)}>
            <Plus size={24} />
            <span>{t('add_new_address')}</span>
          </button>
        ) : (
          <form className="address-form-inline" onSubmit={handleAdd}>
            <h3>{t('add_new_address')}</h3>
            <input 
              placeholder={t('full_name')} 
              value={newAddress.fullName} 
              onChange={e => setNewAddress({...newAddress, fullName: e.target.value})}
              required
            />
            <input 
              placeholder={t('mobile_number')} 
              value={newAddress.phone} 
              onChange={e => setNewAddress({...newAddress, phone: e.target.value})}
              required
            />
            <input 
              placeholder={t('street_address')} 
              value={newAddress.street} 
              onChange={e => setNewAddress({...newAddress, street: e.target.value})}
              required
            />
            <input 
              placeholder={t('landmark')} 
              value={newAddress.landmark} 
              onChange={e => setNewAddress({...newAddress, landmark: e.target.value})}
            />
            <input 
              placeholder={t('pincode')} 
              value={newAddress.pincode} 
              onChange={e => setNewAddress({...newAddress, pincode: e.target.value})}
              required
            />
            <div className="form-actions">
              <button type="button" className="text-btn" onClick={() => setShowAddForm(false)}>{t('cancel') || 'Cancel'}</button>
              <button type="submit" className="primary-btn">{t('save_address_btn')}</button>
            </div>
          </form>
        )}

        <div className="addresses-list mt-6">
          {addresses.map(addr => (
            <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
              <div className="address-icon">
                <MapPin size={20} />
              </div>
              <div className="address-details">
                <div className="address-title-row">
                  <h4>{addr.fullName}</h4>
                  {addr.isDefault && <span className="default-badge">DEFAULT</span>}
                </div>
                <p>{addr.street}</p>
                <p>{addr.landmark && `${addr.landmark}, `}{addr.pincode}</p>
                <p>Phone: {addr.phone}</p>
                
                <div className="address-actions">
                  {!addr.isDefault && (
                    <button className="text-btn sm-text" onClick={() => setDefaultAddress(addr.id)}>
                      {t('set_as_default')}
                    </button>
                  )}
                  <button className="icon-delete-btn" onClick={() => removeAddress(addr.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {addresses.length === 0 && !showAddForm && (
            <div className="empty-state">
              <p>{t('no_saved_addresses')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
