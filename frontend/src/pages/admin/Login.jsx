import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-base-light dark:bg-base-dark">
      <form onSubmit={onSubmit} className="glass-panel p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-display font-semibold gradient-text">Admin Login</h1>
        <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">
          Sign in to manage projects, skills, and messages.
        </p>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 text-sm outline-none focus:border-accent-cyan"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 text-sm outline-none focus:border-accent-cyan"
          />
        </div>

        {error && <p className="text-sm text-accent-coral">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-xs text-ink-light/40 dark:text-ink-dark/40">
          Default seed credentials are set via SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in the backend .env — change them after first login.
        </p>
      </form>
    </div>
  );
}
