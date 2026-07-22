import { useState } from 'react';
import './style/login.css';

const Page = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="login-page">
      <form className="login-form">
        <div className="login-header">
          <h1>Welcome to SMS</h1>
          <p>Sign in to access your Student Management System</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="yourname@gmail.com"
            autoComplete="email"
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

        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Page;
