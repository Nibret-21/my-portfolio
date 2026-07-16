import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { api } from '../api/axios';

const SUGGESTIONS = [
  'What are your strongest skills?',
  'Tell me about your networking experience.',
  'Which project are you most proud of?',
];

export default function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm an AI assistant trained on this portfolio. Ask me about skills, projects, or experience." },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const ask = async (question) => {
    if (!question.trim() || sending) return;
    setMessages((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setSending(true);
    try {
      const { data } = await api.post('/ai/ask', { question });
      setMessages((m) => [...m, { role: 'assistant', text: data.answer }]);
    } catch (err) {
      const msg = err?.response?.data?.error || "I couldn't reach the AI service. Make sure the backend is running and OPENAI_API_KEY is set.";
      setMessages((m) => [...m, { role: 'assistant', text: msg }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-signal text-white grid place-items-center shadow-lg shadow-accent-violet/30"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-sm h-[28rem] glass-panel !bg-base-light/95 dark:!bg-base-dark/95 flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
              <p className="font-medium text-sm">Portfolio Assistant</p>
              <p className="text-xs text-ink-light/50 dark:text-ink-dark/50">Answers grounded in real portfolio data</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] text-sm px-3 py-2 rounded-2xl ${
                  m.role === 'user'
                    ? 'ml-auto bg-gradient-signal text-white rounded-br-sm'
                    : 'bg-black/5 dark:bg-white/10 rounded-bl-sm'
                }`}>
                  {m.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="text-xs px-3 py-1.5 rounded-full glass-panel hover:-translate-y-0.5 transition-transform"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); ask(input); }}
              className="p-3 border-t border-black/5 dark:border-white/10 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-full bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 text-sm outline-none focus:border-accent-cyan"
              />
              <button type="submit" disabled={sending} className="w-9 h-9 shrink-0 grid place-items-center rounded-full bg-gradient-signal text-white disabled:opacity-60">
                <FiSend size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
