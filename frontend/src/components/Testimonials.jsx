import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

export default function Testimonials({ items }) {
  if (!items?.length) return null;
  return (
    <section id="testimonials" className="section-wrap">
      <SectionHeading eyebrow="Feedback" title="What people say" />
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((t, i) => (
          <motion.blockquote
            key={t.id ?? i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel p-6"
          >
            <div className="flex gap-1 text-accent-coral mb-3">
              {Array.from({ length: t.rating || 5 }).map((_, s) => <FiStar key={s} fill="currentColor" />)}
            </div>
            <p className="text-ink-light/85 dark:text-ink-dark/85 leading-relaxed">"{t.review}"</p>
            <footer className="mt-4 text-sm">
              <span className="font-medium">{t.clientName}</span>
              <span className="text-ink-light/50 dark:text-ink-dark/50"> · {t.position}{t.company ? `, ${t.company}` : ''}</span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
