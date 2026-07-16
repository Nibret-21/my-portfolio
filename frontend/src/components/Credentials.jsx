import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

function Card({ icon, title, subtitle, meta, link, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06 }}
      className="glass-panel p-5 flex gap-4"
    >
      <div className="w-10 h-10 shrink-0 grid place-items-center rounded-full bg-gradient-signal text-white">
        {icon}
      </div>
      <div>
        <h4 className="font-medium leading-snug">{title}</h4>
        {subtitle && <p className="text-sm text-ink-light/60 dark:text-ink-dark/60">{subtitle}</p>}
        {meta && <p className="text-xs font-mono text-accent-cyan mt-1">{meta}</p>}
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="text-xs mt-2 inline-block underline underline-offset-2 hover:text-accent-violet">
            Verify credential
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Credentials({ education, certificates, achievements }) {
  return (
    <section id="credentials" className="section-wrap">
      <SectionHeading eyebrow="Credentials" title="Education, certifications & achievements" />

      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wide text-ink-light/50 dark:text-ink-dark/50 mb-4">Education</h3>
          <div className="space-y-4">
            {education.map((ed, i) => (
              <Card key={ed.id ?? i} i={i} icon={<FiBookOpen />} title={ed.degree} subtitle={`${ed.institution} · ${ed.graduationYear}`} meta={ed.coursework} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-mono uppercase tracking-wide text-ink-light/50 dark:text-ink-dark/50 mb-4">Certifications</h3>
          <div className="space-y-4">
            {certificates.map((c, i) => (
              <Card key={c.id ?? i} i={i} icon={<FiCheckCircle />} title={c.title} subtitle={c.issuer} link={c.verifyUrl} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-mono uppercase tracking-wide text-ink-light/50 dark:text-ink-dark/50 mb-4">Achievements</h3>
          <div className="space-y-4">
            {achievements.map((a, i) => (
              <Card key={a.id ?? i} i={i} icon={<FiAward />} title={a.title} subtitle={a.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
