import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Leaf } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Profile.css';

const About: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="profile-container">
      <div className="category-header-bar">
        <button onClick={() => navigate(-1)} className="icon-btn back-btn">
          <ArrowLeft size={24} />
        </button>
        <h1>{t('about_raithu_bazzar')}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="profile-content p-6">
        <div className="about-hero">
          <div className="about-logo">
             <Leaf size={40} color="white" />
          </div>
          <h2>FreshMart Jaggayyapeta</h2>
          <p>Version 1.0.0</p>
        </div>

        <div className="about-story mt-8">
          <h3>{t('our_mission')}</h3>
          <p>
            Directly connecting Jaggayyapeta's local farmers with customers. 
            We ensure the freshest vegetables and fruits reach your doorstep 
            within hours of being harvested from Raithu Bazzar.
          </p>
          
          <div className="about-stats mt-6">
            <div className="stat-card">
              <h4>100%</h4>
              <span>Fresh</span>
            </div>
            <div className="stat-card">
              <h4>30+</h4>
              <span>Farmers</span>
            </div>
            <div className="stat-card">
              <h4>500+</h4>
              <span>Happy Users</span>
            </div>
          </div>

          <h3 className="mt-8">Why Choose Us?</h3>
          <ul className="about-list">
            <li><Heart size={16} /> Supporting Local Farmers</li>
            <li><Heart size={16} /> Chemical Free Produce</li>
            <li><Heart size={16} /> Sustainable Packaging</li>
            <li><Heart size={16} /> Fair Pricing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
