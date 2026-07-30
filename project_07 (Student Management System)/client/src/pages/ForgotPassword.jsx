import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../endpoints/auth.js';
import './style/forgot-password.css';

const Page = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');
    setLoading(true);

    try {
      const data = await forgotPassword(email);

      if (!data.success) {
        setError(data.message);
        return;
      }

      sessionStorage.setItem('resetEmail', email);

      setMessage(data.message);

      navigate('/verify-otp');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      {' '}
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        {' '}
        <div className="forgot-password-header">
          {' '}
          <h1>Forgot Password?</h1>
          <p>
            Enter your email address and we'll send you an OTP to reset your
            password.
          </p>
        </div>
        {error && <div className="forgot-password-error">{error}</div>}
        <div className="forgot-password-group">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="yourname@gmail.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="forgot-password-button"
          disabled={loading}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
        {message && <p className="forgot-password-message">{message}</p>}
        <button
          type="button"
          className="back-to-login"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Page;
