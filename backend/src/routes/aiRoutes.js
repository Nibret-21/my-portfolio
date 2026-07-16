// import { Router } from "express";
// import { GoogleGenAI } from "@google/genai";
// import { Profile, Skill, Project, Experience } from "../models/index.js";

// const router = Router();

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// // Builds a compact context blob from the DB
// async function buildContext() {
//   const [profile, skills, projects, experience] = await Promise.all([
//     Profile.findByPk(1),
//     Skill.findAll(),
//     Project.findAll(),
//     Experience.findAll(),
//   ]);

//   return `
// PROFILE
// Name: ${profile?.fullName}
// Title: ${profile?.title}
// Summary: ${profile?.summary}
// Years of experience: ${profile?.yearsExperience}
// Location: ${profile?.location}

// SKILLS
// ${skills
//   .map((s) => `- [${s.category}] ${s.name} (${s.proficiency}%)`)
//   .join("\n")}

// PROJECTS
// ${projects
//   .map((p) => `- ${p.title}: ${p.description} | Tech: ${p.techStack}`)
//   .join("\n")}

// EXPERIENCE
// ${experience
//   .map((e) => `- ${e.position} at ${e.company}: ${e.responsibilities}`)
//   .join("\n")}
// `.trim();
// }

// router.post("/ask", async (req, res, next) => {
//   try {
//     const { question } = req.body;

//     if (!question?.trim()) {
//       return res.status(400).json({
//         error: "A question is required.",
//       });
//     }

//     if (!process.env.GEMINI_API_KEY) {
//       return res.status(503).json({
//         error:
//           "AI assistant is not configured. Set GEMINI_API_KEY in your .env.",
//       });
//     }

//     const context = await buildContext();

//     const prompt = `
// You are a helpful assistant embedded in a software engineer's portfolio website.

// Rules:
// - Answer ONLY using the CONTEXT below.
// - Be concise (2-4 sentences).
// - Be friendly and professional.
// - If the answer is not found in the context, say:
// "I don't have that information in my portfolio. Please use the contact form for additional questions."

// CONTEXT

// ${context}

// QUESTION

// ${question}
// `;

//     const result = await ai.models.generateContent({
//       model: process.env.AI_MODEL || "gemini-2.5-flash-lite",
//       contents: prompt,
//     });

//     const answer = result.text?.trim() || "I couldn't generate a response.";

//     res.json({ answer });
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;
import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { Profile, Skill, Project, Experience } from "../models/index.js";

const router = Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function buildContext() {
  const [profile, skills, projects, experience] = await Promise.all([
    Profile.findByPk(1),
    Skill.findAll(),
    Project.findAll(),
    Experience.findAll(),
  ]);

  return `
PROFILE
Name: ${profile?.fullName}
Title: ${profile?.title}
Summary: ${profile?.summary}
Years of experience: ${profile?.yearsExperience}
Location: ${profile?.location}

SKILLS
${skills
  .map((s) => `- [${s.category}] ${s.name} (${s.proficiency}%)`)
  .join("\n")}

PROJECTS
${projects
  .map((p) => `- ${p.title}: ${p.description} | Tech: ${p.techStack}`)
  .join("\n")}

EXPERIENCE
${experience
  .map((e) => `- ${e.position} at ${e.company}: ${e.responsibilities}`)
  .join("\n")}
`.trim();
}

router.post("/ask", async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({
        error: "A question is required.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is missing.",
      });
    }

    const context = await buildContext();

    const prompt = `
You are a helpful AI assistant inside a developer portfolio website.

Rules:
- Answer only from the portfolio context.
- Keep answers short (2-4 sentences).
- Be professional.
- If information is missing say:
"I don't have that information in my portfolio. Please use the contact form."

PORTFOLIO CONTEXT:

${context}


USER QUESTION:

${question}
`;

    const result = await ai.models.generateContent({
      model: process.env.AI_MODEL || "gemini-2.5-flash",
      contents: prompt,
    });

    const answer = result.text?.trim() || "I couldn't generate a response.";

    res.json({
      answer,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    next(error);
  }
});

export default router;