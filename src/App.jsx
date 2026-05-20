import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import shivaImg from "./assets/shiva.png"

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "mark-42",
    name: "Mark-42",
    tagline: "Talk to your code. Get answers, not guesses.",
    description: "A production-ready RAG agent that turns any public GitHub repository into a searchable knowledge base. It uses a two-stage retrieval pipeline with MiniLM embeddings and cross-encoder reranking to provide grounded, cited answers from source code via Claude Sonnet.",
    tags: ["Python", "FastAPI", "Next.js", "ChromaDB", "Claude API", "RAG"],
    live: "https://mark-42-frontend-production.up.railway.app",
    github: "https://github.com/ShivaShanmukh/Mark-42-",
    color: "#ffffff",
    bg: "#0f172a",
    metric: "2-Stage",
    metricLabel: "retrieval pipeline",
    dark: true,
  },
  {
    id: "prototype-pilot",
    name: "Prototype Pilot",
    tagline: "An AI Co-founder for your next big idea.",
    description: "An AI-powered 'Co-founder' agent designed to transform raw product ideas into structured, actionable technical briefs. It guides entrepreneurs through a rigorous four-phase discovery process—Clarify, Scope, Risk, and Brief—to ensure a solid foundation before any code is written.",
    tags: ["Python", "FastAPI", "Next.js", "Claude API", "MCP"],
    live: null,
    github: "https://github.com/ShivaShanmukh/Claudia-Co-founder",
    color: "#ffffff",
    bg: "#1e1b4b",
    metric: "4-Phase",
    metricLabel: "discovery loop",
    dark: true,
  },
  {
    id: "unity-mcp",
    name: "Unity MCP Master",
    tagline: "Bridge the gap between Unity and AI.",
    description: "A powerful bridge that connects the Unity Editor to AI assistants using the Model Context Protocol. It empowers developers to build games and manage the Unity environment entirely through natural language, featuring autonomous scene management and integrated debugging.",
    tags: ["Unity", "C#", "Python", "MCP", "AI"],
    live: null,
    github: "https://github.com/ShivaShanmukh/Unity-MCP-Master",
    color: "#ffffff",
    bg: "#020617",
    metric: "Autonomous",
    metricLabel: "agentic loop",
    dark: true,
  },
  {
    id: "verdant",
    name: "Verdant",
    tagline: "AI that reads your food for you.",
    description: "A full-stack AI health SaaS that provides barcode scanning, allergy safety analysis, and personalised profiles. Built solo in 4 weeks, it now has over 30 active users.",
    tags: ["Next.js", "TypeScript", "OpenAI API"],
    live: "https://verdantai.figma.site",
    github: null,
    color: "#064E3B",
    bg: "#D1FAE5",
    metric: "30+ users",
    metricLabel: "active users",
    dark: false,
  },
  {
    id: "genai",
    name: "Generative Brand Studio",
    tagline: "One prompt. Visuals, voice, video.",
    description: "A multi-model generative pipeline featuring ElevenLabs audio, fal.ai image and video models, and Replicate. All components are orchestrated via n8n and surfaced in a live React UI with real-time model swapping.",
    tags: ["ElevenLabs", "fal.ai", "n8n", "Replicate"],
    live: "https://genaistudio-production.up.railway.app",
    github: "https://github.com/ShivaShanmukh/Genai_Studio",
    color: "#ffffff",
    bg: "#1a1a1c",
    metric: "4 models",
    metricLabel: "orchestrated live",
    dark: true,
  },
  {
    id: "nhs",
    name: "Big Breathing Adventure",
    tagline: "Built for the NHS. Used by children every day.",
    description: "A motion-rich, accessible wellbeing platform for Cambridge University Hospitals. As the sole developer, I handled the full component architecture, WCAG compliance, and interaction design, deploying the project in 6 weeks.",
    tags: ["Next.js", "React", "NHS", "WCAG"],
    live: "https://www.voh.org.uk/BBA/",
    github: null,
    figma: "https://www.figma.com/design/4UDpW7QS4HpAvBqSoD4F4S/VOH---website?node-id=0-1&m=dev",
    color: "#1D4ED8",
    bg: "#EFF6FF",
    metric: "100–200",
    metricLabel: "children served daily",
    dark: false,
  },
  {
    id: "friday",
    name: "Career-Ops + Friday",
    tagline: "A job search system that thinks.",
    description: "Career-Ops is an AI evaluation engine that scores job fits, tailors CVs, and builds STAR story banks. Friday serves as the visual dashboard, providing real-time pipeline tracking, one-click evaluation, and Google Drive integration.",
    tags: ["Node.js", "React", "Claude API", "Career-Ops"],
    live: null,
    github: "https://github.com/ShivaShanmukh/career-ops-siva",
    color: "#ffffff",
    bg: "#111113",
    metric: "209 jobs",
    metricLabel: "scanned in one session",
    dark: true,
  },
  {
    id: "heatpump",
    name: "Heat Pump Calculator",
    tagline: "Plain English in. Engineering data out.",
    description: "A Claude Haiku agent harness built for Midsummer Energy where users describe their home in plain English. The LLM extracts structured inputs, validates them, and triggers a pipeline pulling 8,760 hourly data points from the EU PVGIS API.",
    tags: ["Python", "Claude Haiku", "Node.js", "Chart.js"],
    live: "https://heat-pump-calculator-production.up.railway.app/",
    github: "https://github.com/ShivaShanmukh/Heat-pump-calculator",
    color: "#92400E",
    bg: "#FEF3C7",
    metric: "8,760",
    metricLabel: "hourly data points processed",
    dark: false,
  },
  {
    id: "ant",
    name: "ANT: The Backyard Odyssey",
    tagline: "A+ Distinction. Selected for Innovate UK.",
    description: "A spatial computing VR experience built as my Masters dissertation. It features real-time rendering, world-building mechanics, and immersive interaction design. The project was awarded a Distinction and selected for Innovate UK's national innovation programme.",
    tags: ["VR", "Spatial Computing", "Unity", "Innovate UK"],
    live: null,
    github: null,
    miro: "https://miro.com/app/board/uXjVL9BTCNI=/?share_link_id=141665411617",
    demo: "https://youtu.be/mOkCVJZUkcssi=jMf1b0b2J2Ejusu_",
    color: "#ffffff",
    bg: "#0f1a14",
    metric: "A+",
    metricLabel: "Distinction · Innovate UK",
    dark: true,
  },
]

const NAV_LINKS = ["Work", "About", "Skills", "Contact"]

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav className="nav-global" style={{ background: scrolled ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)" }}>
      <div className="nav-container" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="font-display" style={{ color: "white", fontSize: 17, letterSpacing: "-0.02em" }}>Siva. I</span>
        <div style={{ display: "flex", gap: "clamp(16px, 3vw, 32px)", flexWrap: "wrap", justifyContent: "center" }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, textDecoration: "none", letterSpacing: "-0.01em" }}
              onMouseEnter={e => e.target.style.color = "white"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.8)"}>
              {link}
            </a>
          ))}
        </div>
        <a href="mailto:shivashanmukh2@gmail.com" className="btn-primary" style={{ fontSize: 12, padding: "6px 14px" }}>
          Get in touch
        </a>
      </div>
    </nav>
  )
}

function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

function HeroSection() {
  return (
    <section className="tile-darkest" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 44 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="font-mono accent" style={{ fontSize: 13, letterSpacing: "0.12em", marginBottom: 24, opacity: 0.8 }}>
            PwC motion designer to AI engineer
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display"
          style={{ fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 400, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 28 }}>
          I build things
          <br />
          <span className="accent">that ship.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 21, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginBottom: 48, maxWidth: 560, margin: "0 auto 48px" }}>
          Production AI systems, generative pipelines, and interactive experiences.
          NHS platforms, energy agents, and AI SaaS products are shipped fast and built properly.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#work" className="btn-primary">
            View my work <ArrowRight size={16} />
          </a>
          <a href="https://github.com/ShivaShanmukh" target="_blank" rel="noreferrer" className="btn-ghost-dark">
            <Github size={16} /> GitHub
          </a>
        </motion.div>

        {/* Proof metrics */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 80, flexWrap: "wrap" }}>
          {[
            { n: "7+", label: "years experience" },
            { n: "30+", label: "active SaaS users" },
            { n: "100–200", label: "NHS children daily" },
            { n: "17+", label: "AI deployments" },
          ].map(({ n, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="font-display accent" style={{ fontSize: 32, fontWeight: 400 }}>{n}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const isDark = project.dark
  return (
    <RevealSection delay={index * 0.05}>
      <div style={{
        background: project.bg,
        borderRadius: 24,
        overflow: "hidden",
        border: isDark ? "none" : "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{ padding: "48px 48px 40px" }}>
          {/* Metric */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 24 }}>
            <span className="font-display" style={{ fontSize: 40, color: isDark ? "white" : project.color, letterSpacing: "-0.02em" }}>
              {project.metric}
            </span>
            <span style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
              {project.metricLabel}
            </span>
          </div>

          {/* Name & tagline */}
          <h3 className="font-display" style={{ fontSize: 34, fontWeight: 400, color: isDark ? "white" : "#1d1d1f", letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.15 }}>
            {project.name}
          </h3>
          <p style={{ fontSize: 19, color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", marginBottom: 20, lineHeight: 1.4 }}>
            {project.tagline}
          </p>
          <p style={{ fontSize: 15, color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", lineHeight: 1.6, marginBottom: 28, maxWidth: 520 }}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                padding: "4px 12px",
                borderRadius: 9999,
                fontSize: 12,
                background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)",
              }}>{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 14, padding: "8px 18px" }}>
                Live website <ExternalLink size={13} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className={isDark ? "btn-ghost-dark" : "btn-ghost"}
                style={{ fontSize: 14, padding: "8px 18px" }}>
                <Github size={13} /> Code
              </a>
            )}
            {project.figma && (
              <a href={project.figma} target="_blank" rel="noreferrer"
                className={isDark ? "btn-ghost-dark" : "btn-ghost"}
                style={{ fontSize: 14, padding: "8px 18px" }}>
                <ExternalLink size={13} /> Figma Design
              </a>
            )}
            {project.miro && (
              <a href={project.miro} target="_blank" rel="noreferrer"
                className={isDark ? "btn-ghost-dark" : "btn-ghost"}
                style={{ fontSize: 14, padding: "8px 18px" }}>
                <ExternalLink size={13} /> UX Research
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                className={isDark ? "btn-ghost-dark" : "btn-ghost"}
                style={{ fontSize: 14, padding: "8px 18px" }}>
                <ExternalLink size={13} /> Demo
              </a>
            )}
            {!project.live && !project.github && !project.figma && !project.miro && !project.demo && (
              <span style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", padding: "8px 0" }}>
                Private deployment
              </span>
            )}
          </div>
        </div>
      </div>
    </RevealSection>
  )
}

function WorkSection() {
  return (
    <section id="work" className="tile-parchment section-pad">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ marginBottom: 64, textAlign: "center" }}>
            <div className="font-mono accent" style={{ fontSize: 12, letterSpacing: "0.12em", marginBottom: 16 }}>FEATURED WORK</div>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#1d1d1f", letterSpacing: "-0.03em" }}>
              Products that are live.<br />Code that is real.
            </h2>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))", gap: 20 }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="tile-darkest section-pad">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", gap: "clamp(40px, 8vw, 80px)", alignItems: "center" }}>
          <RevealSection>
            <div className="font-mono accent" style={{ fontSize: 12, letterSpacing: "0.12em", marginBottom: 20 }}>ABOUT</div>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: "white", letterSpacing: "-0.03em", marginBottom: 28, lineHeight: 1.1 }}>
              Mechanical engineer dropout.<br />
              <span className="accent">Motion designer. AI builder.</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 20 }}>
              I have spent seven years working at the intersection of design and technology. My experience includes building motion campaigns for PwC's C-suite clients, shipping design systems for 150M+ users at BYJU'S, and leading AI deployments for 15 startups at Caarya.
            </p>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 32 }}>
              I eventually taught myself to build the products I was designing. Today, I ship production AI systems such as health SaaS platforms, NHS wellbeing tools, generative media pipelines, and autonomous job agents. I focus on building projects that are fast, solo-developed, and ready for real-world use.
            </p>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 40 }}>
              I hold a Master's degree in Game Development and Design from Kingston University London, where I graduated with a Distinction (A+). My dissertation was also selected for the Innovate UK national innovation programme.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="mailto:shivashanmukh2@gmail.com" className="btn-primary">
                <Mail size={15} /> Get in touch
              </a>
              <a href="https://www.linkedin.com/in/shiva-iyallasomayajula/" target="_blank" rel="noreferrer" className="btn-ghost-dark">
                LinkedIn
              </a>
            </div>
          </RevealSection>

          <RevealSection delay={0.15}>
            <div style={{ marginBottom: 32, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
              <img 
                src={shivaImg} 
                alt="Shiva Iyallasomayajula" 
                style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(20%)" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 16 }}>
              {[
                { role: "Lead Developer", company: "MapPal Ltd", year: "2025" },
                { role: "Frontend Developer", company: "Cambridge University Hospitals", year: "2025" },
                { role: "AI Technical Lead", company: "Caarya", year: "2024" },
                { role: "Design Associate", company: "PwC", year: "2022–24" },
                { role: "UI/UX Designer", company: "BYJU'S", year: "2021–22" },
                { role: "MSc Game Dev & Design", company: "Kingston University", year: "A+ Distinction" },
              ].map(({ role, company, year }) => (
                <div key={role} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "20px 20px",
                }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, letterSpacing: "0.06em" }}>{year}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "white", marginBottom: 4 }}>{role}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{company}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const skillGroups = [
    {
      label: "LLM & Agents",
      skills: ["Anthropic Claude API", "OpenAI API", "Model Context Protocol (MCP)", "Prompt engineering", "Agent harnesses", "Structured outputs", "Evaluation systems"],
    },
    {
      label: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "Vite", "WCAG accessibility"],
    },
    {
      label: "Generative AI",
      skills: ["ElevenLabs", "fal.ai", "Replicate", "Runway", "Midjourney", "n8n", "ComfyUI"],
    },
    {
      label: "Backend & Infra",
      skills: ["Python", "Node.js", "REST APIs", "Playwright", "SQLite", "Railway", "Datadog"],
    },
    {
      label: "Design & Motion",
      skills: ["Figma", "After Effects", "Premiere Pro", "Motion graphics", "Design systems", "Brand identity"],
    },
    {
      label: "AI Tooling",
      skills: ["Claude Code", "Cursor", "Codex", "GitHub Copilot", "Vercel", "CI/CD"],
    },
  ]

  return (
    <section id="skills" className="tile-light section-pad">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="font-mono accent" style={{ fontSize: 12, letterSpacing: "0.12em", marginBottom: 16 }}>SKILLS & TOOLS</div>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 400, color: "#1d1d1f", letterSpacing: "-0.03em" }}>
              The full stack.
            </h2>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {skillGroups.map(({ label, skills }, i) => (
            <RevealSection key={label} delay={i * 0.06}>
              <div style={{
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: 18,
                padding: "28px 28px",
              }}>
                <div className="accent" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", marginBottom: 16 }}>
                  {label.toUpperCase()}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills.map(s => (
                    <span key={s} style={{
                      padding: "5px 12px",
                      background: "#f5f5f7",
                      borderRadius: 9999,
                      fontSize: 13,
                      color: "#1d1d1f",
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="tile-darkest section-pad">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="font-mono accent" style={{ fontSize: 12, letterSpacing: "0.12em", marginBottom: 16 }}>GET IN TOUCH</div>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "white", letterSpacing: "-0.03em", marginBottom: 16 }}>
              Let's build something.
            </h2>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto" }}>
              Available for full-time roles and select projects. Based in London, open to hybrid and remote.
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20, marginBottom: 40 }}>
            {[
              { icon: <Mail size={20} />, label: "Email", value: "shivashanmukh2@gmail.com", href: "mailto:shivashanmukh2@gmail.com" },
              { icon: <Phone size={20} />, label: "Phone", value: "+44 7554 469091", href: "tel:+447554469091" },
              { icon: <MapPin size={20} />, label: "Location", value: "London, United Kingdom", href: null },
              { icon: <Github size={20} />, label: "GitHub", value: "github.com/ShivaShanmukh", href: "https://github.com/ShivaShanmukh" },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "24px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}>
                <div style={{ color: "#10B981", flexShrink: 0 }}>{icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      style={{ fontSize: 15, color: "white", textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                      onMouseEnter={e => e.target.style.color = "#10B981"}
                      onMouseLeave={e => e.target.style.color = "white"}>
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 15, color: "white", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={0.2}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:shivashanmukh2@gmail.com" className="btn-primary">
              <Mail size={15} /> Send me an email
            </a>
            <a href="https://www.linkedin.com/in/shiva-iyallasomayajula/" target="_blank" rel="noreferrer" className="btn-ghost-dark">
              Connect on LinkedIn
            </a>
          </div>
        </RevealSection>
      </div>

      <footer style={{ textAlign: "center", marginTop: 80, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", padding: "0 20px" }}>
          © 2025 Siva Iyallasomayajula. Designed & Built with React and Tailwind CSS.
        </p>
      </footer>
    </section>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div>
      <Nav />
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </div>
  )
}
