import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present');

export default function Experience({ items }) {
  return (
    <section id="experience" className="section-wrap">
      <SectionHeading eyebrow="Career" title="Experience" />

      <div className="relative pl-8 border-l border-black/10 dark:border-white/10 space-y-10">
        {items.map((e, i) => (
          <motion.div
            key={e.id ?? i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[2.35rem] top-1 w-3 h-3 rounded-full bg-gradient-signal" />
            <p className="text-xs font-mono text-accent-cyan">
              {fmt(e.startDate)} — {fmt(e.endDate)}
            </p>
            <h3 className="font-display font-semibold text-lg mt-1">{e.position}</h3>
            <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">{e.company}</p>
            <p className="mt-3 text-sm text-ink-light/80 dark:text-ink-dark/80">{e.responsibilities}</p>
            {e.technologies && (
              <p className="mt-2 text-xs font-mono text-ink-light/50 dark:text-ink-dark/50">{e.technologies}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
