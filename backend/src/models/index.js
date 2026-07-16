import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './User.js';

export const Profile = sequelize.define('Profile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, defaultValue: 1 },
  fullName: { type: DataTypes.STRING(120), field: 'full_name' },
  title: DataTypes.STRING(180),
  tagline: DataTypes.STRING(255),
  summary: DataTypes.TEXT,
  mission: DataTypes.TEXT,
  yearsExperience: { type: DataTypes.INTEGER, field: 'years_experience' },
  location: DataTypes.STRING(120),
  availability: DataTypes.STRING(80),
  languages: DataTypes.STRING(255),
  email: DataTypes.STRING(160),
  phone: DataTypes.STRING(40),
  whatsapp: DataTypes.STRING(40),
  linkedinUrl: { type: DataTypes.STRING(255), field: 'linkedin_url' },
  githubUrl: { type: DataTypes.STRING(255), field: 'github_url' },
  resumeUrl: { type: DataTypes.STRING(255), field: 'resume_url' },
  photoUrl: { type: DataTypes.STRING(255), field: 'photo_url' },
}, { tableName: 'profile' });

export const Skill = sequelize.define('Skill', {
  category: {
    type: DataTypes.ENUM('frontend', 'backend', 'database', 'cloud_devops', 'networking', 'ai_ml'),
    allowNull: false,
  },
  name: { type: DataTypes.STRING(80), allowNull: false },
  proficiency: { type: DataTypes.TINYINT, defaultValue: 70 },
  icon: DataTypes.STRING(60),
  sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', defaultValue: 0 },
}, { tableName: 'skills' });

export const Project = sequelize.define('Project', {
  title: { type: DataTypes.STRING(160), allowNull: false },
  slug: { type: DataTypes.STRING(180), allowNull: false, unique: true },
  description: DataTypes.TEXT,
  coverImageUrl: { type: DataTypes.STRING(255), field: 'cover_image_url' },
  techStack: { type: DataTypes.STRING(255), field: 'tech_stack' },
  githubUrl: { type: DataTypes.STRING(255), field: 'github_url' },
  liveUrl: { type: DataTypes.STRING(255), field: 'live_url' },
  features: DataTypes.TEXT,
  challenges: DataTypes.TEXT,
  lessonsLearned: { type: DataTypes.TEXT, field: 'lessons_learned' },
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', defaultValue: 0 },
}, { tableName: 'projects' });

export const ProjectScreenshot = sequelize.define('ProjectScreenshot', {
  imageUrl: { type: DataTypes.STRING(255), field: 'image_url', allowNull: false },
}, { tableName: 'project_screenshots' });

export const Experience = sequelize.define('Experience', {
  company: { type: DataTypes.STRING(160), allowNull: false },
  position: { type: DataTypes.STRING(160), allowNull: false },
  startDate: { type: DataTypes.DATEONLY, field: 'start_date' },
  endDate: { type: DataTypes.DATEONLY, field: 'end_date', allowNull: true },
  responsibilities: DataTypes.TEXT,
  technologies: DataTypes.STRING(255),
  achievements: DataTypes.TEXT,
  sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', defaultValue: 0 },
}, { tableName: 'experience' });

export const Education = sequelize.define('Education', {
  degree: { type: DataTypes.STRING(160), allowNull: false },
  institution: { type: DataTypes.STRING(160), allowNull: false },
  graduationYear: { type: DataTypes.INTEGER, field: 'graduation_year' },
  coursework: DataTypes.TEXT,
  achievements: DataTypes.TEXT,
  sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', defaultValue: 0 },
}, { tableName: 'education' });

export const Certificate = sequelize.define('Certificate', {
  title: { type: DataTypes.STRING(180), allowNull: false },
  issuer: { type: DataTypes.STRING(160), allowNull: false },
  issueDate: { type: DataTypes.DATEONLY, field: 'issue_date' },
  credentialId: { type: DataTypes.STRING(120), field: 'credential_id' },
  verifyUrl: { type: DataTypes.STRING(255), field: 'verify_url' },
  imageUrl: { type: DataTypes.STRING(255), field: 'image_url' },
  sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', defaultValue: 0 },
}, { tableName: 'certificates' });

export const Achievement = sequelize.define('Achievement', {
  title: { type: DataTypes.STRING(180), allowNull: false },
  description: DataTypes.TEXT,
  date: DataTypes.DATEONLY,
  category: {
    type: DataTypes.ENUM('award', 'scholarship', 'hackathon', 'competition', 'recognition'),
    defaultValue: 'recognition',
  },
  sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', defaultValue: 0 },
}, { tableName: 'achievements' });

export const Service = sequelize.define('Service', {
  title: { type: DataTypes.STRING(160), allowNull: false },
  description: DataTypes.TEXT,
  icon: DataTypes.STRING(60),
  sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', defaultValue: 0 },
}, { tableName: 'services' });

export const Testimonial = sequelize.define('Testimonial', {
  clientName: { type: DataTypes.STRING(160), field: 'client_name', allowNull: false },
  position: DataTypes.STRING(160),
  company: DataTypes.STRING(160),
  photoUrl: { type: DataTypes.STRING(255), field: 'photo_url' },
  rating: { type: DataTypes.TINYINT, defaultValue: 5 },
  review: { type: DataTypes.TEXT, allowNull: false },
  approved: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'testimonials' });

export const BlogPost = sequelize.define('BlogPost', {
  title: { type: DataTypes.STRING(200), allowNull: false },
  slug: { type: DataTypes.STRING(220), allowNull: false, unique: true },
  excerpt: DataTypes.STRING(400),
  content: DataTypes.TEXT('long'),
  coverImageUrl: { type: DataTypes.STRING(255), field: 'cover_image_url' },
  category: DataTypes.STRING(80),
  published: { type: DataTypes.BOOLEAN, defaultValue: false },
  publishedAt: { type: DataTypes.DATE, field: 'published_at', allowNull: true },
}, { tableName: 'blog_posts' });

export const ContactMessage = sequelize.define('ContactMessage', {
  name: { type: DataTypes.STRING(120), allowNull: false },
  email: { type: DataTypes.STRING(160), allowNull: false },
  subject: DataTypes.STRING(200),
  message: { type: DataTypes.TEXT, allowNull: false },
  readFlag: { type: DataTypes.BOOLEAN, field: 'read_flag', defaultValue: false },
}, { tableName: 'contact_messages' });

export const AnalyticsEvent = sequelize.define('AnalyticsEvent', {
  eventType: {
    type: DataTypes.ENUM('visit', 'resume_download', 'project_view', 'contact_submit'),
    field: 'event_type',
    allowNull: false,
  },
  meta: DataTypes.JSON,
  device: DataTypes.STRING(40),
  country: DataTypes.STRING(80),
}, { tableName: 'analytics_events' });

// Associations
Project.hasMany(ProjectScreenshot, { foreignKey: 'project_id', as: 'screenshots', onDelete: 'CASCADE' });
ProjectScreenshot.belongsTo(Project, { foreignKey: 'project_id' });

export { User };
