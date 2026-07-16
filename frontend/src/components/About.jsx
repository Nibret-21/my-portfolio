import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const STATS = (profile) => [
  [`${profile.yearsExperience}+`, 'Years experience'],
  [profile.location, 'Based in'],
  [profile.languages?.split(',').length || 1, 'Languages spoken'],
];

export default function About({ profile }) {
  return (
    <section id="about" className="section-wrap">
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3">
          <SectionHeading eyebrow="About" title="What I do and why" />
          <p className="text-ink-light/80 dark:text-ink-dark/80 leading-relaxed">{profile.summary}</p>
          <p className="mt-4 text-ink-light/80 dark:text-ink-dark/80 leading-relaxed">{profile.mission}</p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {STATS(profile).map(([value, label], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-4 text-center"
              >
                <div className="text-2xl font-display font-semibold gradient-text">{value}</div>
                <div className="text-xs mt-1 text-ink-light/60 dark:text-ink-dark/60">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 glass-panel p-6 space-y-4 h-fit"
        >
          <Row label="Availability" value={profile.availability} />
          <Row label="Location" value={profile.location} />
          <Row label="Languages" value={profile.languages} />
          <Row label="Email" value={profile.email} />
          <a href={profile.resumeUrl} download className="btn-primary w-full justify-center mt-2">
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm border-b border-black/5 dark:border-white/10 pb-3">
      <span className="text-ink-light/50 dark:text-ink-dark/50">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
