import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useStore';
import { Leaf } from 'lucide-react';
import './Login.css';

const Login: React.FC = () => {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    // Mock login for any 6 digits
    login(mobile, 'Guest User');
    navigate('/app');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-icon">
            <Leaf size={32} color="var(--primary)" />
          </div>
          <h1>FreshMart</h1>
          <p>Fresh groceries delivered to your door in Jaggayyapeta</p>
        </div>

        {step === 'mobile' ? (
          <form className="login-form" onSubmit={handleMobileSubmit}>
            <h2>Log in or Sign up</h2>
            <div className="input-group">
              <span className="input-prefix">+91</span>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="mobile-input"
                autoFocus
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="primary-btn">Continue</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleOtpSubmit}>
            <h2>Enter OTP</h2>
            <p className="subtitle">We've sent a 6-digit code to +91 {mobile}</p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="otp-input"
                autoFocus
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.25rem' }}
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="primary-btn">Verify & Proceed</button>
            <button 
              type="button" 
              className="text-btn mt-4" 
              onClick={() => setStep('mobile')}
            >
              Change Mobile Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
