import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section-wrap">
      <SectionHeading
        eyebrow="Work"
        title="Featured projects"
        description="A selection of things I've built recently, spanning web apps, tooling, and AI integrations."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.id ?? p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="glass-panel p-6 flex flex-col hover:-translate-y-1.5 transition-transform duration-300"
          >
            <div className="rounded-lg overflow-hidden mb-5 border border-black/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-900">
                <span className="w-2 h-2 rounded-full bg-accent-coral/70" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
                <span className="w-2 h-2 rounded-full bg-accent-cyan/70" />
              </div>
              {p.coverImageUrl ? (
                <img src={p.coverImageUrl} alt={p.title} className="h-28 w-full object-cover" />
              ) : (
                <div className="h-28 w-full bg-gradient-signal opacity-90" />
              )}
            </div>
            <h3 className="font-display font-semibold text-lg">{p.title}</h3>
            <p className="mt-2 text-sm text-ink-light/70 dark:text-ink-dark/70 flex-1">{p.description}</p>
            <p className="mt-4 text-xs font-mono text-accent-cyan">{p.techStack}</p>
            <div className="mt-4 flex gap-3 text-sm">
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent-violet transition-colors">
                  <FiGithub /> Code
                </a>
              )}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent-violet transition-colors">
                  <FiExternalLink /> Live
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
