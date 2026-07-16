import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiCpu } from 'react-icons/fi';

export default function Hero({ profile }) {
  return (
    <section id="top" className="pt-28 pb-16">
      <div className="section-wrap !py-0">
        <div className="grid md:grid-cols-[220px_1fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-2 w-40 md:w-full mx-auto md:mx-0"
          >
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.fullName}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-square rounded-lg bg-slate-200 dark:bg-slate-700" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="eyebrow mb-3"></p>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
              <span className="gradient-text"></span>{' '}
              <span>{profile.title}</span>
            </h1>
            <p className="mt-4 text-ink-light/70 dark:text-ink-dark/70 max-w-xl">
              {profile.tagline}
            </p>

            <div className="mt-8 flex items-center gap-4 text-lg">
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-accent-cyan transition-colors"><FiGithub /></a>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent-cyan transition-colors"><FiLinkedin /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-accent-cyan transition-colors"><FiMail /></a>
            </div>
          </motion.div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass-panel p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <div className="w-11 h-11 shrink-0 grid place-items-center rounded-lg bg-gradient-signal text-white">
            <FiCpu size={200} />
          </div>
          <p className="text-sm text-ink-light/80 dark:text-ink-dark/80">
            Crafting robust full-stack solutions infused with advanced{' '}
            <span className="text-accent-cyan font-medium">Machine Learning</span> and{' '}
            <span className="text-accent-violet font-medium">Large Language Models</span>.
          </p>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href="#contact" className="btn-primary">Talk to Me</a>
          <a href={profile.resumeUrl} download className="btn-ghost">Download CV</a>
          <a href="#projects" className="btn-ghost">View Projects</a>
        </motion.div>
      </div>
    </section>
  );
}
