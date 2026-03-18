import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, MapPin, Clock, CreditCard } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './OrderSuccess.css';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="order-success-container">
      <div className="success-content">
        <div className="success-icon-wrapper">
          <CheckCircle size={80} className="success-icon" />
        </div>
        
        <h2>{t('order_success_title')}</h2>
        <p className="success-msg">
          {t('order_success_msg')}
        </p>

        <div className="order-details-card">
           <div className="detail-item">
            <Package size={20} className="detail-icon" />
            <div className="detail-info">
              <span className="detail-label">{t('order_id')}</span>
              <span className="detail-value">{location.state?.order?.id || 'ORD-UNKNOWN'}</span>
            </div>
          </div>

          <div className="detail-item">
            <MapPin size={20} className="detail-icon" />
            <div className="detail-info">
              <span className="detail-label">{t('delivery_address')}</span>
              <span className="detail-value">
                {location.state?.order?.deliveryAddress?.fullName}<br/>
                {location.state?.order?.deliveryAddress?.street}, {location.state?.order?.deliveryAddress?.landmark && `${location.state?.order?.deliveryAddress?.landmark}, `}{location.state?.order?.deliveryAddress?.pincode}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <Clock size={20} className="detail-icon" />
            <div className="detail-info">
              <span className="detail-label">{t('schedule_delivery')}</span>
              <span className="detail-value">{location.state?.order?.deliverySlot || 'Standard Delivery'}</span>
            </div>
          </div>

          <div className="detail-item">
            <CreditCard size={20} className="detail-icon" />
            <div className="detail-info">
              <span className="detail-label">{t('payment_method')}</span>
              <span className="detail-value">{location.state?.order?.paymentMethod || 'Paid'}</span>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <button className="primary-btn w-full" onClick={() => navigate('/app/orders')}>
            {t('my_orders')}
          </button>
          <button className="text-btn outline-btn mt-3" onClick={() => navigate('/app')}>
            {t('continue_shopping')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
