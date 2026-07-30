import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../endpoints/auth.js';
import './style/reset-password.css';

const Page = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem('resetEmail');
  const otp = sessionStorage.getItem('resetOtp');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword(email, otp, newPassword);

      if (!data.success) {
        setError(data.message);
        return;
      }

      setMessage('Password reset successfully.');

      sessionStorage.removeItem('resetEmail');
      sessionStorage.removeItem('resetOtp');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      {' '}
      <form className="reset-password-form" onSubmit={handleSubmit}>
        {' '}
        <div className="reset-password-header">
          {' '}
          <h1>Reset Password</h1>
          <p>Enter your new password below to reset your account password.</p>
        </div>
        {error && <div className="reset-password-error">{error}</div>}
        <div className="reset-password-group">
          <label htmlFor="new-password">New Password</label>

          <div className="password-wrapper">
            <input
              id="new-password"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="reset-password-group">
          <label htmlFor="confirm-password">Confirm Password</label>

          <div className="password-wrapper">
            <input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="reset-password-button"
          disabled={loading}
        >
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </button>
        {message && <p className="reset-password-message">{message}</p>}
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
