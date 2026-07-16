import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const LINKS = [
  ['Home', '#top'],
  ['Projects', '#projects'],
  ['Tech Stack', '#skills'],
  ['AI Integration', '#ai-capabilities'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

export default function Navbar({ name = 'Your Name' }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-base-light/95 dark:bg-base-dark/95 border-b border-black/5 dark:border-white/10 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="section-wrap !py-0 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-lg tracking-wide uppercase">
          {name}
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-ink-light/70 dark:text-ink-dark/70 hover:text-accent-cyan transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="w-9 h-9 grid place-items-center rounded-full border border-black/10 dark:border-white/15 hover:border-accent-cyan transition-colors"
          >
            {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
          <a href="#contact" className="hidden sm:inline-flex items-center px-4 py-2 rounded-md border border-accent-cyan text-accent-cyan text-sm font-medium hover:bg-accent-cyan hover:text-base-dark transition-colors">
            Get in Touch
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-black/10 dark:border-white/15"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-base-light/98 dark:bg-base-dark/98 md:hidden"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-10 h-10 grid place-items-center rounded-full border border-black/10 dark:border-white/15">
                <FiX />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-6 mt-8">
              {LINKS.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-display"
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
