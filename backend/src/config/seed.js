import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env FIRST
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

// console.log("SEED DB USER:", process.env.DB_USER);
// console.log("SEED DB NAME:", process.env.DB_NAME);

// Import database and models AFTER dotenv loads
const { sequelize, connectDB } = await import("./db.js");
const { User, Profile, Skill, Service } = await import("../models/index.js");

const run = async () => {
  try {
    await connectDB();

    await sequelize.sync();

    const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";

    const password = process.env.SEED_ADMIN_PASSWORD || "change-me-immediately";

    const existing = await User.findOne({
      where: { email },
    });

    if (!existing) {
      const passwordHash = await bcrypt.hash(password, 10);

      await User.create({
        name: "Admin",
        email,
        passwordHash,
        role: "admin",
      });

      console.log(
        `Admin user created: ${email} / ${password} (change this immediately)`,
      );
    } else {
      console.log("Admin user already exists, skipping.");
    }

    await Profile.findOrCreate({
      where: { id: 1 },
      defaults: {
        fullName: "Your Name",
        title:
          "AI-Powered Full-Stack Application Developer | IT Officer | Network Engineer | AI Enthusiast",
        tagline: "I build reliable software and the networks it runs on.",
        summary:
          "Placeholder summary - replace via the admin dashboard or PUT /api/profile.",
        yearsExperience: 3,
        location: "Addis Ababa, Ethiopia",
        availability: "Open to opportunities",
        languages: "English, Amharic",
        email: "#",
      },
    });

    const skillSeed = [
      ["frontend", "React", 90],
      ["frontend", "JavaScript", 90],
      ["frontend", "Tailwind CSS", 85],
      ["backend", "Node.js", 85],
      ["backend", "Express.js", 85],
      ["database", "MySQL", 80],
      ["database", "TIDB", 70],
      ["cloud_devops", "postman", 65],
      ["cloud_devops", "Git", 90],
      ["networking", "Cisco / VLAN / Routing", 80],
      ["networking", "Firewall / VPN", 75],
      ["ai_ml", "Prompt Engineering", 80],
      ["ai_ml", "OpenAI API", 75],
    ];

    for (const [category, name, proficiency] of skillSeed) {
      await Skill.findOrCreate({
        where: { name },
        defaults: {
          category,
          proficiency,
        },
      });
    }

    const serviceSeed = [
      [
        "Full-Stack Web Development",
        "End-to-end web apps, from database to deployed UI.",
      ],
      ["Network Infrastructure", "Design and secure LAN/WAN, VLANs, and VPNs."],
      [
        "AI Integration",
        "Add AI assistants and semantic search to existing products.",
      ],
    ];

    for (const [title, description] of serviceSeed) {
      await Service.findOrCreate({
        where: { title },
        defaults: {
          description,
        },
      });
    }

    console.log("Seed complete.");

    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
};

run();
