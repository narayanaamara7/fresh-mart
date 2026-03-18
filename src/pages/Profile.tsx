import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useStore';
import { User, MapPin, Package, LogOut, ChevronRight, HelpCircle, Info, Languages, Bell } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Profile.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, language, setLanguage } = useAuthStore();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{t('profile')}</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <User size={32} color="white" />
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>+91 {user.mobile}</p>
        </div>
        <button className="edit-profile-btn">Edit</button>
      </div>

      <div className="profile-menu">
        <div className="menu-group">
          <button className="menu-item" onClick={() => navigate('/app/orders')}>
            <div className="menu-icon-wrapper bg-blue">
              <Package size={20} />
            </div>
            <span className="menu-text">{t('my_orders')}</span>
            <ChevronRight size={20} className="menu-arrow" />
          </button>
          
          <button className="menu-item" onClick={() => navigate('/app/addresses')}>
            <div className="menu-icon-wrapper bg-green">
              <MapPin size={20} />
            </div>
            <span className="menu-text">{t('saved_addresses')}</span>
            <ChevronRight size={20} className="menu-arrow" />
          </button>

          <button className="menu-item" onClick={() => navigate('/app/notifications')}>
            <div className="menu-icon-wrapper bg-red">
              <Bell size={20} />
            </div>
            <span className="menu-text">{t('notifications')}</span>
            <ChevronRight size={20} className="menu-arrow" />
          </button>
        </div>

        <div className="menu-group mt-6">
          <button className="menu-item" onClick={() => navigate('/app/help')}>
            <div className="menu-icon-wrapper bg-purple">
              <HelpCircle size={20} />
            </div>
            <span className="menu-text">{t('help_support')}</span>
            <ChevronRight size={20} className="menu-arrow" />
          </button>
          
          <button className="menu-item" onClick={() => navigate('/app/about')}>
            <div className="menu-icon-wrapper bg-orange">
              <Info size={20} />
            </div>
            <span className="menu-text">{t('about_raithu_bazzar')}</span>
            <ChevronRight size={20} className="menu-arrow" />
          </button>
        </div>

        <div className="menu-group mt-6">
          <button className="menu-item" onClick={toggleLanguage}>
            <div className="menu-icon-wrapper bg-indigo">
              <Languages size={20} />
            </div>
            <div className="menu-text-column">
              <span className="menu-text">{t('language')}</span>
              <span className="menu-subtext">{language === 'en' ? 'English' : 'తెలుగు'}</span>
            </div>
            <div className="language-switch-indicator">
              {language === 'en' ? 'Select తెలుగు' : 'Select English'}
            </div>
          </button>
        </div>

        <button className="logout-btn mt-8" onClick={handleLogout}>
          <LogOut size={20} className="mr-2" />
          {t('logout_btn')}
        </button>
      </div>
    </div>
  );
};

export default Profile;
