import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { BookOpen, Film, School, ArrowDown, Quote, Target, TrendingUp, Users, Lightbulb, ChevronRight } from 'lucide-react';

const START_DATE = new Date('2025-03-01');

const useCountUp = (end: number, duration = 2000, trigger = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, trigger]);
  return count;
};

const Section = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-600 mb-4">
    {children}
  </span>
);

const phases = [
  {
    num: 1,
    title: 'Fondations',
    years: 'Années 1–3',
    role: 'Étudiant chercheur',
    status: 'ACTIVE',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/8',
    borderColor: 'border-emerald-500/20',
    textColor: 'text-emerald-700',
    description: 'Phase 1 (années 1–3) — c\'est maintenant. Vous êtes étudiant, c\'est votre avantage. Vous avez du temps, un accès à des bibliothèques, et aucune obligation de résultat immédiat. Utilisez ces années pour lire de manière obsessionnelle : les rapports PISA, les réformes finlandaise et singapourienne, les écrits de John Dewey, Ken Robinson, Paulo Freire. Parallèlement, commencez à écrire publiquement — un blog, LinkedIn, X — pour poser votre voix et construire une communauté avant même d\'avoir un produit.',
    pillars: [
      { title: 'Recherche', text: 'Étudier 10 systèmes éducatifs (Finlande, Singapour, Corée, Canada, etc.) + Bénin en profondeur' },
      { title: 'Réseau', text: 'Contacter experts, enseignants, parents, élèves, ONG, diaspora béninoise. Construire votre communauté.' },
      { title: 'Premiers écrits', text: 'Blog, articles, threads sur les réseaux. Poser votre voix publiquement. Tester vos idées face à un vrai public.' },
    ],
  },
  {
    num: 2,
    title: 'Création',
    years: 'Années 3–7',
    role: 'Auteur et cinéaste',
    status: 'À VENIR',
    color: 'from-indigo-500 to-violet-600',
    bgColor: 'bg-indigo-500/8',
    borderColor: 'border-indigo-500/20',
    textColor: 'text-indigo-700',
    description: 'Le tournant. Le documentaire et le livre doivent sortir à peu près au même moment. Le livre donne la profondeur intellectuelle, le documentaire donne l\'émotion et la viralité. L\'un sans l\'autre est incomplet. Pour le documentaire, commencez dès maintenant à identifier les deux familles que vous allez suivre — idéalement dès l\'entrée au primaire. Plus vous commencez tôt, plus le film sera puissant.',
    pillars: [
      { title: 'Le livre', text: 'Rédiger le manifeste : diagnostic + modèle alternatif complet. Publier en FR + EN et en libre accès.' },
      { title: 'Le documentaire', text: 'Suivre deux enfants sur 5-7 ans. Trouver coproducteurs, ONG, chaînes africaines. Viser Netflix Africa.' },
      { title: 'Plaidoyer', text: 'Présenter le livre aux décideurs béninois, UA, UNESCO, bailleurs de fonds (Banque mondiale, etc.).' },
    ],
  },
  {
    num: 3,
    title: 'Expérimentation',
    years: 'Années 7–13',
    role: 'Fondateur',
    status: 'À VENIR',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/8',
    borderColor: 'border-amber-500/20',
    textColor: 'text-amber-700',
    description: 'La preuve. C\'est la phase la plus difficile et la plus décisive. Une école pilote transforme votre discours en réalité. Sans elle, vous restez un théoricien. Avec elle, vous devenez un praticien crédible face aux gouvernements et aux bailleurs.',
    pillars: [
      { title: 'École pilote', text: 'Ouvrir 1 école primaire selon votre modèle. Mesurer, documenter, ajuster chaque année.' },
      { title: 'Groupe scolaire', text: 'Étendre : collège, lycée. Créer une marque reconnue. Attirer des talents pédagogiques.' },
      { title: 'Preuves concrètes', text: 'Publier des résultats mesurables : taux de réussite, emploi, bien-être des élèves vs système classique.' },
    ],
  },
  {
    num: 4,
    title: 'Impact systémique',
    years: 'Années 13–20',
    role: 'Réformateur',
    status: 'À VENIR',
    color: 'from-stone-600 to-stone-800',
    bgColor: 'bg-stone-500/8',
    borderColor: 'border-stone-500/20',
    textColor: 'text-stone-700',
    description: 'À ce stade, si les résultats sont là, le système vient à vous. Vous n\'avez plus à convaincre — vous montrez.',
    pillars: [
      { title: 'Essaimage', text: 'Franchise / open-source du modèle pour d\'autres acteurs au Bénin et en Afrique de l\'Ouest.' },
      { title: 'Influence politique', text: 'Collaborer avec le Ministère pour intégrer des éléments de votre modèle dans le programme national.' },
      { title: 'Héritage', text: 'Formation de la prochaine génération de réformateurs. Fondation / think tank dédié à l\'éducation.' },
    ],
  },
];

const diagnosticStats = [
  { value: '70', suffix: '%', label: 'des diplômés sans emploi adéquat', size: 'text-7xl' },
  { value: '2', suffix: '/10', label: 'élèves maîtrisent les compétences de base en fin de primaire', size: 'text-6xl' },
  { value: '45', suffix: '%', label: 'de fuite des cerveaux parmi les diplômés du supérieur', size: 'text-7xl' },
];

const VisionEducation = () => {
  const [dayCount, setDayCount] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));
    setDayCount(Math.max(1, diff));
  }, []);

  return (
    <Layout>
      {/* Dot grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0A0908 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* === HERO === */}
      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-emerald-400/5 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full bg-teal-400/5 blur-[100px]" />
        
        <div className="relative z-10 container max-w-4xl text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Manifeste personnel · Plan 20 ans</SectionLabel>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight text-foreground mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Je vais changer
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400">
              l'éducation au Bénin.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto"
          >
            Pas dans 50 ans. Dans 20 ans. Et ça commence maintenant.
          </motion.p>

          {/* Day counter */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-200 bg-emerald-50/50 backdrop-blur-sm mb-16"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-sm tracking-wide text-foreground">
              Jour <span className="font-bold text-emerald-600">{dayCount}</span> de <span className="text-muted-foreground">7 300</span>
            </span>
          </motion.div>

          {/* Quote */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
              <p className="text-base text-muted-foreground italic leading-relaxed text-left">
                "L'éducation est l'arme la plus puissante qu'on puisse utiliser pour changer le monde."
              </p>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-2 font-mono tracking-wider">— NELSON MANDELA</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground/40 animate-bounce" />
          </motion.div>
        </div>
      </motion.div>

      {/* === DIAGNOSTIC === */}
      <Section className="py-32 px-6">
        <div className="container max-w-5xl">
          <SectionLabel>Le diagnostic</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Pourquoi le système béninois échoue.
          </h2>
          <p className="text-muted-foreground text-lg mb-20 max-w-2xl">
            Des chiffres qui parlent d'eux-mêmes. Derrière chaque statistique, des millions de vies freinées.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {diagnosticStats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* === VISION === */}
      <Section className="py-32 px-6">
        <div className="container max-w-5xl">
          <SectionLabel>La vision</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Le monde que je veux créer.
          </h2>
          <p className="text-muted-foreground text-lg mb-20 max-w-2xl">
            Trois piliers. Trois armes. Un même objectif : prouver qu'une autre éducation est possible.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Film, title: 'Le documentaire', desc: 'Un film vu partout en Afrique, qui montre la réalité et inspire le changement. L\'émotion comme moteur de la viralité.', tag: 'CRÉER L\'ÉMOTION' },
              { icon: BookOpen, title: 'Le livre', desc: 'Un manifeste qui propose un nouveau modèle éducatif, ancré dans les réalités béninoises et nourri des meilleures pratiques mondiales.', tag: 'DONNER LA PROFONDEUR' },
              { icon: School, title: 'Le groupe scolaire', desc: 'Une école qui prouve que c\'est possible. Des résultats mesurables. Une preuve vivante que le modèle fonctionne.', tag: 'PROUVER PAR L\'ACTION' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-emerald-200 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <item.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-emerald-600/70 mb-3 block">{item.tag}</span>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* === ROADMAP === */}
      <Section className="py-32 px-6">
        <div className="container max-w-5xl">
          <SectionLabel>La feuille de route</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Le plan sur 20 ans.
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
            Chaque phase nourrit la suivante — la recherche légitime le livre, le livre légitime l'école, l'école légitime la réforme.
          </p>

          <div className="space-y-8 mt-16">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative rounded-2xl border ${phase.borderColor} ${phase.bgColor} overflow-hidden`}
              >
                {/* Header */}
                <div className="p-8 pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${phase.color} text-white font-bold text-sm`}>
                        {phase.num}
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Phase {phase.num} — {phase.title}</h3>
                        <p className="text-sm text-muted-foreground font-mono tracking-wide">{phase.years} · {phase.role}</p>
                      </div>
                    </div>
                    <span className={`font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full font-semibold ${
                      phase.status === 'ACTIVE' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-muted text-muted-foreground border border-border'
                    }`}>
                      {phase.status === 'ACTIVE' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />}
                      {phase.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-3xl">
                    {phase.description}
                  </p>
                </div>

                {/* Pillars */}
                <div className="grid md:grid-cols-3 gap-4 p-8 pt-6">
                  {phase.pillars.map((pillar, j) => (
                    <div key={j} className="p-5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/30">
                      <h4 className="font-bold text-foreground mb-2 text-sm">{pillar.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{pillar.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* === POURQUOI MOI === */}
      <Section className="py-32 px-6">
        <div className="container max-w-3xl">
          <SectionLabel>Le fuel personnel</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-16 tracking-tight">
            Ce qui me pousse.
          </h2>

          <div className="space-y-8">
            {[
              "Je ne viens pas d'un milieu qui m'a tout donné.",
              "Je viens d'un pays où des millions d'enfants brillants sont éteints par un système qui ne sait pas les voir.",
              "Je refuse d'accepter que le lieu de naissance détermine le plafond d'un esprit.",
              "Je ne fais pas ça pour être célèbre. Je fais ça parce que quelqu'un doit le faire — et que je suis prêt à y consacrer 20 ans de ma vie.",
              "Chaque jour que je travaille sur ce projet est un jour volé au statu quo.",
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-xl sm:text-2xl font-medium text-foreground/85 leading-relaxed"
                style={{ fontStyle: i === 3 ? 'italic' : 'normal' }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </Section>

      {/* === FOOTER === */}
      <Section className="py-24 px-6 border-t border-border/30">
        <div className="container max-w-5xl text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/50 mb-6">
            Créé le 1er mars 2025
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-foreground/70 max-w-xl mx-auto leading-relaxed">
            Ce projet n'appartient pas au futur.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 font-bold">
              Il commence aujourd'hui.
            </span>
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default VisionEducation;
