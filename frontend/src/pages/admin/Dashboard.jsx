import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const TABS = ['Overview', 'Messages', 'Projects'];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Overview');

  useEffect(() => {
    if (!user) navigate('/admin/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-light dark:bg-base-dark">
      <header className="section-wrap !py-6 flex items-center justify-between border-b border-black/5 dark:border-white/10">
        <div>
          <h1 className="font-display font-semibold text-lg gradient-text">Admin Dashboard</h1>
          <p className="text-sm text-ink-light/50 dark:text-ink-dark/50">Signed in as {user.email}</p>
        </div>
        <button onClick={() => { logout(); navigate('/'); }} className="btn-ghost text-sm">Log out</button>
      </header>

      <div className="section-wrap !py-8">
        <div className="flex gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${tab === t ? 'bg-gradient-signal text-white' : 'glass-panel'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Overview' && <Overview />}
        {tab === 'Messages' && <Messages />}
        {tab === 'Projects' && <ProjectsAdmin />}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="glass-panel p-5">
      <p className="text-2xl font-display font-semibold gradient-text">{value ?? '—'}</p>
      <p className="text-sm text-ink-light/50 dark:text-ink-dark/50 mt-1">{label}</p>
    </div>
  );
}

function Overview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/analytics').then((r) => setStats(r.data)).catch(() => setError('Could not load analytics.'));
  }, []);

  if (error) return <p className="text-accent-coral text-sm">{error}</p>;

  return (
    <div className="grid sm:grid-cols-3 gap-5">
      <StatCard label="Total visits" value={stats?.totalVisits} />
      <StatCard label="Resume downloads" value={stats?.resumeDownloads} />
      <StatCard label="Contact submissions" value={stats?.contactSubmits} />
      <div className="glass-panel p-5 sm:col-span-3">
        <p className="text-sm font-medium mb-3">Most viewed projects</p>
        <ul className="space-y-2 text-sm">
          {stats?.topProjects?.map((p) => (
            <li key={p.id} className="flex justify-between border-b border-black/5 dark:border-white/10 pb-2">
              <span>{p.title}</span>
              <span className="font-mono text-ink-light/50 dark:text-ink-dark/50">{p.views} views</span>
            </li>
          )) || <p className="text-ink-light/40 dark:text-ink-dark/40">No data yet.</p>}
        </ul>
      </div>
    </div>
  );
}

function Messages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const load = () => api.get('/contact').then((r) => setMessages(r.data)).catch(() => setError('Could not load messages.'));
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    load();
  };

  if (error) return <p className="text-accent-coral text-sm">{error}</p>;

  return (
    <div className="space-y-3">
      {messages.length === 0 && <p className="text-sm text-ink-light/50 dark:text-ink-dark/50">No messages yet.</p>}
      {messages.map((m) => (
        <div key={m.id} className="glass-panel p-4 flex justify-between items-start gap-4">
          <div>
            <p className="text-sm font-medium">{m.name} · <span className="text-ink-light/50 dark:text-ink-dark/50">{m.email}</span></p>
            {m.subject && <p className="text-xs mt-0.5 text-accent-cyan">{m.subject}</p>}
            <p className="text-sm mt-2 text-ink-light/80 dark:text-ink-dark/80">{m.message}</p>
          </div>
          {!m.readFlag && (
            <button onClick={() => markRead(m.id)} className="text-xs px-3 py-1.5 rounded-full glass-panel shrink-0">
              Mark read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// Demonstrates the CRUD pattern used by /api/projects — replicate this shape
// for skills, experience, education, certificates, achievements, services, blog.
function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', slug: '', description: '', techStack: '' });
  const [error, setError] = useState('');

  const load = () => api.get('/projects').then((r) => setProjects(r.data)).catch(() => setError('Could not load projects.'));
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', form);
      setForm({ title: '', slug: '', description: '', techStack: '' });
      load();
    } catch (err) {
      setError(err?.response?.data?.error || 'Could not create project.');
    }
  };

  const remove = async (id) => {
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-3">
        {error && <p className="text-accent-coral text-sm">{error}</p>}
        {projects.map((p) => (
          <div key={p.id} className="glass-panel p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{p.title}</p>
              <p className="text-xs text-ink-light/50 dark:text-ink-dark/50">{p.techStack}</p>
            </div>
            <button onClick={() => remove(p.id)} className="text-xs px-3 py-1.5 rounded-full glass-panel text-accent-coral">
              Delete
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={create} className="glass-panel p-5 space-y-3 h-fit">
        <p className="text-sm font-medium">Add project</p>
        {['title', 'slug', 'description', 'techStack'].map((field) => (
          <input
            key={field}
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
            required={field === 'title' || field === 'slug'}
            className="w-full rounded-lg bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-2 text-sm outline-none focus:border-accent-cyan"
          />
        ))}
        <button type="submit" className="btn-primary w-full justify-center">Add</button>
      </form>
    </div>
  );
}
