import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';

export default function Skills({ categories }) {
  const [active, setActive] = useState(categories[0]?.key);
  const current = categories.find((c) => c.key === active) || categories[0];

  return (
    <section id="skills" className="section-wrap">
      <SectionHeading eyebrow="Tech Stack" title="My tech universe" description="Organized by category — click one to filter." />

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === c.key
                ? 'bg-gradient-signal text-white shadow-md'
                : 'glass-panel hover:-translate-y-0.5'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-x-10 gap-y-6"
        >
          {current?.skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{s.name}</span>
                <span className="font-mono text-ink-light/50 dark:text-ink-dark/50">{s.proficiency}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-signal rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
