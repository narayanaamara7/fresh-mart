import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/useStore';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Orders.css';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return 'status-success';
    case 'Processing': return 'status-warning';
    case 'Pending': return 'status-info';
    case 'Cancelled': return 'status-error';
    case 'Returned': return 'status-secondary';
    default: return 'status-default';
  }
};

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const orders = useOrderStore(state => state.orders);

  return (
    <div className="orders-container">
      <div className="checkout-header">
        <button className="icon-btn back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>{t('my_orders')}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="orders-list">
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-light)' }}>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="order-id-section">
                <span className="order-id-label">{t('order_id')}</span>
                <span className="order-id-value">{order.id}</span>
              </div>
              <span className={`status-badge ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <div className="order-card-body">
              <div className="order-detail-row">
                <span className="detail-label">{t('date')}:</span>
                <span className="detail-value">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="order-detail-row">
                <span className="detail-label">{t('items')}:</span>
                <span className="detail-value">{order.items.length} {t('items')}</span>
              </div>
              <div className="order-detail-row">
                <span className="detail-label">{t('total_amount')}:</span>
                <span className="detail-value font-bold">₹{order.total}</span>
              </div>
            </div>

            <div className="order-card-footer">
              <button 
                className="text-btn secondary-text" 
                onClick={() => navigate(`/app/order/${order.id}`)}
              >
                {t('view_details')}
              </button>
              
              {order.status === 'Processing' && (
                <button 
                  className="text-btn status-success"
                  onClick={() => useOrderStore.getState().updateOrderStatus(order.id, 'Delivered')}
                  style={{ fontSize: '0.8rem', opacity: 0.8 }}
                >
                  [Dev: Mark Delivered]
                </button>
              )}
              
              {order.status === 'Delivered' && (
                <button 
                  className="return-btn"
                  onClick={() => navigate(`/app/return/${order.id}`)}
                >
                  <RefreshCcw size={14} className="mr-1" />
                  {t('return_refund')}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
