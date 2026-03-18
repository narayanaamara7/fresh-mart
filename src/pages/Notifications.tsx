import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Info } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Notifications.css';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mockNotifications = [
    {
      id: 1,
      title: t('notif_holiday_title'),
      message: t('notif_holiday_msg'),
      time: '2 hours ago',
      type: 'info'
    },
    {
      id: 2,
      title: t('notif_fresh_arrival_title'),
      message: t('notif_fresh_arrival_msg'),
      time: '5 hours ago',
      type: 'promo'
    }
  ];

  return (
    <div className="profile-container">
      <div className="category-header-bar">
        <button onClick={() => navigate(-1)} className="icon-btn back-btn">
          <ArrowLeft size={24} />
        </button>
        <h1>{t('notifications')}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="notifications-content p-4">
        {mockNotifications.length > 0 ? (
          <div className="notifications-list">
            {mockNotifications.map(notif => (
              <div key={notif.id} className="notification-card">
                <div className={`notif-icon-circle ${notif.type}`}>
                  {notif.type === 'info' ? <Info size={20} /> : <Bell size={20} />}
                </div>
                <div className="notif-details">
                  <div className="notif-header">
                    <h3 className="notif-title">{notif.title}</h3>
                    <span className="notif-time">{notif.time}</span>
                  </div>
                  <p className="notif-message">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Bell size={48} color="var(--text-muted)" />
            <p>{t('no_notifications')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
