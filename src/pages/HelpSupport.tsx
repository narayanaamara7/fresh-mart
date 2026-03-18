import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones, MessageSquare, Phone, Mail } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Profile.css';

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="profile-container">
      <div className="category-header-bar">
        <button onClick={() => navigate(-1)} className="icon-btn back-btn">
          <ArrowLeft size={24} />
        </button>
        <h1>{t('help_support')}</h1>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="profile-content p-6">
        <div className="help-hero">
          <Headphones size={64} color="var(--primary)" />
          <h2>{t('how_can_we_help')}</h2>
          <p>{t('available_hours')}</p>
        </div>

        <div className="help-options grid gap-4 mt-8">
          <button className="help-card">
            <MessageSquare size={24} />
            <div className="help-card-text">
              <h4>Chat with Us</h4>
              <p>Start a conversation now</p>
            </div>
          </button>

          <button className="help-card">
            <Phone size={24} />
            <div className="help-card-text">
              <h4>{t('call_us')}</h4>
              <p>+91 98765 43210</p>
            </div>
          </button>

          <button className="help-card">
            <Mail size={24} />
            <div className="help-card-text">
              <h4>Email Us</h4>
              <p>support@freshmart.com</p>
            </div>
          </button>
        </div>

        <div className="faq-section mt-10">
          <h3>{t('common_questions')}</h3>
          <div className="faq-item">
            <h4>When will my order arrive?</h4>
            <p>Your order will arrive as per the time slot selected during checkout.</p>
          </div>
          <div className="faq-item">
            <h4>How do I return items?</h4>
            <p>You can request a return from the 'My Orders' section within 24 hours of delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
