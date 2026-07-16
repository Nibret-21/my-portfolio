export const profile = {
  fullName: "Nibret Adamu",
  title:
    "AI-Powered Full-Stack Application Developer | IT Officer | System Administrator | AI Enthusiast",
  tagline:
    "I build software, secure the networks it runs on, and teach it to answer questions about itself.",
  summary:
    "I design and ship full-stack products end to end — from database schema to deployed UI — and pair that with hands-on IT and networking experience: routing, VLANs, firewalls, and infrastructure that keeps things running. Lately I've been layering AI assistants and semantic search on top of both.",
  mission:
    "Build systems people trust: fast, secure, and easy to reason about.",
  yearsExperience: 3,
  location: "Jimma, Ethiopia",
  availability: "Open to full-time & contract roles",
  languages: "English, Amharic",
  email: "nibretadamu7@gmail.com",
  phone: "+251 922251705",
  whatsapp: "+251 922251705",
  linkedinUrl: "https://www.linkedin.com/in/nibret-adamu-303435263/",
  githubUrl: "https://github.com/Nibret-21",
  resumeUrl: "/resume.pdf",
  photoUrl: "/images/profile-photo.jpeg",
};

export const skillCategories = [
  {
    key: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'HTML5 / CSS3', proficiency: 95 },
      { name: 'JavaScript', proficiency: 92 },
      // { name: 'TypeScript', proficiency: 80 },
      { name: 'React', proficiency: 90 },
      { name: 'Tailwind CSS', proficiency: 88 },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', proficiency: 88 },
      { name: 'Express.js', proficiency: 88 },
      { name: 'REST APIs', proficiency: 90 },
      { name: 'Socket.io', proficiency: 65 },
    ],
  },
  {
    key: 'database',
    label: 'Database',
    skills: [
      { name: 'MySQL', proficiency: 85 },
      { name: 'PostgreSQL', proficiency: 70 },
      { name: 'TIDB', proficiency: 72 },
    ],
  },
  {
    key: 'cloud_devops',
    label: 'Cloud & DevOps',
    skills: [
      { name: 'Git / GitHub', proficiency: 92 },
      { name: 'Docker', proficiency: 65 },
      { name: 'Vercel / Netlify', proficiency: 85 },
      // { name: 'AWS', proficiency: 55 },
    ],
  },
  {
    key: 'networking',
    label: 'Networking',
    skills: [
      { name: 'Cisco / Routing / Switching', proficiency: 80 },
      { name: 'VLAN / VPN / Firewall', proficiency: 78 },
      { name: 'Wi-Fi / CCTV / VoIP', proficiency: 70 },
    ],
  },
  {
    key: 'ai_ml',
    label: 'AI & ML',
    skills: [
      { name: 'Prompt Engineering', proficiency: 85 },
      { name: 'OpenAI / Gemini APIs', proficiency: 80 },
      { name: 'RAG & Vector Search', proficiency: 65 },
    ],
  },
];

export const projects = [
  {
    id: 4,
    title: "Evangadi Forum",
    slug: "evangadi-forum",
    description:
      "Q&A forum for a coding bootcamp community with JWT auth and markdown answers.",
    techStack: "React, Node.js, MySQL",
    githubUrl: "https://github.com/Nibret-21/Evangadi_forum_clean",
    liveUrl: "https://evangadiforumga1.netlify.app/",
    featured: false,
  },
  {
    id: 5,
    title: "AI ChatGPT Clone",
    slug: "chatgpt-clone",
    description:
      "A full-stack AI chatbot application with user authentication, persistent chat history, AI-powered conversations, and an intuitive responsive interface built using modern web technologies.",
    techStack: "React, Node.js, Express.js, MySQL, Google Gemini API",

    githubUrl: "https://github.com/Nibret-21/chatgpt-clone",
    liveUrl: "https://gpt-clone-1.netlify.app/",
    featured: false,
  },
  {
    id: 6,
    title: "Netflix Clone",
    slug: "netflix-clone",
    description:
      "A modern Netflix-inspired streaming application with responsive design, dynamic movie catalogs, trending content, genre filtering, search, and movie detail pages using the TMDB API.",
    techStack: "React, React Router, JavaScript, TMDB API, CSS3",
    githubUrl: "https://github.com/Nibret-21/movienetclone",
    liveUrl: "https://movienetclone.netlify.app/",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    company: "Haile resort Jimma",
    position: "IT Officer",
    startDate: "2024-09-01",
    endDate: null,
    responsibilities:
      "Managed LAN/WAN infrastructure, VLAN segmentation, and end-user support for 100+ staff.",
    technologies: "Cisco, Windows Server, VoIP",
  },
  // {
  //   id: 2,
  //   company: "Previous Haile Grand Addis",
  //   position: "other position in hotel operation",
  //   startDate: "2022-07-19",
  //   endDate: "2024-08-31",
  //   responsibilities:
  //     "Managed LAN/WAN infrastructure, VLAN segmentation, and end-user support for 100+ staff.",
  //   technologies: "Cisco, Windows Server, VoIP",
  // },
];

export const education = [
  {
    id: 1,
    degree: "B.Sc. in Computer Science / IT",
    institution: "University of Gondar",
    graduationYear: "on July 08, 2017",
    coursework:
      "Data Structures, Networking, Databases, Java programming, Web Development",
  },
  {
    id: 2,
    degree: "M.Sc in Information Technology",
    institution: "University of Gondar",
    graduationYear: "on October 11, 2021",
    coursework:
      "Advanced Networking principles And Protocols, Distributed computing , information Retrieval, Data mining and machine learning,Adavance Database Management,Artificial Intelligence and Expert Systems",
  },
];

export const certificates = [
  // { id: 1, title: '#', issuer: '#', issueDate: '2023-04-01', verifyUrl: '#' },
  // { id: 2, title: '#', issuer: '#', issueDate: '2023-09-01', verifyUrl: '#' },
];

export const achievements = [
  // { id: 1, title: '#', category: '#', description: '#' },
  // { id: 2, title: "#", category: '#', description: '#' },
];

export const services = [
  { id: 1, title: 'Full-Stack Web Development', description: 'End-to-end apps, from schema to deployed UI.' },
  { id: 2, title: 'Network Infrastructure', description: 'Design and secure LAN/WAN, VLANs, and VPNs.' },
  { id: 3, title: 'AI Integration', description: 'Add AI assistants and semantic search to existing products.' },
];

export const testimonials = [
  { id: 1, clientName: 'A. Colleague', position: 'Product Manager', company: 'Company Name', rating: 5, review: 'Reliable, communicates clearly, and ships on time.' },
  { id: 2, clientName: 'B. Client', position: 'Owner', company: 'Small Business', rating: 5, review: 'Turned a vague idea into a working system in weeks.' },
];
