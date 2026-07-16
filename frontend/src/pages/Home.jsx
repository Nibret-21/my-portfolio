import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import AICapabilities from '../components/AICapabilities';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Credentials from '../components/Credentials';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AIAssistantWidget from '../components/AIAssistantWidget';
import { useApiData } from '../hooks/useApiData';
import { api } from '../api/axios';
import * as placeholder from '../data/placeholder';

export default function Home() {
  const { data: profile } = useApiData('/profile', placeholder.profile);
  const { data: skillsRaw } = useApiData('/skills', null);
  const { data: projects } = useApiData('/projects', placeholder.projects);
  const { data: experience } = useApiData('/experience', placeholder.experience);
  const { data: education } = useApiData('/education', placeholder.education);
  const { data: certificates } = useApiData('/certificates', placeholder.certificates);
  const { data: achievements } = useApiData('/achievements', placeholder.achievements);
  const { data: services } = useApiData('/services', placeholder.services);
  const { data: testimonials } = useApiData('/testimonials', placeholder.testimonials);

  useEffect(() => {
    api.post('/analytics/track', { eventType: 'visit', device: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop' }).catch(() => {});
  }, []);

  // Skills come back flat from the API; group them into the shape the Skills component expects.
  const skillCategories = groupSkills(skillsRaw) ?? placeholder.skillCategories;

  return (
    <>
      <Navbar name={profile.fullName} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills categories={skillCategories} />
        <AICapabilities />
        <Projects projects={projects} />
        <Experience items={experience} />
        <Credentials education={education} certificates={certificates} achievements={achievements} />
        <Services items={services} />
        <Testimonials items={testimonials} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      <AIAssistantWidget />
    </>
  );
}

const LABELS = {
  frontend: 'Frontend', backend: 'Backend', database: 'Database',
  cloud_devops: 'Cloud & DevOps', networking: 'Networking', ai_ml: 'AI & ML',
};

function groupSkills(flat) {
  if (!flat || !Array.isArray(flat) || flat.length === 0) return null;
  const byCategory = {};
  for (const s of flat) {
    if (!byCategory[s.category]) byCategory[s.category] = [];
    byCategory[s.category].push(s);
  }
  return Object.entries(byCategory).map(([key, skills]) => ({
    key, label: LABELS[key] || key, skills,
  }));
}
