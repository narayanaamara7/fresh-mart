import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import './Layout.css';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Hide global navigation on checkout and order success screens to focus user
  const hideNav = location.pathname.includes('/checkout') || 
                  location.pathname.includes('/order-success');

  return (
    <div className="layout-container">
      {!hideNav && <Navbar />}
      <main className={`layout-main ${hideNav ? 'no-nav' : ''}`}>
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default Layout;
