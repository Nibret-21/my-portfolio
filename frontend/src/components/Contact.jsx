import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { api } from '../api/axios';
import SectionHeading from './SectionHeading';

export default function Contact({ profile }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const onSubmit = async (values) => {
    setStatus('sending');
    try {
      await api.post('/contact', values);
      setStatus('sent');
      reset();
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-wrap">
      <SectionHeading eyebrow="Contact" title="Let's work together" description="Have a project in mind, or just want to say hi? Send a message." />

      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          <InfoRow icon={<FiMail />} label={profile.email} href={`mailto:${profile.email}`} />
          <InfoRow icon={<FiPhone />} label={profile.phone} href={`tel:${profile.phone}`} />
          <InfoRow icon={<FiMapPin />} label={profile.location} />
          <InfoRow icon={<FiGithub />} label="GitHub" href={profile.githubUrl} />
          <InfoRow icon={<FiLinkedin />} label="LinkedIn" href={profile.linkedinUrl} />
          {profile.whatsapp && (
            <a
              href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full justify-center mt-4"
            >
              Message on WhatsApp
            </a>
          )}
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3 glass-panel p-6 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Name"
              error={errors.name}
              inputProps={register('name', { required: 'Your name is required.' })}
            />
            <Field
              label="Email"
              type="email"
              error={errors.email}
              inputProps={register('email', {
                required: 'Your email is required.',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email.' },
              })}
            />
          </div>
          <Field
            label="Subject"
            inputProps={register('subject')}
          />
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows={5}
              {...register('message', { required: 'Message is required.', minLength: { value: 10, message: 'Say a little more (10+ characters).' } })}
              className="mt-1.5 w-full rounded-lg bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 text-sm outline-none focus:border-accent-cyan transition-colors"
            />
            {errors.message && <p className="text-xs text-accent-coral mt-1">{errors.message.message}</p>}
          </div>

          <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'sent' && <p className="text-sm text-accent-cyan">Message sent — thank you! I'll reply soon.</p>}
          {status === 'error' && (
            <p className="text-sm text-accent-coral">
              Couldn't reach the server. If you're running this frontend standalone, start the backend API too.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, href }) {
  const content = (
    <div className="flex items-center gap-3 glass-panel px-4 py-3">
      <span className="text-accent-cyan">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer" className="block hover:-translate-y-0.5 transition-transform">{content}</a> : content;
}

function Field({ label, type = 'text', error, inputProps }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        {...inputProps}
        className="mt-1.5 w-full rounded-lg bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 text-sm outline-none focus:border-accent-cyan transition-colors"
      />
      {error && <p className="text-xs text-accent-coral mt-1">{error.message}</p>}
    </div>
  );
}
