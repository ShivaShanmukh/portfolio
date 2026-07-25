import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence, useSpring } from "framer-motion"
import { ExternalLink, Github, ArrowRight, Mail, MapPin, Phone, Gamepad2, Play, ClipboardList, Trophy, Award, Newspaper } from "lucide-react"
import shivaImg from "./assets/shiva.png"
import wormholeArt from "./assets/bg-wormhole.jpg"
import campingArt from "./assets/bg-camping.png"
import journeyArt from "./assets/bg-journey.png"
import stargazeArt from "./assets/bg-stargaze.png"

// ─── DATA ─────────────────────────────────────────────────────────────────────

const GAME_PROJECTS = [
  {
    id: "ant",
    name: "ANT: The Backyard Odyssey",
    genre: "Adventure · Educational VR",
    engine: ["VR", "Unity", "Spatial Computing"],
    award: "Innovate UK Bright Ideas · A+ Distinction",
    description:
      "An adventure and educational VR game built as my Masters dissertation — players shrink to ant scale and explore a backyard ecosystem through immersive world-building and spatial interaction. Awarded a Distinction (A+) and selected for Innovate UK's Bright Ideas programme, then showcased at Kingston University to thousands of students, faculty, and industry experts.",
    research:
      "The full UX research trail lives on the Miro board — from early concept mapping and player personas through iterative playtesting rounds that shaped the locomotion, comfort, and interaction design of the final build.",
    researchTags: ["Playtesting", "Personas", "Journey Mapping", "VR Comfort & Locomotion", "Iterative Prototyping"],
    github: "https://github.com/ShivaShanmukh/ANt-VR-Game",
    youtube: "mOkCVJZUkcs",
    miro: "https://miro.com/app/live-embed/uXjVL9BTCNI=/?embedMode=view_only_without_ui&autoplay=true&share_link_id=383790842341",
    miroLink: "https://miro.com/app/board/uXjVL9BTCNI=/?share_link_id=383790842341",
    flagship: true,
  },
  {
    id: "project-pet",
    name: "Project Pet",
    genre: "Multiplayer Virtual Pet · Unity",
    engine: ["Unity", "C#", "Multiplayer"],
    award: "Showcased at College Career Fest",
    description:
      "A Unity-based multiplayer virtual pet game where players interact with, care for, and bond with a digital companion — the joy of pet ownership in a shared, interactive world. Built end-to-end and showcased live at the college Career Fest.",
    research:
      "The complete UX research process is documented on the Miro board — user flows, ideation, and the playtesting feedback loops that drove the interaction and care-mechanic design.",
    researchTags: ["Playtesting", "User Flows", "Ideation Workshops", "Multiplayer UX"],
    github: "https://github.com/ShivaShanmukh/Operation-PET",
    youtube: "fwauI_6FmUU",
    miro: "https://miro.com/app/live-embed/uXjVLlzbRt0=/?embedMode=view_only_without_ui&autoplay=true&share_link_id=442737093617",
    miroLink: "https://miro.com/app/board/uXjVLlzbRt0=/?share_link_id=442737093617",
    flagship: true,
  },
  {
    id: "what-time-is-it",
    name: "What Time Is It",
    genre: "Narrative Puzzle · Time Mechanics",
    engine: ["Unity", "C#", "Time Mechanics"],
    award: "Kingston University project",
    description:
      "A narrative-driven puzzle game built around time manipulation — players rewind, pause, and fast-forward the world itself to unravel a mystery, with every puzzle grounded in how the time mechanic reshapes cause and effect. Built solo in Unity and C# at Kingston University.",
    research:
      "The full UX research trail lives on the Miro board — concept development and mechanic prototyping through playtesting rounds that shaped how legible and fair the time-manipulation puzzles felt to players.",
    researchTags: ["Playtesting", "Mechanic Prototyping", "Narrative Design", "Puzzle Design"],
    youtube: "K-G-jJAKSJ0",
    miro: "https://miro.com/app/live-embed/uXjVLVYZl6I=/?embedMode=view_only_without_ui&autoplay=true&share_link_id=373769167784",
    miroLink: "https://miro.com/app/board/uXjVLVYZl6I=/?share_link_id=373769167784",
    flagship: true,
  },
  {
    id: "signal-engineer",
    name: "Signal Engineer",
    genre: "Narrative Puzzle · Inclusive Design",
    engine: ["Narrative Design", "Puzzle", "Accessibility"],
    award: "Designed for neurodivergent kids",
    description:
      "A narrative puzzle game designed specifically for neurodivergent children — pacing, sensory load, and feedback loops are all tuned around how neurodivergent players actually process game information, not around neurotypical defaults.",
    research:
      "Inclusive-design-first: every mechanic decision started from neurodivergent player needs — predictable structure, gentle failure states, and clear signal-to-noise in the UI.",
    researchTags: ["Inclusive Design", "Cognitive Load", "Accessibility Heuristics"],
    github: "https://github.com/ShivaShanmukh/Signal-Engineer",
    play: "https://shivashanmukh.itch.io/httpssignal-engineervercelapp",
    flagship: false,
  },
  {
    id: "send-quiz",
    name: "SEND Educational Quiz",
    genre: "Interactive Quiz · KS3 History & Geography",
    engine: ["Educational", "SEND", "KS3"],
    award: "Built for SEND learners",
    description:
      "An interactive quiz game teaching history and geography to KS3 students with special educational needs and disabilities. Question pacing, reward feedback, and visual hierarchy are designed for SEND classrooms rather than retro-fitted afterwards.",
    research:
      "Grounded in SEND pedagogy — low-pressure retries, consistent layouts, and celebration-over-punishment feedback keep learners engaged instead of anxious.",
    researchTags: ["SEND Pedagogy", "Learning UX", "Feedback Design"],
    github: "https://github.com/ShivaShanmukh/SEND-EDUCATIONAL-GAME-",
    flagship: false,
  },
]

const PROJECTS = [
  {
    id: "mark-42",
    name: "Mark-42",
    tagline: "Talk to your code. Get answers, not guesses.",
    description: "A production-ready RAG agent that turns any public GitHub repository into a searchable knowledge base. It uses a two-stage retrieval pipeline with MiniLM embeddings and cross-encoder reranking to provide grounded, cited answers from source code via Claude Sonnet.",
    tags: ["Python", "FastAPI", "Next.js", "ChromaDB", "Claude API", "RAG"],
    live: "https://web-production-fdfac.up.railway.app/",
    github: "https://github.com/ShivaShanmukh/Mark-42-",
    metric: "2-Stage",
    metricLabel: "retrieval pipeline",
  },
  {
    id: "prototype-pilot",
    name: "Prototype Pilot",
    tagline: "An AI Co-founder for your next big idea.",
    description: "An AI-powered 'Co-founder' agent designed to transform raw product ideas into structured, actionable technical briefs. It guides entrepreneurs through a rigorous four-phase discovery process—Clarify, Scope, Risk, and Brief—to ensure a solid foundation before any code is written.",
    tags: ["Python", "FastAPI", "Next.js", "Claude API", "MCP"],
    live: "https://frontend-production-a0d53.up.railway.app/",
    github: "https://github.com/ShivaShanmukh/Claudia-Co-founder",
    metric: "4-Phase",
    metricLabel: "discovery loop",
  },
  {
    id: "unity-mcp",
    name: "Unity MCP Master",
    tagline: "Bridge the gap between Unity and AI.",
    description: "A powerful bridge that connects the Unity Editor to AI assistants using the Model Context Protocol. It empowers developers to build games and manage the Unity environment entirely through natural language, featuring autonomous scene management and integrated debugging.",
    tags: ["Unity", "C#", "Python", "MCP", "AI"],
    live: null,
    github: "https://github.com/ShivaShanmukh/Unity-MCP-Master",
    metric: "Autonomous",
    metricLabel: "agentic loop",
  },
  {
    id: "verdant",
    name: "Verdant",
    tagline: "AI that reads your food for you.",
    description: "A full-stack AI health SaaS that provides barcode scanning, allergy safety analysis, and personalised profiles. Built solo in 4 weeks, it now has over 30 active users.",
    tags: ["Next.js", "TypeScript", "OpenAI API"],
    live: "https://verdantai.figma.site",
    github: null,
    metric: "30+ users",
    metricLabel: "active users",
  },
  {
    id: "genai",
    name: "Generative Brand Studio",
    tagline: "One prompt. Visuals, voice, video.",
    description: "A multi-model generative pipeline featuring ElevenLabs audio, fal.ai image and video models, and Replicate. All components are orchestrated via n8n and surfaced in a live React UI with real-time model swapping.",
    tags: ["ElevenLabs", "fal.ai", "n8n", "Replicate"],
    live: "https://genaistudio-production.up.railway.app",
    github: "https://github.com/ShivaShanmukh/Genai_Studio",
    metric: "4 models",
    metricLabel: "orchestrated live",
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
    metric: "100–200",
    metricLabel: "children served daily",
  },
  {
    id: "friday",
    name: "Career-Ops + Friday",
    tagline: "A job search system that thinks.",
    description: "Career-Ops is an AI evaluation engine that scores job fits, tailors CVs, and builds STAR story banks. Friday serves as the visual dashboard, providing real-time pipeline tracking, one-click evaluation, and Google Drive integration.",
    tags: ["Node.js", "React", "Claude API", "Career-Ops"],
    live: null,
    github: "https://github.com/ShivaShanmukh/career-ops-siva",
    metric: "209 jobs",
    metricLabel: "scanned in one session",
  },
  {
    id: "heatpump",
    name: "Heat Pump Calculator",
    tagline: "Plain English in. Engineering data out.",
    description: "A Claude Haiku agent harness built for Midsummer Energy where users describe their home in plain English. The LLM extracts structured inputs, validates them, and triggers a pipeline pulling 8,760 hourly data points from the EU PVGIS API.",
    tags: ["Python", "Claude Haiku", "Node.js", "Chart.js"],
    live: "https://heat-pump-calculator-production.up.railway.app/",
    github: "https://github.com/ShivaShanmukh/Heat-pump-calculator",
    metric: "8,760",
    metricLabel: "hourly data points processed",
  },
]

const ACHIEVEMENTS = [
  {
    id: "bead-music",
    role: "Co-Founder",
    company: "Bead Music",
    type: "Full-time",
    period: "Jan 2015 – Apr 2016 · 1 yr 4 mos",
    location: "Andhra Pradesh, India",
    award: "Best Pitch Award · StartAP FEST",
    description:
      "An indie music discovery platform — pitched to press as \"an Instagram for music\" — connecting independent artists and bands with venues, event managers, and listeners across Vizag. Started from a student side-project with a dusty guitar and three co-founders, it grew into a funded startup with a team of eight, running live sessions with cafés and venues across the city.",
    highlights: [
      "Built and launched an indie music platform that supported 50+ emerging artists globally",
      "Won the Best Pitch Award at StartAP FEST, securing ₹50,000 in initial funding and press features",
      "Led creative strategy and brand positioning, growing the platform's organic reach by 60% in the first year",
    ],
    press: [
      { label: "Yo! Vizag", detail: "\"Endeavours\" feature on Bead Music's founding story and product vision", date: "Mar 2016" },
      { label: "The New Indian Express — Expresso", detail: "\"Connect the Beads\" — coverage of the StartAP FEST win and the Bead Connect concept", date: "Mar 2016" },
    ],
    gallery: [
      { key: "bead-logo", label: "Bead Music", sub: "Brand mark" },
      { key: "salt-logo", label: "SALT — Fest of the East", sub: "Partner event" },
      { key: "startap-photo", label: "StartAP FEST", sub: "Best Pitch Award, ₹50,000" },
      { key: "yovizag-press", label: "Yo! Vizag", sub: "Magazine feature, Mar 2016" },
      { key: "expresso-press", label: "New Indian Express", sub: "\"Connect the Beads\", Mar 2016" },
    ],
  },
]

const NAV_LINKS = {
  home: [
    { label: "Work", href: "#work" },
    { label: "Gaming", href: "#/gaming" },
    { label: "Achievements", href: "#/achievements" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  gaming: [
    { label: "← Back home", href: "#/" },
    { label: "Contact", href: "#contact" },
  ],
  achievements: [
    { label: "← Back home", href: "#/" },
    { label: "Contact", href: "#contact" },
  ],
}

// ─── SHARED ───────────────────────────────────────────────────────────────────

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

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Soft spotlight that trails the cursor across the whole page
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return
    const el = ref.current
    let tx = -600, ty = -600, x = tx, y = ty, raf
    const move = e => { tx = e.clientX; ty = e.clientY }
    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate(${x - 280}px, ${y - 280}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener("mousemove", move)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="cursor-glow" style={{ transform: "translate(-600px, -600px)" }} />
}

// 3D tilt toward the cursor with a tracked sheen, like a holographic card
function TiltCard({ children, max = 5, style }) {
  const ref = useRef(null)
  const rotX = useSpring(0, { stiffness: 180, damping: 18 })
  const rotY = useSpring(0, { stiffness: 180, damping: 18 })

  const onMove = e => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rotY.set((px - 0.5) * 2 * max)
    rotX.set(-(py - 0.5) * 2 * max)
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
  }
  const onLeave = () => { rotX.set(0); rotY.set(0) }

  return (
    <motion.div ref={ref} className="tilt-card" onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000, ...style }}>
      {children}
      <div className="card-sheen" />
    </motion.div>
  )
}

// Buttons that lean toward the cursor
function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 16 })
  const y = useSpring(0, { stiffness: 220, damping: 16 })

  const onMove = e => {
    if (prefersReducedMotion()) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ x, y, display: "inline-block" }}>
      {children}
    </motion.div>
  )
}

// Ambient particle constellation in the hero; particles drift and shy away from the cursor
function ParticleField() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const canvas = ref.current
    const ctx = canvas.getContext("2d")
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const COLORS = ["139,92,246", "34,211,238", "240,48,138"]
    const mouse = { x: -9999, y: -9999 }
    let w = 0, h = 0, raf, parts = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    parts = Array.from({ length: 70 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.6,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      a: Math.random() * 0.45 + 0.15,
    }))

    const onMouse = e => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        // gentle repulsion from cursor
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 14400 && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = (120 - d) / 120 * 0.35
          p.vx += (dx / d) * f; p.vy += (dy / d) * f
        }
        p.vx *= 0.96; p.vy *= 0.96
        p.vx += (Math.random() - 0.5) * 0.012; p.vy += (Math.random() - 0.5) * 0.012
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10
      }
      // constellation lines
      ctx.lineWidth = 0.5
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 8100) {
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d2 / 8100) * 0.12})`
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      for (const p of parts) {
        ctx.fillStyle = `rgba(${p.c},${p.a * 0.25})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = `rgba(${p.c},${p.a})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("mouseout", onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("mouseout", onLeave)
    }
  }, [])
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
}

// Full-bleed illustration backdrop with spatial 3D depth:
// the art plane tilts in perspective toward the cursor, drifts opposite it,
// and slides on scroll like a layer sitting far behind the page.
function IllustrationBackdrop({ src, height = "100%", opacity = 0.38, focus = "center", strength = 20, tilt = 2.5 }) {
  const wrapRef = useRef(null)
  const x = useSpring(0, { stiffness: 50, damping: 20 })
  const y = useSpring(0, { stiffness: 50, damping: 20 })
  const rx = useSpring(0, { stiffness: 60, damping: 22 })
  const ry = useSpring(0, { stiffness: 60, damping: 22 })
  const scrollY = useSpring(0, { stiffness: 45, damping: 24 })

  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return
    const onMove = e => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      x.set(-nx * strength)
      y.set(-ny * strength)
      ry.set(nx * tilt * 2)
      rx.set(-ny * tilt * 2)
    }
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      // -1..1 as the section crosses the viewport → deep layer slides slower than the page
      const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      scrollY.set(progress * 46)
    }
    onScroll()
    window.addEventListener("mousemove", onMove)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [x, y, rx, ry, scrollY, strength, tilt])

  const mask = "linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 75%, transparent 98%)"
  return (
    <div ref={wrapRef} aria-hidden
      style={{ position: "absolute", top: 0, left: 0, right: 0, height, overflow: "hidden", pointerEvents: "none", perspective: 900 }}>
      <motion.div style={{ y: scrollY, position: "absolute", inset: 0 }}>
        <motion.img src={src} alt=""
          style={{
            x, y,
            rotateX: rx, rotateY: ry,
            transformPerspective: 900,
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: focus,
            scale: 1.14,
            opacity,
            maskImage: mask, WebkitMaskImage: mask,
          }} />
      </motion.div>
      {/* violet wash pulls the art toward the palette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(76,29,149,0.28), rgba(34,211,238,0.08))",
        mixBlendMode: "overlay",
      }} />
      {/* vignette keeps the copy readable */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 42%, rgba(6,9,18,0.52) 0%, rgba(6,9,18,0.18) 48%, rgba(6,9,18,0.62) 100%)",
      }} />
    </div>
  )
}

function SectionHeading({ eyebrow, children, sub }) {
  return (
    <div style={{ marginBottom: 64, textAlign: "center" }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</div>
      <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
        {children}
      </h2>
      {sub && (
        <p style={{ fontSize: 19, color: "var(--paper-dim)", maxWidth: 560, margin: "20px auto 0", lineHeight: 1.6 }}>
          {sub}
        </p>
      )}
    </div>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav({ page = "home" }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav className="nav-global" style={{ background: scrolled ? "rgba(10,14,26,0.92)" : "rgba(10,14,26,0.7)" }}>
      <div className="nav-container" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#/" className="font-display" style={{ fontSize: 18, letterSpacing: "-0.02em", color: "var(--paper)", textDecoration: "none" }}>
          Siva<span className="accent">.</span> I
        </a>
        <div style={{ display: "flex", gap: "clamp(16px, 3vw, 32px)", flexWrap: "wrap", justifyContent: "center" }}>
          {NAV_LINKS[page].map(({ label, href }) => (
            <a key={label} href={href}
              style={{ color: "var(--paper-dim)", fontSize: 13, textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s ease" }}
              onMouseEnter={e => e.target.style.color = "var(--accent-bright)"}
              onMouseLeave={e => e.target.style.color = "var(--paper-dim)"}>
              {label}
            </a>
          ))}
        </div>
        <a href="mailto:shivashanmukh2@gmail.com" className="btn-primary" style={{ fontSize: 12, padding: "7px 16px" }}>
          Get in touch
        </a>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="band-deep" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 52, position: "relative", overflow: "hidden" }}>
      <IllustrationBackdrop src={wormholeArt} opacity={0.42} focus="center 30%" />
      <ParticleField />
      {/* Ambient neon glow */}
      <div style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: 900, height: 500, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.16) 0%, rgba(34,211,238,0.05) 45%, transparent 68%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "80px 24px", textAlign: "center", position: "relative" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            Forward Deployed Engineer · AI Engineer · London
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display"
          style={{ fontSize: "clamp(48px, 8vw, 92px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.03em", marginBottom: 28 }}>
          Production AI,
          <br />
          <span className="accent-gradient-text">deployed in the field.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 20, color: "var(--paper-dim)", lineHeight: 1.55, marginBottom: 48, maxWidth: 620, margin: "0 auto 48px" }}>
          I embed with teams like the NHS and Midsummer Energy, find the real problem, and ship
          production AI end-to-end — RAG agents, LLM harnesses, agentic pipelines, and the
          full-stack products around them.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Magnetic>
            <a href="#work" className="btn-primary">
              View my work <ArrowRight size={15} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="https://github.com/ShivaShanmukh" target="_blank" rel="noreferrer" className="btn-outline">
              <Github size={16} /> GitHub
            </a>
          </Magnetic>
        </motion.div>

        {/* Proof metrics */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 80, flexWrap: "wrap" }}>
          {[
            { n: "17+", label: "AI deployments" },
            { n: "15", label: "startups embedded with at Caarya" },
            { n: "100–200", label: "NHS children daily" },
            { n: "30+", label: "active SaaS users" },
          ].map(({ n, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="font-display accent-gradient-text" style={{ fontSize: 30, fontWeight: 400 }}>{n}</div>
              <div style={{ fontSize: 13, color: "var(--paper-faint)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── GAMING CASE STUDIES ──────────────────────────────────────────────────────

function MediaViewer({ project }) {
  const [tab, setTab] = useState(project.youtube ? "gameplay" : "research")
  const hasBoth = project.youtube && project.miro

  return (
    <div>
      {hasBoth && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
          <div className="media-tabs">
            <button className={`media-tab ${tab === "gameplay" ? "active" : ""}`} onClick={() => setTab("gameplay")}>
              <Play size={12} style={{ display: "inline", marginRight: 6, verticalAlign: "-1px" }} />
              Gameplay
            </button>
            <button className={`media-tab ${tab === "research" ? "active" : ""}`} onClick={() => setTab("research")}>
              <ClipboardList size={12} style={{ display: "inline", marginRight: 6, verticalAlign: "-1px" }} />
              UX Research
            </button>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div key={tab}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}>
          <div className="embed-frame">
            {tab === "gameplay" && project.youtube ? (
              <iframe
                src={`https://www.youtube.com/embed/${project.youtube}`}
                title={`${project.name} — gameplay`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <iframe
                src={project.miro}
                title={`${project.name} — UX research board`}
                allow="fullscreen; clipboard-read; clipboard-write"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function FlagshipCard({ project, index }) {
  return (
    <RevealSection delay={index * 0.08}>
      <div className="panel case-card" style={{ padding: "clamp(28px, 4vw, 52px)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12, fontSize: 11 }}>{project.genre}</div>
            <h3 className="font-display" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {project.name}
            </h3>
          </div>
          <div className="award-badge">
            <Trophy size={14} /> {project.award}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "clamp(28px, 4vw, 48px)", alignItems: "start" }}>
          {/* Left: narrative */}
          <div>
            <p style={{ fontSize: 17, color: "var(--paper-dim)", lineHeight: 1.7, marginBottom: 22 }}>
              {project.description}
            </p>

            <div className="hairline" style={{ margin: "22px 0" }} />

            <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 12 }}>UX Research</div>
            <p style={{ fontSize: 16, color: "var(--paper-dim)", lineHeight: 1.65, marginBottom: 16 }}>
              {project.research}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
              {project.researchTags.map(t => <span key={t} className="chip-accent">{t}</span>)}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {project.engine.map(t => <span key={t} className="chip">{t}</span>)}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: 13.5, padding: "8px 18px" }}>
                  <Github size={14} /> Code
                </a>
              )}
              {project.miroLink && (
                <a href={project.miroLink} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: 13.5, padding: "8px 18px" }}>
                  <ClipboardList size={14} /> Full research board
                </a>
              )}
            </div>
          </div>

          {/* Right: media */}
          <MediaViewer project={project} />
        </div>
      </div>
    </RevealSection>
  )
}

function CompactGameCard({ project, index }) {
  return (
    <RevealSection delay={index * 0.08}>
      <TiltCard style={{ height: "100%" }}>
      <div className="panel case-card" style={{ padding: "clamp(26px, 3vw, 38px)", height: "100%", display: "flex", flexDirection: "column" }}>
        <div className="eyebrow" style={{ marginBottom: 12, fontSize: 11 }}>{project.genre}</div>
        <h3 className="font-display" style={{ fontSize: 30, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.15 }}>
          {project.name}
        </h3>
        <div className="award-badge" style={{ alignSelf: "flex-start", margin: "8px 0 18px", fontSize: 12, padding: "5px 13px" }}>
          <Trophy size={12} /> {project.award}
        </div>
        <p style={{ fontSize: 16, color: "var(--paper-dim)", lineHeight: 1.65, marginBottom: 18 }}>
          {project.description}
        </p>
        <p style={{ fontSize: 15, color: "var(--paper-faint)", lineHeight: 1.6, marginBottom: 18 }}>
          {project.research}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {project.researchTags.map(t => <span key={t} className="chip-accent">{t}</span>)}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto" }}>
          {project.play && (
            <a href={project.play} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 13.5, padding: "8px 18px" }}>
              <Play size={14} /> Play on itch.io
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: 13.5, padding: "8px 18px" }}>
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
      </TiltCard>
    </RevealSection>
  )
}

function GamingSection() {
  const flagships = GAME_PROJECTS.filter(p => p.flagship)
  const compact = GAME_PROJECTS.filter(p => !p.flagship)
  return (
    <section id="gaming" className="band section-pad" style={{ paddingTop: 150, position: "relative", overflow: "hidden" }}>
      <IllustrationBackdrop src={campingArt} height="82vh" opacity={0.4} focus="center 20%" strength={14} />
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>
        <RevealSection>
          <SectionHeading
            eyebrow="Game Design & UX Research"
            sub="Four games, four research trails — VR playtesting, inclusive design for neurodivergent players, and SEND-first learning UX. Watch the gameplay, then open the research board behind it.">
            Play the game.<br /><span className="accent-gradient-text">Read the research.</span>
          </SectionHeading>
        </RevealSection>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {flagships.map((p, i) => <FlagshipCard key={p.id} project={p} index={i} />)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 28, marginTop: 28 }}>
          {compact.map((p, i) => <CompactGameCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function GamingTeaser() {
  return (
    <section className="band-deep" style={{ padding: "0 24px 110px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <RevealSection>
          <a href="#/gaming" style={{ textDecoration: "none", display: "block" }}>
            <div className="panel case-card" style={{
              padding: "clamp(32px, 4vw, 52px)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 28, flexWrap: "wrap",
              borderColor: "var(--line-accent)",
              background: "linear-gradient(120deg, var(--surface) 55%, rgba(139,92,246,0.1), rgba(34,211,238,0.06))",
            }}>
              <div style={{ maxWidth: 640 }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>
                  <Gamepad2 size={13} style={{ display: "inline", marginRight: 8, verticalAlign: "-2px" }} />
                  Game Design & UX Research
                </div>
                <h3 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: 14, color: "var(--paper)" }}>
                  Play the game. <span className="accent-gradient-text">Read the research.</span>
                </h3>
                <p style={{ fontSize: 17, color: "var(--paper-dim)", lineHeight: 1.65 }}>
                  Four research-backed games — an Innovate UK-selected VR world, a multiplayer pet game,
                  and inclusive titles for neurodivergent and SEND players — each with its full UX research trail.
                </p>
              </div>
              <span className="btn-primary" style={{ flexShrink: 0 }}>
                Explore the gaming portfolio <ArrowRight size={15} />
              </span>
            </div>
          </a>
        </RevealSection>
      </div>
    </section>
  )
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────

function GalleryTile({ item }) {
  const isPress = item.key.includes("press")
  return (
    <div className="panel-raised" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
      <div style={{
        aspectRatio: "16 / 10", borderRadius: 10,
        background: "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(34,211,238,0.08))",
        border: "1px solid var(--line)",
        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--paper-faint)",
      }}>
        {isPress ? <Newspaper size={22} /> : <Award size={22} />}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--paper)" }}>{item.label}</div>
        <div style={{ fontSize: 12.5, color: "var(--paper-faint)", marginTop: 2 }}>{item.sub}</div>
      </div>
    </div>
  )
}

function AchievementCard({ achievement, index }) {
  return (
    <RevealSection delay={index * 0.08}>
      <div className="panel case-card" style={{ padding: "clamp(28px, 4vw, 52px)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 8 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12, fontSize: 11 }}>
              {achievement.role} · {achievement.company} · {achievement.type}
            </div>
            <h3 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {achievement.company}
            </h3>
          </div>
          <div className="award-badge">
            <Trophy size={14} /> {achievement.award}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24, fontSize: 13, color: "var(--paper-faint)" }}>
          <span>{achievement.period}</span>
          <span>·</span>
          <span>{achievement.location}</span>
        </div>

        <p style={{ fontSize: 16, color: "var(--paper-dim)", lineHeight: 1.7, marginBottom: 24, maxWidth: 760 }}>
          {achievement.description}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
          {achievement.highlights.map(h => (
            <li key={h} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--paper-dim)", lineHeight: 1.6 }}>
              <Trophy size={15} style={{ flexShrink: 0, marginTop: 3, color: "var(--cyan)" }} />
              {h}
            </li>
          ))}
        </ul>

        <div className="hairline" style={{ margin: "24px 0" }} />

        <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 16 }}>Press & Recognition</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {achievement.press.map(p => (
            <div key={p.label} style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
              <span className="chip-accent">{p.label}</span>
              <span style={{ fontSize: 13.5, color: "var(--paper-faint)" }}>{p.detail} — {p.date}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
          {achievement.gallery.map(item => <GalleryTile key={item.key} item={item} />)}
        </div>
      </div>
    </RevealSection>
  )
}

function AchievementsSection() {
  return (
    <section id="achievements" className="band section-pad" style={{ paddingTop: 150, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>
        <RevealSection>
          <SectionHeading
            eyebrow="Achievements & Recognition"
            sub="Before the AI engineering — a startup, a stage, and a press cycle. What I learned building and pitching Bead Music still shows up in how I ship.">
            From pitch deck<br /><span className="accent-gradient-text">to press coverage.</span>
          </SectionHeading>
        </RevealSection>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {ACHIEVEMENTS.map((a, i) => <AchievementCard key={a.id} achievement={a} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function AchievementsTeaser() {
  return (
    <section className="band-deep" style={{ padding: "0 24px 110px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <RevealSection>
          <a href="#/achievements" style={{ textDecoration: "none", display: "block" }}>
            <div className="panel case-card" style={{
              padding: "clamp(32px, 4vw, 52px)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 28, flexWrap: "wrap",
              borderColor: "var(--line-accent)",
              background: "linear-gradient(120deg, var(--surface) 55%, rgba(139,92,246,0.1), rgba(34,211,238,0.06))",
            }}>
              <div style={{ maxWidth: 640 }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>
                  <Trophy size={13} style={{ display: "inline", marginRight: 8, verticalAlign: "-2px" }} />
                  Achievements & Recognition
                </div>
                <h3 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: 14, color: "var(--paper)" }}>
                  From pitch deck <span className="accent-gradient-text">to press coverage.</span>
                </h3>
                <p style={{ fontSize: 17, color: "var(--paper-dim)", lineHeight: 1.65 }}>
                  Co-founded Bead Music, won Best Pitch at StartAP FEST, and landed press in Yo! Vizag and
                  The New Indian Express — the startup instincts that carry into every product I ship today.
                </p>
              </div>
              <span className="btn-primary" style={{ flexShrink: 0 }}>
                See the full story <ArrowRight size={15} />
              </span>
            </div>
          </a>
        </RevealSection>
      </div>
    </section>
  )
}

// ─── WORK ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  return (
    <RevealSection delay={index * 0.05}>
      <TiltCard style={{ height: "100%" }}>
      <div className="panel case-card" style={{ padding: "clamp(28px, 3vw, 44px)", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Metric */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 22 }}>
          <span className="font-display accent-gradient-text" style={{ fontSize: 38, letterSpacing: "-0.02em" }}>
            {project.metric}
          </span>
          <span style={{ fontSize: 13, color: "var(--paper-faint)" }}>
            {project.metricLabel}
          </span>
        </div>

        <h3 className="font-display" style={{ fontSize: 32, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.15 }}>
          {project.name}
        </h3>
        <p style={{ fontSize: 19, color: "var(--paper-dim)", marginBottom: 18, lineHeight: 1.4 }}>
          {project.tagline}
        </p>
        <p style={{ fontSize: 16, color: "var(--paper-faint)", lineHeight: 1.65, marginBottom: 26 }}>
          {project.description}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
          {project.tags.map(t => <span key={t} className="chip">{t}</span>)}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto" }}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 13.5, padding: "8px 18px" }}>
              Live website <ExternalLink size={13} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: 13.5, padding: "8px 18px" }}>
              <Github size={13} /> Code
            </a>
          )}
          {project.figma && (
            <a href={project.figma} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: 13.5, padding: "8px 18px" }}>
              <ExternalLink size={13} /> Figma Design
            </a>
          )}
          {!project.live && !project.github && !project.figma && (
            <span style={{ fontSize: 13, color: "var(--paper-faint)", padding: "8px 0" }}>
              Private deployment
            </span>
          )}
        </div>
      </div>
      </TiltCard>
    </RevealSection>
  )
}

function WorkSection() {
  return (
    <section id="work" className="band-deep section-pad">
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeading eyebrow="AI & Product Engineering">
            Products that are live.<br />Code that is real.
          </SectionHeading>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))", gap: 24 }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="band section-pad" style={{ position: "relative", overflow: "hidden" }}>
      <IllustrationBackdrop src={stargazeArt} opacity={0.42} focus="center 42%" strength={16} />
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", gap: "clamp(40px, 8vw, 80px)", alignItems: "center" }}>
          <RevealSection>
            <div className="eyebrow" style={{ marginBottom: 20 }}>About</div>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.03em", marginBottom: 28, lineHeight: 1.1 }}>
              Mechanical engineer dropout.<br />
              <span className="accent-gradient-text">Forward deployed. AI builder.</span>
            </h2>
            <p style={{ fontSize: 18, color: "var(--paper-dim)", lineHeight: 1.7, marginBottom: 20 }}>
              I work forward deployed — embedding directly with teams like Cambridge University Hospitals and Midsummer Energy, translating messy real-world requirements into production AI systems, and staying until they're live and actually used.
            </p>
            <p style={{ fontSize: 18, color: "var(--paper-dim)", lineHeight: 1.7, marginBottom: 20 }}>
              Before that: seven years at the intersection of design and technology — motion campaigns for PwC's C-suite clients, design systems for 150M+ users at BYJU'S, and AI deployments for 15 startups at Caarya. I taught myself to build the products I was designing.
            </p>
            <p style={{ fontSize: 18, color: "var(--paper-dim)", lineHeight: 1.7, marginBottom: 40 }}>
              I hold a Master's degree in Game Development and Design from Kingston University London (Distinction, A+). My VR dissertation was selected for Innovate UK's Bright Ideas programme — that research-led approach carries into everything I deploy.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="mailto:shivashanmukh2@gmail.com" className="btn-primary">
                <Mail size={15} /> Get in touch
              </a>
              <a href="https://www.linkedin.com/in/shiva-iyallasomayajula/" target="_blank" rel="noreferrer" className="btn-outline">
                LinkedIn
              </a>
            </div>
          </RevealSection>

          <RevealSection delay={0.15}>
            <div style={{ marginBottom: 32, borderRadius: 20, overflow: "hidden", border: "1px solid var(--line-accent)" }}>
              <img
                src={shivaImg}
                alt="Shiva Iyallasomayajula"
                style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(30%) contrast(1.05)" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 16 }}>
              {[
                { role: "Lead Developer", company: "MapPal Ltd", year: "2025" },
                { role: "Frontend Developer", company: "Cambridge University Hospitals", year: "2025" },
                { role: "AI Technical Lead", company: "Caarya", year: "2024" },
                { role: "Design Associate", company: "PwC", year: "2022–24" },
                { role: "UI/UX Designer", company: "BYJU'S", year: "2021–22" },
                { role: "MA Game Dev & Design", company: "Kingston University", year: "A+ Distinction" },
              ].map(({ role, company, year }) => (
                <div key={role} className="panel-raised" style={{ padding: "20px 20px" }}>
                  <div className="font-mono" style={{ fontSize: 11, color: "var(--cyan)", marginBottom: 6, letterSpacing: "0.06em" }}>{year}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{role}</div>
                  <div style={{ fontSize: 13, color: "var(--paper-faint)" }}>{company}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function SkillsSection() {
  const skillGroups = [
    {
      label: "LLM & Agents",
      skills: ["Anthropic Claude API", "OpenAI API", "Model Context Protocol (MCP)", "Prompt engineering", "Agent harnesses", "RAG pipelines", "Evaluation systems"],
    },
    {
      label: "Forward Deployment",
      skills: ["Client discovery", "Requirements translation", "Rapid prototyping", "Production deployment", "Stakeholder demos", "On-site iteration", "Solo end-to-end delivery"],
    },
    {
      label: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "Vite", "WCAG accessibility"],
    },
    {
      label: "Backend & Tooling",
      skills: ["Python", "Node.js", "REST APIs", "Playwright", "Railway", "Claude Code", "CI/CD"],
    },
    {
      label: "Game Design & UX Research",
      skills: ["Playtesting", "Heuristic evaluation", "Personas & journey mapping", "Inclusive / SEND design", "VR comfort & locomotion", "Miro", "Usability testing"],
    },
    {
      label: "Design & Motion",
      skills: ["Figma", "After Effects", "Premiere Pro", "Motion graphics", "Design systems", "Brand identity"],
    },
  ]

  return (
    <section id="skills" className="band-deep section-pad">
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeading eyebrow="Skills & Tools">The full stack.</SectionHeading>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {skillGroups.map(({ label, skills }, i) => (
            <RevealSection key={label} delay={i * 0.06}>
              <TiltCard max={4} style={{ height: "100%" }}>
              <div className="panel case-card" style={{ padding: "28px 28px", height: "100%" }}>
                <div className="eyebrow" style={{ fontSize: 11, marginBottom: 16 }}>
                  {label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function ContactSection({
  headline = <>Let's build something<br /><span className="accent-gradient-text">that ships.</span></>,
  sub = "Available for forward deployed and AI engineering roles, plus select projects. Based in London, open to hybrid and remote.",
}) {
  return (
    <section id="contact" className="band section-pad" style={{ position: "relative", overflow: "hidden" }}>
      <IllustrationBackdrop src={journeyArt} opacity={0.3} focus="center 60%" strength={14} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <RevealSection>
          <SectionHeading eyebrow="Get in touch" sub={sub}>
            {headline}
          </SectionHeading>
        </RevealSection>

        <RevealSection delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20, marginBottom: 40 }}>
            {[
              { icon: <Mail size={20} />, label: "Email", value: "shivashanmukh2@gmail.com", href: "mailto:shivashanmukh2@gmail.com" },
              { icon: <Phone size={20} />, label: "Phone", value: "+44 7554 469091", href: "tel:+447554469091" },
              { icon: <MapPin size={20} />, label: "Location", value: "London, United Kingdom", href: null },
              { icon: <Github size={20} />, label: "GitHub", value: "github.com/ShivaShanmukh", href: "https://github.com/ShivaShanmukh" },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="panel" style={{ padding: "24px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ color: "var(--cyan)", flexShrink: 0 }}>{icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--paper-faint)", marginBottom: 4 }}>{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      style={{ fontSize: 15, color: "var(--paper)", textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.2s ease" }}
                      onMouseEnter={e => e.target.style.color = "var(--accent-bright)"}
                      onMouseLeave={e => e.target.style.color = "var(--paper)"}>
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 15, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
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
            <a href="https://www.linkedin.com/in/shiva-iyallasomayajula/" target="_blank" rel="noreferrer" className="btn-outline">
              Connect on LinkedIn
            </a>
          </div>
        </RevealSection>
      </div>

      <footer style={{ textAlign: "center", marginTop: 90, paddingTop: 40, borderTop: "1px solid var(--line)" }}>
        <p style={{ fontSize: 12, color: "var(--paper-faint)", padding: "0 20px" }}>
          © 2026 Siva Iyallasomayajula. Designed & built with React, Tailwind CSS, and a lot of playtesting.
        </p>
      </footer>
    </section>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <div>
      <Nav page="home" />
      <HeroSection />
      <WorkSection />
      <GamingTeaser />
      <AchievementsTeaser />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </div>
  )
}

function GamingPage() {
  return (
    <div>
      <Nav page="gaming" />
      <GamingSection />
      <ContactSection
        headline={<>Let's build something<br /><span className="accent-gradient-text">players will love.</span></>}
        sub="Available for UX research and game design roles, plus select projects. Based in London, open to hybrid and remote."
      />
    </div>
  )
}

function AchievementsPage() {
  return (
    <div>
      <Nav page="achievements" />
      <AchievementsSection />
      <ContactSection
        headline={<>Let's build something<br /><span className="accent-gradient-text">worth the press.</span></>}
        sub="Available for forward deployed and AI engineering roles, plus select projects. Based in London, open to hybrid and remote."
      />
    </div>
  )
}

export default function App() {
  const getRoute = () => {
    const hash = window.location.hash
    if (hash.startsWith("#/gaming")) return "gaming"
    if (hash.startsWith("#/achievements")) return "achievements"
    return "home"
  }
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash
      // Only "#/..." hashes switch pages; plain anchors (#work, #contact) stay on the current page
      if (hash.startsWith("#/gaming")) setRoute("gaming")
      else if (hash.startsWith("#/achievements")) setRoute("achievements")
      else if (hash === "" || hash === "#/") setRoute("home")
    }
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])

  useEffect(() => {
    // Page switches land at the top; in-page anchors (#work, #contact) keep native scroll
    if (window.location.hash === "" || window.location.hash === "#/" || window.location.hash.startsWith("#/gaming") || window.location.hash.startsWith("#/achievements")) {
      window.scrollTo(0, 0)
    }
  }, [route])

  return (
    <>
      <CursorGlow />
      {route === "gaming" ? <GamingPage /> : route === "achievements" ? <AchievementsPage /> : <HomePage />}
    </>
  )
}
