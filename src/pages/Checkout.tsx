import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useCartStore, useOrderStore } from '../store/useStore';
import { ArrowLeft, Clock, CreditCard, Wallet, Landmark } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Checkout.css';

// Zod schema for address validation
const addressSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().length(10, 'Phone must be exactly 10 digits').regex(/^\d+$/, 'Must contain only digits'),
  street: z.string().min(5, 'Street address is required'),
  landmark: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, 'Enter valid 6-digit Pincode (e.g., 521175)')
});

type PaymentMethod = 'upi' | 'card' | 'cod';
type DeliveryTimeSlot = 'mor' | 'aft' | 'eve';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items, getSubtotal, clearCart } = useCartStore();
  const addOrder = useOrderStore(state => state.addOrder);

  const [address, setAddress] = useState({ fullName: '', phone: '', street: '', landmark: '', pincode: '521175' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [deliveryDay, setDeliveryDay] = useState<string>(new Date().toISOString().split('T')[0]);
  const [deliverySlot, setDeliverySlot] = useState<DeliveryTimeSlot>('mor');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');

  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const discount = subtotal >= 1000 ? subtotal * 0.1 : 0;
  // Assume a fixed distance of 2km for mock purposes, otherwise 0 if >=150
  const deliveryFee = subtotal >= 150 ? 0 : 30 * 2; 
  const total = subtotal - discount + deliveryFee;

  if (items.length === 0 && !isProcessing) {
    navigate('/app/cart');
    return null;
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handlePayNow = () => {
    try {
      // Validate address
      addressSchema.parse(address);
      setErrors({});
      setIsProcessing(true);
      
      // Simulate API call and payment processing
      setTimeout(() => {
        const mockOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        const mockOrder: any = {
          id: mockOrderId,
          date: new Date().toISOString(),
          items: [...items],
          total,
          status: 'Processing',
          deliveryAddress: { ...address },
          deliverySlot: `${deliveryDay} | ${deliverySlot === 'mor' ? 'Morning' : deliverySlot === 'aft' ? 'Afternoon' : 'Evening'}`,
          paymentMethod: paymentMethod.toUpperCase()
        };
        addOrder(mockOrder);
        clearCart();
        navigate('/app/order-success', { state: { order: mockOrder } });
      }, 1000);

    } catch (err: any) {
      if (err && err.errors && Array.isArray(err.errors)) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          if (e.path && e.path[0]) newErrors[e.path[0].toString()] = e.message;
        });
        setErrors(newErrors);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="icon-btn back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>{t('checkout')}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="checkout-content">
        
        {/* Address Section */}
        <div className="checkout-section">
          <h2>{t('delivery_address')}</h2>
          <div className="address-form">
            <div className="form-group">
              <label>{t('full_name')}</label>
              <input type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} placeholder="e.g. Rahul Sharma" />
              {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
            </div>
            
            <div className="form-group">
              <label>{t('mobile_number')}</label>
              <div className="input-group">
                <span className="input-prefix">+91</span>
                <input type="tel" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="10-digit number" maxLength={10} />
              </div>
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>{t('street_address')}</label>
              <input type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="e.g. Main Bazar, Near Ramalayam" />
              {errors.street && <span className="error-msg">{errors.street}</span>}
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>{t('landmark')}</label>
                <input type="text" name="landmark" value={address.landmark} onChange={handleAddressChange} placeholder="e.g. Opposite SBI" />
              </div>
              <div className="form-group flex-1">
                <label>{t('pincode')}</label>
                <input type="text" name="pincode" value={address.pincode} onChange={handleAddressChange} maxLength={6} />
                {errors.pincode && <span className="error-msg">{errors.pincode}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Timings Section */}
        <div className="checkout-section">
          <h2><Clock size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }}/> {t('schedule_delivery')}</h2>
          
          <div className="form-group" style={{ marginTop: '12px', marginBottom: '16px' }}>
            <label>{t('select_date')}</label>
            <input 
              type="date" 
              className="date-picker-input"
              value={deliveryDay}
              min={new Date().toISOString().split('T')[0]} // Cannot select past dates
              onChange={(e) => setDeliveryDay(e.target.value as any)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0', width: '100%', marginTop: '8px', fontFamily: 'inherit' }}
            />
          </div>

          <div className="delivery-slots-grid">
            <button className={`slot-card ${deliverySlot === 'mor' ? 'active' : ''}`} onClick={() => setDeliverySlot('mor')}>
              <span className="slot-title">{t('morning')}</span>
              <span className="slot-time">07:00 AM - 10:00 AM</span>
            </button>
            <button className={`slot-card ${deliverySlot === 'aft' ? 'active' : ''}`} onClick={() => setDeliverySlot('aft')}>
              <span className="slot-title">{t('afternoon')}</span>
              <span className="slot-time">12:00 PM - 03:00 PM</span>
            </button>
            <button className={`slot-card ${deliverySlot === 'eve' ? 'active' : ''}`} onClick={() => setDeliverySlot('eve')}>
              <span className="slot-title">{t('evening')}</span>
              <span className="slot-time">05:00 PM - 08:00 PM</span>
            </button>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="checkout-section">
          <h2>{t('payment_method')}</h2>
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
              <div className="payment-icon-wrapper"><Wallet size={20}/></div>
              <span className="payment-name">UPI (GPay, PhonePe, Paytm)</span>
              <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
            </label>
            
            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <div className="payment-icon-wrapper"><CreditCard size={20}/></div>
              <span className="payment-name">Credit / Debit Card</span>
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
            </label>
            
            <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
              <div className="payment-icon-wrapper"><Landmark size={20}/></div>
              <span className="payment-name">Cash on Delivery</span>
              <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
            </label>
          </div>
        </div>

        {/* Order Summary (Bill details again) */}
        <div className="checkout-section">
          <h2>Order Summary</h2>
          <div className="bill-details checkout-bill">
            <div className="bill-row"><span>Item Total ({items.length} items)</span><span>₹{subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="bill-row discount"><span>Discount applied</span><span>-₹{discount.toFixed(2)}</span></div>}
            <div className="bill-row">
              <span>Delivery Fee (Distance: 2km)</span>
              {deliveryFee === 0 ? <span className="free-delivery">FREE</span> : <span>₹{deliveryFee.toFixed(2)}</span>}
            </div>
            <hr className="bill-divider" />
            <div className="bill-row total-row"><span>Total Payable</span><span>₹{total.toFixed(2)}</span></div>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Pay Button */}
      <div className="checkout-bottom-bar">
        <button className="primary-btn checkout-pay-btn" onClick={handlePayNow}>
          {t('pay_now', { total: total.toFixed(2) })}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
