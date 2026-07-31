import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../endpoints/auth.js';
import './style/verify-otp.css';

const Page = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input when pressing Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const email = sessionStorage.getItem('resetEmail');

    if(!email) {
      setError('Email is required. Please request a new OTP.');
      return;
    }

    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOtp(email, otpCode);

      if (!data.success) {
        setError(data.message);
        return;
      }

      sessionStorage.setItem('resetOtp', otpCode);

      navigate('/reset-password');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-otp-page">
      {' '}
      <form className="verify-otp-form" onSubmit={handleSubmit}>
        {' '}
        <div className="verify-otp-header">
          {' '}
          <h1>Verify OTP</h1>
          <p>Enter the 6-digit OTP sent to your email.</p>
        </div>
        {error && <div className="verify-otp-error">{error}</div>}
        <div className="otp-input-container">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              className="otp-input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`OTP digit ${index + 1}`}
              required
            />
          ))}
        </div>
        <button type="submit" className="verify-otp-button" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        <button
          type="button"
          className="back-to-forgot-password"
          onClick={() => navigate('/forgot-password')}
        >
          Back to Forgot Password
        </button>
      </form>
    </div>
  );
};

export default Page;
