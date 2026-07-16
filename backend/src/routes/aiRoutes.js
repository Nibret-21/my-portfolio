// import { Router } from 'express';
// import { Profile, Skill, Project, Experience } from '../models/index.js';

// const router = Router();

// // Builds a compact context blob from the DB so the model only talks about real data.
// // NOTE: this is "RAG-lite" - it stuffs everything into the prompt, which is fine at
// // portfolio scale (a few dozen records). If you outgrow that, swap this for real
// // embeddings + a vector store (pgvector / Pinecone / etc.) and retrieve top-k chunks
// // instead of the whole context.
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
// ${skills.map((s) => `- [${s.category}] ${s.name} (${s.proficiency}%)`).join('\n')}

// PROJECTS
// ${projects.map((p) => `- ${p.title}: ${p.description} | Tech: ${p.techStack}`).join('\n')}

// EXPERIENCE
// ${experience.map((e) => `- ${e.position} at ${e.company}: ${e.responsibilities}`).join('\n')}
// `.trim();
// }

// router.post('/ask', async (req, res, next) => {
//   try {
//     const { question } = req.body;
//     if (!question || !question.trim()) {
//       return res.status(400).json({ error: 'A question is required.' });
//     }

//     if (!process.env.OPENAI_API_KEY) {
//       return res.status(503).json({
//         error: 'AI assistant is not configured. Set OPENAI_API_KEY in the backend .env to enable it.',
//       });
//     }

//     const context = await buildContext();

//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: process.env.AI_MODEL || 'gpt-4o-mini',
//         messages: [
//           {
//             role: 'system',
//             content:
//               'You are a helpful assistant embedded in a software engineer\'s portfolio site. ' +
//               'Answer visitor questions ONLY using the CONTEXT below. Be concise (2-4 sentences), ' +
//               'friendly, and specific. If the answer is not in the context, say you don\'t have that ' +
//               'information and suggest using the contact form.\n\nCONTEXT:\n' +
//               context,
//           },
//           { role: 'user', content: question },
//         ],
//         temperature: 0.4,
//         max_tokens: 300,
//       }),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       throw Object.assign(new Error(data?.error?.message || 'AI provider error.'), { status: 502 });
//     }

//     const answer = data.choices?.[0]?.message?.content?.trim() || "I couldn't generate a response.";
//     res.json({ answer });
//   } catch (err) {
//     next(err);
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

// Builds a compact context blob from the DB
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
        error:
          "AI assistant is not configured. Set GEMINI_API_KEY in your .env.",
      });
    }

    const context = await buildContext();

    const prompt = `
You are a helpful assistant embedded in a software engineer's portfolio website.

Rules:
- Answer ONLY using the CONTEXT below.
- Be concise (2-4 sentences).
- Be friendly and professional.
- If the answer is not found in the context, say:
"I don't have that information in my portfolio. Please use the contact form for additional questions."

CONTEXT

${context}

QUESTION

${question}
`;

    const result = await ai.models.generateContent({
      model: process.env.AI_MODEL || "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const answer = result.text?.trim() || "I couldn't generate a response.";

    res.json({ answer });
  } catch (error) {
    next(error);
  }
});

export default router;