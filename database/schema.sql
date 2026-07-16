-- ============================================================
-- Portfolio Database Schema (MySQL 8+)
-- Run: mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- ---------- Admin users ----------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- Profile (singleton row, id = 1) ----------
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  full_name VARCHAR(120) NOT NULL,
  title VARCHAR(180) NOT NULL,
  tagline VARCHAR(255),
  summary TEXT,
  mission TEXT,
  years_experience INT DEFAULT 0,
  location VARCHAR(120),
  availability VARCHAR(80),
  languages VARCHAR(255),
  email VARCHAR(160),
  phone VARCHAR(40),
  whatsapp VARCHAR(40),
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  resume_url VARCHAR(255),
  photo_url VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---------- Skills ----------
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category ENUM('frontend','backend','database','cloud_devops','networking','ai_ml') NOT NULL,
  name VARCHAR(80) NOT NULL,
  proficiency TINYINT NOT NULL DEFAULT 70, -- 0-100
  icon VARCHAR(60),
  sort_order INT DEFAULT 0
);

-- ---------- Projects ----------
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  description TEXT,
  cover_image_url VARCHAR(255),
  tech_stack VARCHAR(255), -- comma-separated
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  features TEXT,           -- JSON array as text
  challenges TEXT,
  lessons_learned TEXT,
  featured BOOLEAN DEFAULT FALSE,
  views INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_screenshots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ---------- Experience ----------
CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(160) NOT NULL,
  position VARCHAR(160) NOT NULL,
  start_date DATE,
  end_date DATE NULL, -- NULL = present
  responsibilities TEXT, -- JSON array as text
  technologies VARCHAR(255),
  achievements TEXT,
  sort_order INT DEFAULT 0
);

-- ---------- Education ----------
CREATE TABLE IF NOT EXISTS education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  degree VARCHAR(160) NOT NULL,
  institution VARCHAR(160) NOT NULL,
  graduation_year YEAR,
  coursework TEXT,
  achievements TEXT,
  sort_order INT DEFAULT 0
);

-- ---------- Certifications ----------
CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  issuer VARCHAR(160) NOT NULL,
  issue_date DATE,
  credential_id VARCHAR(120),
  verify_url VARCHAR(255),
  image_url VARCHAR(255),
  sort_order INT DEFAULT 0
);

-- ---------- Achievements ----------
CREATE TABLE IF NOT EXISTS achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  date DATE,
  category ENUM('award','scholarship','hackathon','competition','recognition') DEFAULT 'recognition',
  sort_order INT DEFAULT 0
);

-- ---------- Services ----------
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  icon VARCHAR(60),
  sort_order INT DEFAULT 0
);

-- ---------- Testimonials ----------
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(160) NOT NULL,
  position VARCHAR(160),
  company VARCHAR(160),
  photo_url VARCHAR(255),
  rating TINYINT DEFAULT 5,
  review TEXT NOT NULL,
  approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- Blog ----------
CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  excerpt VARCHAR(400),
  content LONGTEXT,
  cover_image_url VARCHAR(255),
  category VARCHAR(80),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- Contact messages ----------
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  read_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------- Analytics events ----------
CREATE TABLE IF NOT EXISTS analytics_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_type ENUM('visit','resume_download','project_view','contact_submit') NOT NULL,
  meta JSON NULL,
  device VARCHAR(40),
  country VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed a default admin user (password: change-me-immediately, hashed with bcrypt in seed.js instead of here)
-- See backend/src/config/seed.js for a scripted seed with a bcrypt hash.
