import { motion } from 'framer-motion';
import { FiMessageSquare, FiEye, FiTrendingUp, FiZap } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const CAPABILITIES = [
  {
    icon: FiMessageSquare,
    title: 'Natural Language Processing',
    description: 'Chatbots, semantic search, and text classification built on modern LLM APIs.',
  },
  {
    icon: FiEye,
    title: 'Computer Vision',
    description: 'Image recognition and processing pipelines for practical, product-facing use cases.',
  },
  {
    icon: FiTrendingUp,
    title: 'Recommendation Systems',
    description: 'Personalization and ranking logic that adapts to real usage data over time.',
  },
  {
    icon: FiZap,
    title: 'Generative AI',
    description: 'Retrieval-grounded assistants and content tools that stay accurate to a real data source.',
  },
];

export default function AICapabilities() {
  return (
    <section id="ai-capabilities" className="section-wrap">
      <SectionHeading eyebrow="AI Integration" title="AI capabilities" align="center" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAPABILITIES.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto grid place-items-center rounded-full bg-gradient-signal text-white mb-4">
              <Icon size={20} />
            </div>
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="mt-2 text-xs text-ink-light/60 dark:text-ink-dark/60 leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
