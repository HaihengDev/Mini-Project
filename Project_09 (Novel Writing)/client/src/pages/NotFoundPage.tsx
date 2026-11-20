import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className='error-page-container'>
      <h1>404 Not Found</h1>
      <button onClick={() => navigate('/')}>back to home</button>
    </section>
  );
}
