import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Globe2,
  Layers,
  Users2,
  Map as MapIcon,
  BookOpen,
  PenLine,
  Mic2,
  Search,
  LayoutDashboard,
  ArrowUpRight,
  Sparkles,
  Quote,
  Shield,
  Database,
  Server,
  Palette,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Header from "@/components/layout/Header";

/* ============ PALETTE — MonPays+ (PRD) ============
   primary       #6B3A2A  marron profond
   primary-light #9C5A3C
   primary-dark  #3E1F13
   accent        #D4A853  or savane
   accent-soft   #F0D9A8
   surface       #FAF6F1
   surface-alt   #F0E8DC
   text-primary  #1C1008
   text-secondary#7A5C4A
   border        #E2D0BE
==================================================== */
const C = {
  primary: "#6B3A2A",
  primaryLight: "#9C5A3C",
  primaryDark: "#3E1F13",
  accent: "#D4A853",
  accentSoft: "#F0D9A8",
  surface: "#FAF6F1",
  surfaceAlt: "#F0E8DC",
  ink: "#1C1008",
  text2: "#7A5C4A",
  border: "#E2D0BE",
};

/* Adinkra-inspired SVG pattern (subtle, 4% opacity) */
const adinkraPattern = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
    <g fill='none' stroke='#6B3A2A' stroke-width='1'>
      <circle cx='40' cy='40' r='14'/>
      <circle cx='40' cy='40' r='6'/>
      <path d='M40 6 L40 26 M40 54 L40 74 M6 40 L26 40 M54 40 L74 40'/>
      <path d='M14 14 L26 26 M54 54 L66 66 M66 14 L54 26 M26 54 L14 66'/>
    </g>
  </svg>`
)}`;

/* ---------------- Hook: count up ---------------- */
function useCountUp(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

/* ---------------- Reveal helper ---------------- */
function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* =================================================
   PAGE
================================================= */
export default function MonPaysPlus() {
  /* Load fonts */
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Serif+Display&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      style={{
        background: C.surface,
        color: C.ink,
        fontFamily: "'Inter', sans-serif",
      }}
      className="min-h-screen"
    >
      <Header />

      {/* ============= HERO ============= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${C.surface} 0%, ${C.surfaceAlt} 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${adinkraPattern}")`,
            opacity: 0.04,
          }}
        />
        {/* soft golden glow */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${C.accent}40, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${C.primary}30, transparent 70%)` }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-40"
        >
          {/* Eyebrow */}
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-12" style={{ background: C.primary }} />
              <span
                className="text-xs tracking-[0.3em] uppercase font-semibold"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: C.primary }}
              >
                PRD v1.0 · Application personnelle stratégique
              </span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h1
              className="leading-[0.92] tracking-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                color: C.ink,
              }}
            >
              MonPays<span style={{ color: C.accent }}>+</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="mt-8 max-w-3xl leading-tight"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)",
                color: C.primary,
              }}
            >
              Observer le monde. Construire le Bénin.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p
              className="mt-8 max-w-2xl text-lg leading-relaxed"
              style={{ color: C.text2 }}
            >
              Une plateforme hybride entre <strong style={{ color: C.ink }}>knowledge base</strong>,{" "}
              <strong style={{ color: C.ink }}>think tank personnel</strong> et{" "}
              <strong style={{ color: C.ink }}>outil de planification stratégique</strong>. Recenser, analyser
              et adapter ce que d'autres pays font de mieux — pour préparer une transformation
              durable du Bénin sur 5 à 10 ans.
            </p>
          </Reveal>

          {/* Meta grid */}
          <Reveal delay={0.4}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: C.border }}>
              {[
                { k: "Horizon", v: "5 ans" },
                { k: "Phases", v: "3" },
                { k: "Modules", v: "9" },
                { k: "Statut", v: "v1.0" },
              ].map((m) => (
                <div key={m.k} className="p-6" style={{ background: C.surface }}>
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase mb-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: C.text2 }}
                  >
                    {m.k}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: C.primary,
                    }}
                  >
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>

        {/* scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase"
          style={{ color: C.text2, fontFamily: "'JetBrains Mono', monospace" }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            Découvrir ↓
          </motion.div>
        </div>
      </section>

      {/* ============= MANIFESTO / QUOTE ============= */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: C.primaryDark, color: C.surface }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url("${adinkraPattern}")`, opacity: 0.05 }}
        />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <Reveal>
            <Quote className="w-12 h-12 mb-8" style={{ color: C.accent }} />
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                lineHeight: 1.25,
                fontWeight: 400,
              }}
            >
              « Je n'ai pas besoin d'attendre d'être au pouvoir pour commencer.
              Je dois <em style={{ color: C.accent }}>observer maintenant</em>,
              documenter méthodiquement, et bâtir un capital intellectuel et humain
              que je ramènerai au Bénin — pour transformer ce que j'ai vu de mieux
              chez les autres en réalité chez moi. »
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-12" style={{ background: C.accent }} />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}
              >
                Vision fondatrice
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============= KPIs / STATS ============= */}
      <KPIsSection />

      {/* ============= 9 MODULES ============= */}
      <section className="py-32 px-6 lg:px-12" style={{ background: C.surface }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionTitle eyebrow="02 · Architecture produit" title="9 modules pour penser, documenter, agir" />
          </Reveal>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
               style={{ background: C.border }}>
            {MODULES.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.05}>
                <ModuleCard {...m} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============= PHASES ============= */}
      <PhasesSection />

      {/* ============= STACK TECHNIQUE ============= */}
      <StackSection />

      {/* ============= KPIs ROADMAP ============= */}
      <KPIRoadmapSection />

      {/* ============= SÉCURITÉ ============= */}
      <SecuritySection />

      {/* ============= FOOTER MANIFESTO ============= */}
      <section
        className="py-32 px-6 lg:px-12 text-center relative overflow-hidden"
        style={{ background: C.surfaceAlt }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url("${adinkraPattern}")`, opacity: 0.05 }}
        />
        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <Sparkles className="w-10 h-10 mx-auto mb-8" style={{ color: C.accent }} />
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: C.primaryDark,
              }}
            >
              Ce projet n'est pas une idée.
              <br />
              <span style={{ color: C.accent }}>C'est un engagement.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg leading-relaxed" style={{ color: C.text2 }}>
              Dans 5 ou 10 ans, je reviendrai au Bénin avec des amis — économistes,
              investisseurs, bâtisseurs. Nous organiserons une conférence. Tout ce
              qui aura été documenté ici servira de socle. MonPays+ est l'outil
              qui rend cela possible.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div
              className="inline-flex items-center gap-3 mt-12 px-8 py-4 rounded-full"
              style={{ background: C.primaryDark, color: C.surface }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-[0.3em] uppercase">
                Bénin · 2030
              </span>
              <ArrowUpRight className="w-4 h-4" style={{ color: C.accent }} />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ===========================================================
   COMPONENTS
=========================================================== */

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-10" style={{ background: C.primary }} />
        <span
          className="text-xs tracking-[0.3em] uppercase font-semibold"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: C.primary }}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4.5vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: C.ink,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* -------- KPIs hero stats -------- */
function KPIsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const kpis = [
    { label: "Initiatives à documenter", target: 500, suffix: "+" },
    { label: "Domaines couverts", target: 7 },
    { label: "Contacts réseau", target: 20, suffix: "+" },
    { label: "Années d'horizon", target: 5 },
  ];
  return (
    <section ref={ref} className="py-24 px-6 lg:px-12" style={{ background: C.surfaceAlt }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionTitle eyebrow="01 · Ambition mesurable" title="Des chiffres pour ancrer la vision." />
        </Reveal>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((k, i) => {
            const v = useCountUp(k.target, 1800, inView);
            return (
              <Reveal key={k.label} delay={i * 0.08}>
                <div className="border-l-2 pl-6" style={{ borderColor: C.accent }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(3rem, 6vw, 5rem)",
                      fontWeight: 900,
                      color: C.primary,
                      lineHeight: 1,
                    }}
                  >
                    {v}
                    {k.suffix || ""}
                  </div>
                  <div
                    className="mt-3 text-sm leading-snug"
                    style={{ color: C.text2 }}
                  >
                    {k.label}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------- Module card -------- */
type Mod = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  features: string[];
};

const MODULES: Mod[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    desc: "Vue d'ensemble : stats globales, couverture par domaine, jalons à venir.",
    features: ["Radar des domaines", "Initiatives récentes", "Citation du jour"],
  },
  {
    title: "Initiatives",
    icon: Layers,
    desc: "Le cœur du produit. Fiches détaillées de ce qui marche ailleurs.",
    features: ["Score de faisabilité", "Vue grille & tableau", "Export PDF"],
  },
  {
    title: "Domaines",
    icon: Globe2,
    desc: "Vue par secteur : éducation, santé, énergie, justice, agriculture…",
    features: ["Détection des lacunes", "Comparaison Bénin / référence", "Priorisation"],
  },
  {
    title: "Réseau",
    icon: Users2,
    desc: "CRM léger des experts, investisseurs et collaborateurs identifiés.",
    features: ["Pipeline de relation", "Score de potentiel", "Intervenants conf."],
  },
  {
    title: "Roadmap",
    icon: MapIcon,
    desc: "Plan sur 5 ans découpé en jalons trimestriels.",
    features: ["Timeline interactive", "Kanban par statut", "Progression globale"],
  },
  {
    title: "Bibliothèque",
    icon: BookOpen,
    desc: "Livres, rapports, podcasts, documentaires — avec leçons extractibles.",
    features: ["Statut lu / non lu", "Upload PDF", "Notation 5 étoiles"],
  },
  {
    title: "Journal stratégique",
    icon: PenLine,
    desc: "Pensées, doutes, intuitions. Un éditeur rich-text et un mood tracker.",
    features: ["Tiptap éditeur", "Tags & humeur", "Recherche full-text"],
  },
  {
    title: "Conférence",
    icon: Mic2,
    desc: "Préparation de la conférence finale au Bénin : sessions, intervenants, logistique.",
    features: ["Programme", "Budget prévisionnel", "Propositions finales"],
  },
  {
    title: "Recherche globale",
    icon: Search,
    desc: "MeiliSearch sur toutes les entités : ultra rapide, résultats typés.",
    features: ["Full-text", "Filtres avancés", "Résultats typés"],
  },
];

function ModuleCard({
  title,
  desc,
  icon: Icon,
  features,
  index,
}: Mod & { index: number }) {
  return (
    <div
      className="group p-8 h-full transition-all duration-500 hover:bg-[var(--alt)] relative overflow-hidden"
      style={
        {
          background: C.surface,
          ["--alt" as any]: C.surfaceAlt,
        } as React.CSSProperties
      }
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ background: C.accentSoft }}
        >
          <Icon className="w-6 h-6" style={{ color: C.primaryDark }} />
        </div>
        <span
          className="text-xs tracking-[0.2em]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: C.text2 }}
        >
          M0{index}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "1.5rem",
          color: C.ink,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: C.text2 }}>
        {desc}
      </p>

      <ul className="mt-6 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs" style={{ color: C.primary }}>
            <div className="w-1 h-1 rounded-full" style={{ background: C.accent }} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------- Phases section -------- */
function PhasesSection() {
  const phases = [
    {
      n: "Phase 01",
      period: "Années 1–2",
      title: "Solo",
      access: "Privé",
      desc: "Construction du socle. Tu remplis seul tous les modules core. La discipline d'observation devient une routine quotidienne.",
      milestones: ["Plateforme déployée", "Premier domaine créé", "30 initiatives", "Roadmap complète"],
    },
    {
      n: "Phase 02",
      period: "Années 3–4",
      title: "Collaboratif",
      access: "5–10 invités",
      desc: "Tu ouvres l'outil à un cercle de confiance : économistes, ingénieurs, chercheurs. Commentaires, co-rédaction, débats.",
      milestones: ["500 initiatives", "3 collaborateurs actifs", "Bibliothèque > 50 ressources", "Premier rapport PDF"],
    },
    {
      n: "Phase 03",
      period: "Année 5",
      title: "Public partiel",
      access: "Lecture publique",
      desc: "Certaines fiches deviennent publiques. SEO, partage. Génération d'un Livre Blanc. Préparation finale de la conférence au Bénin.",
      milestones: ["Livre Blanc publié", "Conférence planifiée à 100%", "Domaine monpays.plus", "Communauté lancée"],
    },
  ];

  return (
    <section className="py-32 px-6 lg:px-12" style={{ background: C.primaryDark, color: C.surface }}>
      <div
        className="absolute inset-x-0"
        style={{ backgroundImage: `url("${adinkraPattern}")`, opacity: 0.04 }}
      />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: C.accent }} />
              <span
                className="text-xs tracking-[0.3em] uppercase font-semibold"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}
              >
                03 · Trajectoire
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Trois phases. Un seul cap.
            </h2>
          </div>
        </Reveal>

        <div className="mt-20 space-y-8">
          {phases.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <div
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12 rounded-2xl border transition-all hover:scale-[1.005]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(212,168,83,0.2)",
                }}
              >
                <div className="lg:col-span-3">
                  <div
                    className="text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: C.accent }}
                  >
                    {p.n}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      color: C.surface,
                      lineHeight: 1,
                    }}
                  >
                    {p.title}
                  </div>
                  <div className="mt-3 text-sm" style={{ color: C.accentSoft }}>
                    {p.period} · {p.access}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-base leading-relaxed" style={{ color: "rgba(250,246,241,0.8)" }}>
                    {p.desc}
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <ul className="space-y-3">
                    {p.milestones.map((m) => (
                      <li key={m} className="flex items-start gap-3 text-sm" style={{ color: C.surface }}>
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: C.accent }} />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Stack technique -------- */
function StackSection() {
  const groups = [
    {
      icon: Palette,
      title: "Frontend",
      items: ["Next.js 14 (App Router)", "TypeScript", "shadcn/ui + Tailwind", "Zustand · React Query", "Tiptap · Recharts · dnd-kit", "Framer Motion"],
    },
    {
      icon: Server,
      title: "Backend",
      items: ["NestJS · Node 20 LTS", "REST + tRPC", "NextAuth.js v5", "Prisma ORM · Zod", "Cloudinary · MeiliSearch", "Puppeteer (PDF) · xlsx"],
    },
    {
      icon: Database,
      title: "Données & infra",
      items: ["PostgreSQL 16 · Supabase", "Redis · Upstash", "Vercel · Railway", "GitHub Actions", "Sentry monitoring", "monpays.plus"],
    },
  ];
  return (
    <section className="py-32 px-6 lg:px-12" style={{ background: C.surface }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionTitle eyebrow="04 · Stack technique" title="Choix techniques pensés pour durer." />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.1}>
              <div
                className="p-8 rounded-2xl border h-full"
                style={{ background: C.surfaceAlt, borderColor: C.border }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ background: C.primaryDark }}
                >
                  <g.icon className="w-6 h-6" style={{ color: C.accent }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.6rem",
                    color: C.ink,
                  }}
                >
                  {g.title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="text-sm pb-3 border-b last:border-0"
                      style={{ color: C.ink, borderColor: C.border, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- KPI Roadmap -------- */
function KPIRoadmapSection() {
  const steps = [
    { when: "Semaine 1", what: "Plateforme déployée, 1er domaine créé, 5 initiatives saisies" },
    { when: "Mois 1", what: "30 initiatives documentées, roadmap complète" },
    { when: "Mois 3", what: "100 initiatives, 20 contacts réseau, bibliothèque > 15 ressources" },
    { when: "Mois 6", what: "200 initiatives couvrant 7 domaines, 1er rapport PDF exporté" },
    { when: "An 2", what: "Ouverture à 3 collaborateurs, 500 initiatives" },
    { when: "An 5", what: "Livre Blanc généré, conférence planifiée à 100%" },
  ];
  return (
    <section className="py-32 px-6 lg:px-12" style={{ background: C.surfaceAlt }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionTitle eyebrow="05 · KPIs produit" title="Du premier jour à la conférence." />
        </Reveal>

        <div className="mt-20 relative">
          {/* timeline line */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px"
            style={{ background: `linear-gradient(to bottom, ${C.primary}, ${C.accent})` }}
          />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <Reveal key={s.when} delay={i * 0.08}>
                <div className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0 mt-1">
                    <Circle className="w-4 h-4 fill-current" style={{ color: C.accent }} />
                  </div>
                  <div className="flex-1 pb-6">
                    <div
                      className="text-xs tracking-[0.25em] uppercase mb-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: C.primary }}
                    >
                      {s.when}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.25rem",
                        color: C.ink,
                        lineHeight: 1.4,
                      }}
                    >
                      {s.what}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Security -------- */
function SecuritySection() {
  const items = [
    "Authentification email/password + 2FA optionnel",
    "Routes protégées par middleware NextAuth",
    "Données chiffrées at rest (Supabase)",
    "Aucune donnée partagée sans action explicite",
    "Export et suppression de compte (RGPD)",
  ];
  return (
    <section className="py-32 px-6 lg:px-12" style={{ background: C.surface }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionTitle eyebrow="06 · Sécurité & confidentialité" title="Un coffre-fort, pas une vitrine." />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed" style={{ color: C.text2 }}>
              Ces réflexions sont stratégiques, personnelles, et parfois sensibles.
              MonPays+ doit rester privé par défaut — et ne s'ouvrir que quand
              tu décides, à qui tu décides.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <div
              className="p-10 rounded-2xl border"
              style={{ background: C.surfaceAlt, borderColor: C.border }}
            >
              <Shield className="w-10 h-10 mb-6" style={{ color: C.primary }} />
              <ul className="space-y-5">
                {items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-4 pb-5 border-b last:border-0 last:pb-0"
                    style={{ borderColor: C.border }}
                  >
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: C.accent }} />
                    <span className="text-base" style={{ color: C.ink }}>
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
