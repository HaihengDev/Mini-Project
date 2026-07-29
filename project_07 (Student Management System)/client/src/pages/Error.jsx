import { useNavigate } from 'react-router-dom';
import './style/error.css';

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-code">404</div>

        <h1>Page Not Found</h1>

        <p>
          Sorry, the page you are looking for doesn't exist
          or may have been moved.
        </p>

        <button
          className="error-home-button"
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}