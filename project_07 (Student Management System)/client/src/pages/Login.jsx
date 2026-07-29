import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../endpoints/api.js';
import './style/login.css';

const Page = () => {
  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const data = await login(
        formData.email,
        formData.password,
      );

      localStorage.setItem('token', data.token);

      localStorage.setItem(
        'user',
        JSON.stringify(data.user),
      );

      navigate('/home');
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h1>Welcome to SMS</h1>
          <p>Sign in to access your Student Management System</p>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="yourname@gmail.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <div className="password-wrapper">
            <input
              id="password"
              type={isShow ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="password-toggle"
              aria-label="Show password"
              onClick={() => (isShow ? setIsShow(false) : setIsShow(true))}
            >
              {isShow ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" name="remember" />
            <span>Remember me</span>
          </label>

          <a href="/forgot-password">Forgot password?</a>
        </div> */}

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <button
          className="forgot-password"
          type={'button'}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default Page;
