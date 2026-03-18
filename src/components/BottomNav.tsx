import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './BottomNav.css';

const BottomNav: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="bottom-nav">
      <NavLink to="/app" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/app/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Grid size={24} />
        <span>Categories</span>
      </NavLink>
      <NavLink to="/app/cart" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="cart-nav-icon">
          <ShoppingBag size={24} />
        </div>
        <span>{t('cart')}</span>
      </NavLink>
      <NavLink to="/app/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User size={24} />
        <span>{t('profile')}</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
