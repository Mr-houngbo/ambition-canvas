import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Globe2,
  Layers,
  Users2,
  Map,
  BookOpen,
  PenLine,
  Mic2,
  ArrowUpRight,
  Sparkles,
  Target,
  Compass,
  Quote,
  ChevronDown,
  Heart,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/layout/Header";

/* ---------- Palette (marron-orange) ----------
   --clay   #C56A3E   (orange terre cuite)
   --rust   #8E3B1F   (marron rouille)
   --ochre  #E8A66B   (ocre clair)
   --cream  #F6EFE6   (crème)
   --ink    #1E140E   (brun nuit)
------------------------------------------------ */

const PALETTE = {
  clay: "#C56A3E",
  rust: "#8E3B1F",
  ochre: "#E8A66B",
  cream: "#F6EFE6",
  ink: "#1E140E",
};

/* ---------------- Hook: count up ---------------- */
function useCountUp(target: number, duration = 1800, start = false) {
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

/* ---------------- Section wrapper ---------------- */
const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`relative px-6 md:px-12 lg:px-20 py-24 md:py-32 ${className}`}>
    {children}
  </section>
);

/* ---------------- Modules data ---------------- */
const MODULES = [
  {
    n: "01",
    icon: Globe2,
    title: "Initiatives",
    sub: "Le monde décortiqué",
    desc: "Fiches détaillées des meilleures initiatives mondiales : mécanisme de succès, conditions, obstacles, note de faisabilité au Bénin.",
    tags: ["Éducation", "Santé", "Agriculture", "Tech", "Gouvernance"],
  },
  {
    n: "02",
    icon: Layers,
    title: "Domaines",
    sub: "Vue par secteur",
    desc: "Tableau de bord par secteur — nombre d'initiatives, lacunes identifiées, priorités stratégiques pour le Bénin.",
    tags: ["Cartographie", "Priorités", "Lacunes"],
  },
  {
    n: "03",
    icon: Users2,
    title: "Réseau",
    sub: "Les bonnes personnes",
    desc: "Répertoire des talents identifiés à travers le monde — compétence, statut de la relation, potentiel de collaboration.",
    tags: ["Économistes", "Investisseurs", "Experts"],
  },
  {
    n: "04",
    icon: Map,
    title: "Roadmap 5 ans",
    sub: "Du rêve au plan",
    desc: "Jalons interactifs, deadlines, progression. La trajectoire entre aujourd'hui (étudiant) et le retour au pays.",
    tags: ["Jalons", "Deadlines", "Progress"],
  },
  {
    n: "05",
    icon: BookOpen,
    title: "Bibliothèque",
    sub: "Le savoir au chaud",
    desc: "Rapports, articles, livres, vidéos — classés par thème, annotés, prêts à servir la pensée stratégique.",
    tags: ["Rapports", "Livres", "Vidéos"],
  },
  {
    n: "06",
    icon: PenLine,
    title: "Journal stratégique",
    sub: "La pensée en mouvement",
    desc: "Espace de réflexion brute. Notes d'analyse, intuitions, remises en question. L'évolution de ma pensée datée.",
    tags: ["Analyse", "Doutes", "Idées"],
  },
  {
    n: "07",
    icon: Mic2,
    title: "Conférence 2030",
    sub: "Le rendez-vous",
    desc: "Programme, intervenants, logistique, budget, propositions. La préparation de l'événement qui transformera 5 ans de veille en action.",
    tags: ["Programme", "Intervenants", "Budget"],
  },
];

/* ---------------- Domaines ---------------- */
const DOMAINES = [
  { name: "Éducation", icon: "01", note: "Finlande · Singapour" },
  { name: "Santé", icon: "02", note: "Rwanda · Cuba" },
  { name: "Agriculture", icon: "03", note: "Pays-Bas · Israël" },
  { name: "Tech", icon: "04", note: "Estonie · Kenya" },
  { name: "Gouvernance", icon: "05", note: "Singapour · Botswana" },
  { name: "Finance", icon: "06", note: "Inde · Suisse" },
  { name: "Infrastructure", icon: "07", note: "Chine · Maroc" },
  { name: "Énergie", icon: "08", note: "Norvège · Costa Rica" },
];

/* ---------------- Phases ---------------- */
const PHASES = [
  {
    year: "An 1–2",
    label: "Collecter",
    desc: "Recensement obsessionnel. Lecture, voyages, conversations. La matière première s'accumule.",
  },
  {
    year: "An 2–3",
    label: "Analyser",
    desc: "Décortiquer chaque succès. Comprendre les conditions. Mesurer la transférabilité au contexte béninois.",
  },
  {
    year: "An 3–4",
    label: "Tisser",
    desc: "Construire le réseau. Économistes, investisseurs, praticiens. Mobiliser les ressources financières.",
  },
  {
    year: "An 4–5",
    label: "Rentrer",
    desc: "Retour au Bénin. Préparation finale de la conférence nationale. Activation du plan.",
  },
  {
    year: "An 5",
    label: "Conférence",
    desc: "Trois jours. Cent personnes. Un livre blanc. Et le début d'une bascule.",
  },
];

/* ---------------- Identité (noms candidats) ---------------- */
const NAMES = [
  { name: "AkoBénin", meaning: "Ako = savoir", vibe: "Linguistique africain" },
  { name: "LaboFon", meaning: "Laboratoire des fondations", vibe: "Scientifique" },
  { name: "Hounwa", meaning: "Vision en Fon", vibe: "Poétique" },
  { name: "BéninLab", meaning: "Le laboratoire du Bénin", vibe: "Direct" },
  { name: "2030BJ", meaning: "Le rendez-vous daté", vibe: "Manifeste" },
];

/* ===================== PAGE ===================== */
export default function MonPaysPlus() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  /* Stats trigger */
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const c1 = useCountUp(7, 1500, statsInView);
  const c2 = useCountUp(54, 1800, statsInView);
  const c3 = useCountUp(2030, 2200, statsInView);
  const c4 = useCountUp(100, 1600, statsInView);

  /* Inject fonts once */
  useEffect(() => {
    if (document.getElementById("monpays-fonts")) return;
    const l = document.createElement("link");
    l.id = "monpays-fonts";
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,800;9..144,900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: PALETTE.cream,
        color: PALETTE.ink,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Header />

      {/* Decorative grain */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ====================== HERO ====================== */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-end px-6 md:px-12 lg:px-20 pb-20 pt-32 overflow-hidden"
      >
        {/* Soleil ocre */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at center, ${PALETTE.clay} 0%, ${PALETTE.ochre} 40%, transparent 70%)`,
              filter: "blur(8px)",
              opacity: 0.85,
            }}
          />
        </motion.div>

        {/* Lignes verticales décor */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[12%] top-0 bottom-0 w-px" style={{ background: `${PALETTE.rust}15` }} />
          <div className="absolute left-[50%] top-0 bottom-0 w-px" style={{ background: `${PALETTE.rust}10` }} />
          <div className="absolute left-[88%] top-0 bottom-0 w-px" style={{ background: `${PALETTE.rust}15` }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="w-12 h-px"
              style={{ background: PALETTE.rust }}
            />
            <span
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
            >
              Plateforme · Think tank personnel · Bénin
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-black leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
              color: PALETTE.ink,
            }}
          >
            Mon<span style={{ color: PALETTE.clay }}>Pays</span>
            <span
              style={{
                color: PALETTE.clay,
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              +
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 grid md:grid-cols-12 gap-8 items-end"
          >
            <p
              className="md:col-span-7 text-xl md:text-2xl leading-relaxed"
              style={{ color: `${PALETTE.ink}cc`, fontFamily: "'Fraunces', serif" }}
            >
              Recenser ce que le monde fait de mieux. L'adapter au Bénin.
              <br />
              Et dans <span style={{ color: PALETTE.rust, fontWeight: 600 }}>cinq ans</span>, revenir avec un plan.
            </p>

            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-2">
              <span
                className="text-[10px] uppercase tracking-[0.25em]"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
              >
                Statut
              </span>
              <span className="text-base font-medium" style={{ color: PALETTE.ink }}>
                Phase 1 — Collecte active
              </span>
              <div
                className="h-1 rounded-full overflow-hidden mt-1"
                style={{ background: `${PALETTE.rust}20` }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "12%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full rounded-full"
                  style={{ background: PALETTE.clay }}
                />
              </div>
              <span
                className="text-xs mt-1"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: `${PALETTE.ink}80` }}
              >
                An 1 / 5 · Conférence prévue 2030
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-center gap-3"
          >
            <ChevronDown
              className="w-4 h-4 animate-bounce"
              style={{ color: PALETTE.rust }}
            />
            <span
              className="text-xs uppercase tracking-[0.25em]"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
            >
              Faire défiler
            </span>
          </motion.div>
        </div>
      </section>

      {/* ====================== MANIFESTO ====================== */}
      <Section className="border-t" id="manifeste">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-12"
          >
            <Quote className="w-5 h-5" style={{ color: PALETTE.clay }} />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
            >
              Pourquoi cette plateforme existe
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="leading-[1.2] tracking-tight"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
              fontWeight: 400,
              color: PALETTE.ink,
            }}
          >
            Je suis béninois, étudiant à l'étranger. Je vois chaque jour ce qui marche
            ailleurs — et je sais que mon pays peut faire pareil.{" "}
            <span style={{ color: PALETTE.clay, fontStyle: "italic" }}>
              Pas demain. Mais pas dans trente ans non plus.
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-10 text-lg md:text-xl leading-relaxed max-w-3xl"
            style={{ color: `${PALETTE.ink}cc` }}
          >
            Aujourd'hui je n'ai ni le réseau, ni le capital, ni la légitimité.
            J'ai cinq ans devant moi. Cinq ans pour observer, documenter, comprendre, et
            préparer. Cette plateforme est mon laboratoire — la mémoire vive d'une
            ambition qui ne se laissera pas oublier.
          </motion.p>
        </div>
      </Section>

      {/* ====================== STATS ====================== */}
      <section
        ref={statsRef}
        className="relative px-6 md:px-12 lg:px-20 py-24"
        style={{ background: PALETTE.ink, color: PALETTE.cream }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Sparkles className="w-5 h-5" style={{ color: PALETTE.ochre }} />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.ochre }}
            >
              La donne
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {[
              { val: c1, label: "Modules pour penser le pays", suffix: "" },
              { val: c2, label: "Pays passés au crible", suffix: "+" },
              { val: c3, label: "Année de la conférence", suffix: "" },
              { val: c4, label: "Personnes attendues", suffix: "" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <div
                  className="font-black leading-none"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                    color: PALETTE.ochre,
                  }}
                >
                  {s.val}
                  {s.suffix}
                </div>
                <div
                  className="mt-3 text-sm uppercase tracking-wider"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: `${PALETTE.cream}aa` }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== MODULES ====================== */}
      <Section id="modules">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 max-w-3xl"
          >
            <span
              className="text-xs uppercase tracking-[0.3em] block mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
            >
              · 02 · Les sept modules
            </span>
            <h2
              className="font-black leading-[0.95] tracking-tight"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: PALETTE.ink,
              }}
            >
              Sept espaces.
              <br />
              <span style={{ color: PALETTE.clay, fontStyle: "italic", fontWeight: 400 }}>
                Une seule trajectoire.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              const isFeatured = i === 0 || i === 6;
              return (
                <motion.div
                  key={m.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className={`group relative overflow-hidden rounded-3xl p-8 border transition-all duration-500 ${
                    isFeatured ? "lg:col-span-1" : ""
                  }`}
                  style={{
                    background: isFeatured
                      ? `linear-gradient(135deg, ${PALETTE.clay}, ${PALETTE.rust})`
                      : "#fff",
                    borderColor: isFeatured ? "transparent" : `${PALETTE.rust}20`,
                    color: isFeatured ? PALETTE.cream : PALETTE.ink,
                    boxShadow: isFeatured
                      ? `0 25px 60px -20px ${PALETTE.rust}55`
                      : `0 10px 30px -15px ${PALETTE.rust}25`,
                  }}
                >
                  <div className="flex items-start justify-between mb-12">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: isFeatured ? `${PALETTE.cream}25` : `${PALETTE.clay}15`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: isFeatured ? PALETTE.cream : PALETTE.clay }}
                      />
                    </div>
                    <span
                      className="text-xs tracking-[0.25em] opacity-60"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {m.n}
                    </span>
                  </div>

                  <div
                    className="text-xs uppercase tracking-[0.25em] mb-2 opacity-70"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {m.sub}
                  </div>
                  <h3
                    className="text-3xl font-bold mb-4 leading-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-85 mb-6">{m.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          background: isFeatured ? `${PALETTE.cream}20` : `${PALETTE.rust}08`,
                          color: isFeatured ? PALETTE.cream : PALETTE.rust,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ArrowUpRight
                    className="absolute top-8 right-8 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: isFeatured ? PALETTE.cream : PALETTE.clay }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ====================== DOMAINES ====================== */}
      <Section className="border-t" id="domaines" >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-12 gap-10 mb-16"
          >
            <div className="md:col-span-5">
              <span
                className="text-xs uppercase tracking-[0.3em] block mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
              >
                · 03 · Champs d'observation
              </span>
              <h2
                className="font-black leading-[0.95] tracking-tight"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                  color: PALETTE.ink,
                }}
              >
                Huit domaines.
                <br />
                <span style={{ color: PALETTE.clay, fontStyle: "italic", fontWeight: 400 }}>
                  Le monde entier.
                </span>
              </h2>
            </div>
            <p
              className="md:col-span-6 md:col-start-7 text-lg leading-relaxed self-end"
              style={{ color: `${PALETTE.ink}b0` }}
            >
              Pour chaque domaine, deux ou trois pays-références. On ne réinvente pas la
              roue — on prend ce qui fonctionne, on comprend pourquoi, on adapte.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t" style={{ borderColor: `${PALETTE.rust}25` }}>
            {DOMAINES.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-8 border-b border-r transition-colors duration-300 cursor-pointer"
                style={{ borderColor: `${PALETTE.rust}25` }}
                whileHover={{ background: `${PALETTE.clay}08` }}
              >
                <span
                  className="text-xs opacity-50"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
                >
                  {d.icon}
                </span>
                <h3
                  className="mt-3 text-2xl font-bold leading-tight"
                  style={{ fontFamily: "'Fraunces', serif", color: PALETTE.ink }}
                >
                  {d.name}
                </h3>
                <p
                  className="mt-1 text-xs uppercase tracking-wider"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: `${PALETTE.ink}70` }}
                >
                  {d.note}
                </p>
                <ArrowUpRight
                  className="mt-6 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: PALETTE.clay }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ====================== ROADMAP ====================== */}
      <section
        className="relative px-6 md:px-12 lg:px-20 py-32"
        style={{ background: PALETTE.ink, color: PALETTE.cream }}
        id="roadmap"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-5 h-5" style={{ color: PALETTE.ochre }} />
              <span
                className="text-xs uppercase tracking-[0.3em]"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.ochre }}
              >
                · 04 · Trajectoire
              </span>
            </div>
            <h2
              className="font-black leading-[0.95] tracking-tight"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              }}
            >
              Cinq ans.{" "}
              <span style={{ color: PALETTE.ochre, fontStyle: "italic", fontWeight: 400 }}>
                Cinq mouvements.
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Ligne verticale */}
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: `${PALETTE.ochre}30` }}
            />

            <div className="space-y-16">
              {PHASES.map((p, i) => {
                const left = i % 2 === 0;
                return (
                  <motion.div
                    key={p.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className={`relative grid md:grid-cols-2 gap-8 ${left ? "" : "md:[direction:rtl]"}`}
                  >
                    {/* Marker */}
                    <div className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 z-10">
                      <div className="relative">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ background: PALETTE.clay }}
                        />
                        {i === 0 && (
                          <div
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{ background: PALETTE.clay, opacity: 0.5 }}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className={`pl-12 md:pl-0 ${left ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left [direction:ltr]"}`}
                    >
                      <span
                        className="text-xs uppercase tracking-[0.3em]"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.ochre }}
                      >
                        {p.year}
                      </span>
                      <h3
                        className="text-4xl md:text-5xl font-black mt-2"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {p.label}
                      </h3>
                    </div>
                    <div
                      className={`pl-12 md:pl-0 ${left ? "md:pl-16 [direction:ltr]" : "md:pr-16 md:text-right"}`}
                    >
                      <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: `${PALETTE.cream}c0` }}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== IDENTITÉ ====================== */}
      <Section id="identite">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span
              className="text-xs uppercase tracking-[0.3em] block mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
            >
              · 05 · Identité — nom de travail
            </span>
            <h2
              className="font-black leading-[0.95] tracking-tight max-w-4xl"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                color: PALETTE.ink,
              }}
            >
              Encore en quête{" "}
              <span style={{ color: PALETTE.clay, fontStyle: "italic", fontWeight: 400 }}>
                du bon nom.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {NAMES.map((n, i) => (
              <motion.div
                key={n.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border bg-white cursor-pointer transition-all duration-300"
                style={{
                  borderColor: `${PALETTE.rust}20`,
                  boxShadow: `0 10px 30px -20px ${PALETTE.rust}40`,
                }}
              >
                <div
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Fraunces', serif", color: PALETTE.ink }}
                >
                  {n.name}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: `${PALETTE.ink}90` }}>
                  {n.meaning}
                </div>
                <div
                  className="mt-4 text-[10px] uppercase tracking-wider"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.clay }}
                >
                  {n.vibe}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ====================== PRINCIPES ====================== */}
      <Section className="border-t" id="principes">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span
              className="text-xs uppercase tracking-[0.3em] block mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.rust }}
            >
              · 06 · Principes directeurs
            </span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: "Rigueur",
                t: "Pas de naïveté. Chaque initiative est jugée à l'aune des conditions béninoises — réalisme avant tout.",
              },
              {
                icon: Heart,
                title: "Espoir lucide",
                t: "On ne nie pas les obstacles. On les nomme, on les contourne, on les transforme en leviers.",
              },
              {
                icon: TrendingUp,
                title: "Action différée",
                t: "L'urgence n'est pas dans l'exécution immédiate, mais dans la qualité de la préparation.",
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Icon className="w-8 h-8 mb-6" style={{ color: PALETTE.clay }} />
                  <h3
                    className="text-3xl font-bold mb-4"
                    style={{ fontFamily: "'Fraunces', serif", color: PALETTE.ink }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: `${PALETTE.ink}b0` }}>
                    {p.t}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ====================== CLOSING ====================== */}
      <section
        className="relative px-6 md:px-12 lg:px-20 py-32 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${PALETTE.rust}, ${PALETTE.clay})`,
          color: PALETTE.cream,
        }}
      >
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${PALETTE.ochre}50 0%, transparent 70%)`,
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <Lightbulb className="w-10 h-10" style={{ color: PALETTE.cream }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-black leading-[0.95] tracking-tight"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            }}
          >
            Le Bénin n'attendra pas.
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: PALETTE.cream }}>
              Mais moi, je me prépare.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: `${PALETTE.cream}d0` }}
          >
            Cette plateforme grandira avec moi. Privée aujourd'hui. Partagée demain.
            Publique le jour où elle sera prête à parler au pays tout entier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ background: `${PALETTE.cream}15`, border: `1px solid ${PALETTE.cream}30` }}
          >
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Rendez-vous en 2030
            </span>
          </motion.div>
        </div>
      </section>

      <footer
        className="px-6 md:px-12 lg:px-20 py-10 text-center"
        style={{ background: PALETTE.ink, color: `${PALETTE.cream}60` }}
      >
        <p
          className="text-xs uppercase tracking-[0.3em]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          MonPays+ · Think tank personnel · Bénin · 2025—2030
        </p>
      </footer>
    </div>
  );
}
