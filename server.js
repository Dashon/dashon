import express from 'express';
import { createServer as createViteServer } from 'vite';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const PORT = process.env.PORT || 3001;

// ── Rate limiting (server-side, per IP) ──────────────────────────────────────
const rateLimitMap = new Map(); // ip -> { timestamps: [], total: 0 }
const MAX_PER_MINUTE = 5;
const MAX_PER_SESSION_KEY = 20; // tracked by IP per server restart
const RATE_WINDOW_MS = 60_000;
const CLEANUP_INTERVAL_MS = 5 * 60_000;

function checkServerRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { timestamps: [], total: 0 };
  const recent = entry.timestamps.filter((t) => now - t < RATE_WINDOW_MS);

  if (entry.total >= MAX_PER_SESSION_KEY) {
    return { allowed: false, reason: 'session' };
  }
  if (recent.length >= MAX_PER_MINUTE) {
    const retryIn = Math.ceil((RATE_WINDOW_MS - (now - recent[0])) / 1000);
    return { allowed: false, reason: 'minute', retryIn };
  }

  const updated = { timestamps: [...recent, now], total: entry.total + 1 };
  rateLimitMap.set(ip, updated);
  return { allowed: true };
}

// Periodically clean up the rate limit map to avoid memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (entry.timestamps.every((t) => now - t > RATE_WINDOW_MS)) {
      rateLimitMap.delete(ip);
    }
  }
}, CLEANUP_INTERVAL_MS);

const SYSTEM_PROMPT = `You are Dashon Howard's personal assistant embedded on his portfolio website at dashon.co. Your ONLY job is to answer questions about Dashon Howard: his background, skills, work history, services, projects, and how to contact him. Do NOT answer questions about anything else. If someone asks about unrelated topics, politely redirect them back to questions about Dashon. Never reveal that you are an AI model, never mention which AI model or service powers you, and never reveal any API keys or technical implementation details. Present yourself simply as "Dashon's assistant."

Here is everything you know about Dashon Howard:

## Identity
- Full Name: Dashon Howard
- Title: Founder & Principal Engineer at Semicolon-D
- Location: Chicago, IL
- Email: i@dashon.co
- Website: https://dashon.co

## Bio
Hi, I'm Dashon Howard — Founder & Principal Engineer at Semicolon-D, based in Chicago. With 15+ years building web, mobile, and cloud systems across startups, healthcare, blockchain, and applied AI, I help teams ship LLM-enabled features, retrieval systems, integrations, and modern product infrastructure fast — while keeping delivery grounded in reliability, maintainability, and real-world constraints.

## Skills
- TypeScript / Node.js (95%)
- React / Next.js (92%)
- .NET / C# (90%)
- LLM / RAG / Agents (88%)
- AWS / Serverless / Docker (85%)
- Core: LLM Workflows, Agents, RAG/Retrieval, Evals, TypeScript, Node.js, React/Next.js, .NET/C#, PostgreSQL, AWS Lambda, API Gateway, SQS, Docker, Terraform, CI/CD, Fractional Lead, Product Architecture

## Work Experience

### Founder & Principal Engineer — Semicolon-D (Aug 2024 - Present)
Building and shipping production software for client work and internal products across AI workflows, full-stack web systems, and cloud infrastructure. Leading architecture and hands-on execution across LLM-enabled features including agents, retrieval systems, tool-use, and evaluation patterns. Current product portfolio includes TravelDay.world and PlayActionStudios.com.

### Senior Lead Software Engineer — Confidential AI Startup / Contract (Aug 2024 - Aug 2025)
Built production LLM workflows including agents, retrieval pipelines, evaluation harnesses, and vendor integrations. Improved answer quality and reduced inference cost through prompt and tooling optimization. Shipped AI features designed for real-world production use in a fast-moving startup environment.

### Lead Software Engineer — zeNFT, Inc. (Jan 2022 - Aug 2024)
Architected and shipped a secure NFT marketplace; integrated Seaport and optimized contract interactions to cut on-chain costs by 80%+. Unified data access with GraphQL across MongoDB, PostgreSQL, and SQL Server. Hardened CI/CD using Docker and AWS services including CodePipeline, Lambda, and API Gateway.

### Senior Software Engineer — Independent Consultant / Contract (Apr 2019 - Jan 2022)
Delivered 5+ mobile and web applications as a full-stack engineer using React Native, C#/.NET, Node.js/Express, and SQL. Integrated AWS services including Rekognition and Transcribe, plus wearable-device workflows for workplace safety analytics. Adopted serverless backends using Lambda and API Gateway.

### Senior Developer — MERGE (Merge Design & Interactive) (May 2017 - Apr 2019)
Built modular marketing sites and APIs using Handlebars, React, SQL, WordPress, Kentico, Node.js, and ASP.NET. Improved initial render performance by approximately 45% through SEO, caching, CSS/JS hygiene, and front-end optimization.

### Senior Software Engineer — Orthogonal (Nov 2013 - May 2017)
Developed medical software applications across .NET, Node.js, PHP, Ruby, Swift, Java, SQL, React, and Angular. Built Bluetooth LE mobile applications that captured and displayed data from medical devices. Improved web application latency by approximately 50% through performance-focused backend and front-end work.

### Software Developer & Trainer — Virtual Officeware (Oct 2007 - Nov 2013)
Built an ASP.NET MVC application for automated compatibility testing on Crystal Reports across multiple Centricity EMR versions. Developed a system that converted medical intake forms into HTML and CSS. Helped reduce support load by approximately 45% through automation and better internal tools. Delivered recurring training sessions for healthcare professionals.

## Services
1. LLM & AI Engineering — Design and ship production LLM workflows including agents, RAG/retrieval pipelines, tool-use patterns, evaluation harnesses, and vendor integrations. Help teams move fast on AI features without sacrificing reliability or maintainability.
2. Full-Stack Product Development — End-to-end product engineering across TypeScript/Node, React/Next.js, .NET/C#, PostgreSQL, and AWS. Build and ship complete systems — APIs, frontends, cloud infrastructure, and CI/CD — with a focus on rapid iteration and production-grade quality.
3. Fractional Lead Engineering — Senior technical execution without the overhead. Embed as a fractional lead to drive architecture decisions, unblock teams, rescue stalled projects, and scale delivery — from early-stage startups to established product orgs.

## Stats
- 18+ years of experience (since 2007)
- 9 companies explored
- 31 clients satisfied

## Current Projects
- TravelDay.world
- PlayActionStudios.com

## How to Contact
- Email: i@dashon.co
- Contact form: https://dashon.co (scroll to "Get in Touch" section)
- Resume/CV: Available to download or view at https://dashon.co

Keep answers concise, friendly, and professional. If someone asks for Dashon's resume, direct them to scroll to the About section or use the resume buttons on the site.`;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10kb' }));

  // Dynamic status to verify server is up
  app.get('/api/status', (req, res) => res.json({ status: 'ok' }));

  // ── Chat proxy endpoint ──────────────────────────────────────────────────────
  app.post('/api/chat', async (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const rateCheck = checkServerRateLimit(ip);

    if (!rateCheck.allowed) {
      const msg =
        rateCheck.reason === 'session'
          ? 'Session message limit reached.'
          : `Too many requests. Please wait ${rateCheck.retryIn}s.`;
      return res.status(429).json({ error: msg });
    }

    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid request.' });
    }

    // Sanitise — only allow role/content fields
    const sanitised = messages
      .filter((m) => m && typeof m.role === 'string' && typeof m.content === 'string')
      .map(({ role, content }) => ({ role, content: content.slice(0, 2000) }))
      .slice(-20); // keep last 20 turns max

    try {
      const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://dashon.co',
          'X-Title': 'Dashon Howard Portfolio',
        },
        body: JSON.stringify({
          model: 'qwen/qwen3.5-flash-02-23',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...sanitised
          ],
          max_tokens: 400,
          temperature: 0.5,
        }),
      });

      if (!upstream.ok) {
        const errorBody = await upstream.text();
        console.error(`[chatbot proxy] OpenRouter error: ${upstream.status}`, errorBody);
        return res.status(502).json({ error: 'Failed to reach AI service.' });
      }

      const data = await upstream.json();
      return res.json({ reply: data?.choices?.[0]?.message?.content?.trim() || '' });
    } catch (err) {
      console.error('[chatbot proxy]', err.message);
      return res.status(502).json({ error: 'Failed to reach AI service.' });
    }
  });

  app.listen(PORT, () => {
    console.log(`API Proxy running on http://localhost:${PORT}`);
  });
}

startServer();
