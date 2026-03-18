import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
