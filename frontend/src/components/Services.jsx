import { motion } from 'framer-motion';
import { FiCode, FiServer, FiCpu, FiShield, FiDatabase, FiCloud } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const ICONS = [FiCode, FiServer, FiDatabase, FiShield, FiCloud, FiCpu];

export default function Services({ items }) {
  return (
    <section id="services" className="section-wrap">
      <SectionHeading eyebrow="Services" title="How I can help" />
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={s.id ?? i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-11 h-11 grid place-items-center rounded-xl bg-gradient-signal text-white mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-light/70 dark:text-ink-dark/70">{s.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
