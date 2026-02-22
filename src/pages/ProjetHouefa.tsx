import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Building2, Heart, MapPin, Layers, DollarSign, Rocket, Users, 
  PiggyBank, BarChart3, Palette, AlertTriangle, BookOpen, 
  CheckSquare, Flame, Target, Lightbulb,
  Wifi, Shield, Utensils, Bike, Smartphone, GraduationCap,
  TrendingUp, Calendar, Clock, Star, Globe, Zap, Home,
  ArrowDown, ChevronRight, Sparkles, Eye, Award
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import heroImage from '@/assets/houefa-hero.jpg';

// Countdown to Sept 2029
const getCountdown = () => {
  const target = new Date('2029-09-01').getTime();
  const now = Date.now();
  const diff = target - now;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  return { days, hours, minutes };
};

// Animated number counter
const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += Math.ceil(end / 60);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}{suffix}</span>;
};

// Glassmorphism section wrapper
const GlassSection = ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`relative ${className}`}
  >
    {children}
  </motion.section>
);

// Stat card with glow
const StatGlow = ({ value, label, icon: Icon, color }: { value: string; label: string; icon: any; color: string }) => {
  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-400 to-teal-500 shadow-emerald-500/25',
    sky: 'from-sky-400 to-blue-500 shadow-sky-500/25',
    amber: 'from-amber-400 to-orange-500 shadow-amber-500/25',
    rose: 'from-rose-400 to-pink-500 shadow-rose-500/25',
    violet: 'from-violet-400 to-purple-500 shadow-violet-500/25',
  };
  return (
    <motion.div whileHover={{ scale: 1.05, y: -4 }} className="group">
      <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 p-5 overflow-hidden">
        <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${colorMap[color]} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />
        <Icon className="w-5 h-5 text-muted-foreground mb-3" />
        <p className="text-2xl font-extrabold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

// Pillar with immersive hover
const PillarImmersive = ({ icon: Icon, title, gradient, number, children }: { icon: any; title: string; gradient: string; number: string; children: React.ReactNode }) => (
  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }} className="group">
    <div className="relative rounded-3xl bg-card/80 backdrop-blur-xl border border-border/40 overflow-hidden h-full">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`} />
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-all duration-700`} />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold text-muted-foreground/50 tracking-widest">{number}</span>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
          </div>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">{children}</div>
      </div>
    </div>
  </motion.div>
);

// Timeline with connecting line
const TimelineModern = ({ year, title, color, items, isLast = false }: { year: string; title: string; color: string; items: string[]; isLast?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, x: -30 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    viewport={{ once: true }}
    className="relative flex gap-6"
  >
    <div className="flex flex-col items-center">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg z-10`}>
        <span className="text-white text-xs font-black">{year.split('-')[0]}</span>
      </div>
      {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-border to-transparent mt-2" />}
    </div>
    <div className="pb-10 flex-1">
      <Badge variant="outline" className="mb-2 text-xs font-bold">{year}</Badge>
      <h4 className="font-bold text-foreground text-lg mb-3">{title}</h4>
      <div className="grid gap-2">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 bg-card/50 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-border/30"
          >
            <ChevronRight className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
            <span className="text-sm text-muted-foreground">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const RiskModern = ({ title, probability, impact, mitigations, index }: { title: string; probability: string; impact: string; mitigations: string[]; index: number }) => {
  const impactColor = impact === 'Critique' ? 'bg-red-500/10 text-red-600 border-red-500/20' : impact === 'Élevé' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20';
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
      <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-5 h-full">
        <h4 className="font-bold text-foreground mb-3">{title}</h4>
        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className="text-xs">Prob: {probability}</Badge>
          <Badge className={`text-xs border ${impactColor}`}>{impact}</Badge>
        </div>
        <ul className="space-y-2">
          {mitigations.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Shield className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ProjetHouefa = () => {
  const [countdown, setCountdown] = useState(getCountdown());
  const [activeNav, setActiveNav] = useState('vision');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown()), 60000);
    return () => clearInterval(t);
  }, []);

  const milestonesCompleted = 1;
  const totalMilestones = 12;

  const navSections = [
    { id: 'vision', label: 'Vision', icon: Target },
    { id: 'definition', label: 'Définition', icon: Building2 },
    { id: 'pourquoi', label: 'Pourquoi', icon: Heart },
    { id: 'localisation', label: 'Lieu', icon: MapPin },
    { id: 'piliers', label: 'Piliers', icon: Layers },
    { id: 'business', label: 'Business', icon: DollarSign },
    { id: 'roadmap', label: 'Roadmap', icon: Rocket },
    { id: 'equipe', label: 'Équipe', icon: Users },
    { id: 'financement', label: 'Fonds', icon: PiggyBank },
    { id: 'kpis', label: 'KPIs', icon: BarChart3 },
    { id: 'branding', label: 'Marque', icon: Palette },
    { id: 'risques', label: 'Risques', icon: AlertTriangle },
    { id: 'ressources', label: 'Ressources', icon: BookOpen },
    { id: 'actions', label: 'Actions', icon: CheckSquare },
    { id: 'motivation', label: 'Motivation', icon: Flame },
  ];

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    navSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* === HERO IMMERSIF === */}
      <div ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img src={heroImage} alt="Houefa Campus" className="w-full h-full object-cover" />
        </motion.div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl animate-bounce-subtle" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl animate-bounce-subtle" style={{ animationDelay: '-1s' }} />
        
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-xl rounded-full px-5 py-2 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white/90">Phase de conceptualisation</span>
            </motion.div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-3 tracking-tighter"
            style={{ textShadow: '0 4px 60px rgba(46,204,113,0.3)' }}
          >
            HOUEFA
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-emerald-300/90 font-light mb-2 italic tracking-wide"
          >
            « Maison paisible, apaisée et apaisante »
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-12"
          >
            Plus qu'un toit, un écosystème pour ta réussite
          </motion.p>

          {/* Countdown trio */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="flex items-center gap-3 md:gap-5"
          >
            {[
              { value: countdown.days, label: 'JOURS' },
              { value: countdown.hours, label: 'HEURES' },
              { value: countdown.minutes, label: 'MIN' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl" />
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 px-5 py-4 md:px-7 md:py-5 min-w-[80px]">
                    <p className="text-3xl md:text-4xl font-black text-white tabular-nums">{String(item.value).padStart(2, '0')}</p>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-white/40 mt-2 tracking-[0.2em]">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/40 tracking-widest">EXPLORER</span>
            <ArrowDown className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      </div>

      {/* === STICKY NAV === */}
      <div className="sticky top-[4.5rem] z-40 bg-card/70 backdrop-blur-2xl border-b border-border/30">
        <div className="container overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 py-2.5 min-w-max">
            {navSections.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 whitespace-nowrap
                  ${activeNav === s.id 
                    ? 'bg-emerald-500/10 text-emerald-600 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'}`}
              >
                <s.icon className="w-3 h-3" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* === PROGRESS === */}
      <div className="container pt-8 pb-4">
        <div className="relative rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground flex items-center gap-2">
              <Rocket className="w-4 h-4 text-emerald-500" />
              Progression globale
            </span>
            <span className="text-sm font-black text-emerald-600">{milestonesCompleted}/{totalMilestones} étapes</span>
          </div>
          <div className="relative h-3 w-full rounded-full bg-secondary/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.round((milestonesCompleted / totalMilestones) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            />
            <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500/50 to-teal-400/50 blur-sm" style={{ width: `${Math.round((milestonesCompleted / totalMilestones) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* === CONTENT === */}
      <div className="container py-8 max-w-5xl space-y-24">

        {/* S1 - VISION */}
        <GlassSection id="vision">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 tracking-widest">01</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Vision & Identité</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatGlow icon={Star} value="Calixte" label="Fondateur" color="emerald" />
            <StatGlow icon={Calendar} value="5 ans" label="Horizon (2025-2029)" color="sky" />
            <StatGlow icon={Rocket} value="Sept 2029" label="Ouverture cible" color="amber" />
            <StatGlow icon={Lightbulb} value="Phase 1" label="Conceptualisation" color="violet" />
          </div>
          <motion.blockquote 
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-8 border border-emerald-500/20 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <Sparkles className="w-8 h-8 text-emerald-500/40 mb-4" />
            <p className="text-xl md:text-2xl font-bold text-foreground italic leading-relaxed">
              "Je ne construis pas une résidence, je construis des destins."
            </p>
            <p className="text-sm text-emerald-600 font-semibold mt-4">— Calixte, Fondateur</p>
          </motion.blockquote>
        </GlassSection>

        {/* S2 - DEFINITION */}
        <GlassSection id="definition">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-600 tracking-widest">02</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Qu'est-ce que Houefa ?</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Home, title: 'Hébergement', desc: 'Logements modernes, meublés, tout inclus', color: 'from-emerald-400 to-teal-500' },
              { icon: Smartphone, title: 'Technologie', desc: 'SuperApp, identité numérique, paiements', color: 'from-sky-400 to-blue-500' },
              { icon: GraduationCap, title: 'Formation', desc: 'Accès plateformes, mentorat, bootcamps', color: 'from-violet-400 to-purple-500' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className="group">
                <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6 overflow-hidden h-full">
                  <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-all duration-500`} />
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 p-6 md:p-8 space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p><strong className="text-foreground">Houefa</strong> est un concept de résidences étudiantes intelligentes de nouvelle génération au Bénin. Plus qu'un simple logement, c'est un écosystème complet qui combine hébergement moderne, technologie de pointe, formation continue et communauté d'excellence — le tout accessible via un loyer mensuel unique all-inclusive.</p>
            <p>Ce qui distingue Houefa, c'est son approche holistique : une <strong className="text-foreground">SuperApp intégrée</strong> centralise l'identité numérique de chaque résident, ses paiements, l'accès aux services et aux opportunités.</p>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-500/5 border border-sky-500/10 mt-4">
              <Eye className="w-5 h-5 text-sky-500 shrink-0" />
              <p className="text-sm"><strong className="text-foreground">Vision 5-10 ans :</strong> 20-30 résidences en Afrique de l'Ouest, LA référence pour le logement étudiant africain.</p>
            </div>
          </div>
        </GlassSection>

        {/* S3 - POURQUOI */}
        <GlassSection id="pourquoi">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-orange-600 tracking-widest">03</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Pourquoi ce projet</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div whileHover={{ y: -4 }} className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6 group">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-foreground">Le problème</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Le logement étudiant en Afrique — et à l'UAC en particulier — est catastrophique. Des étudiants brillants échouent non pas par manque de talent, mais parce que leurs conditions de vie les empêchent de se concentrer. Pas d'électricité stable, pas d'eau courante, pas d'internet.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6 group">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-sky-500" />
                <h3 className="font-bold text-foreground">L'impact visé</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Former une nouvelle génération de talents africains en leur donnant l'égalité des chances. Prouver qu'un modèle d'excellence accessible est viable. Créer les leaders de demain.
              </p>
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-emerald-500/10" />
            <div className="relative p-8 md:p-10 border border-orange-500/15 rounded-3xl">
              <Flame className="w-8 h-8 text-orange-400 mb-4" />
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed italic">
                « J'ai fait l'UAC. J'ai vu de mes propres yeux comment l'environnement influence massivement les résultats des étudiants. Si on supprime les soucis de nourriture, d'électricité, d'eau, de loyer — si on libère l'étudiant de ces fardeaux — il peut se consacrer à apprendre, à grandir, à innover. Houefa, c'est la résidence que j'aurais voulu avoir. »
              </p>
              <p className="text-right text-sm font-bold text-orange-600 mt-4">— Calixte</p>
            </div>
          </motion.div>
        </GlassSection>

        {/* S4 - LOCALISATION */}
        <GlassSection id="localisation">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-600 tracking-widest">04</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Où et pour qui</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div whileHover={{ y: -4 }} className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-500" /> Localisation Phase 1</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Bénin 🇧🇯</strong> — Abomey-Calavi</p>
                <p><strong className="text-foreground">Proximité :</strong> Université d'Abomey-Calavi (UAC)</p>
                <p><strong className="text-foreground">Quartiers :</strong> Godomey, Akassato, Tankpè</p>
                <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-sky-500/5 border border-sky-500/10">
                  <Zap className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-medium">60 000+ étudiants, marché quasi-vierge</span>
                </div>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-emerald-500" /> Public cible</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Étudiants UAC (Licence, Master) + universités de la zone</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20">40% modestes</Badge>
                  <Badge className="bg-sky-500/10 text-sky-700 border-sky-500/20">40% classe moy.</Badge>
                  <Badge className="bg-violet-500/10 text-violet-700 border-violet-500/20">20% aisés</Badge>
                </div>
                <div className="flex items-center gap-2 mt-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium">25-50k FCFA tout compris vs 45-55k pour conditions médiocres</span>
                </div>
              </div>
            </motion.div>
          </div>
        </GlassSection>

        {/* S5 - PILIERS */}
        <GlassSection id="piliers">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 tracking-widest">05</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Les 4 Piliers</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PillarImmersive icon={Home} title="Infrastructure Physique" gradient="from-emerald-500 to-teal-600" number="PILIER 01">
              <p><strong className="text-foreground">45 unités / 100 places :</strong></p>
              <ul className="space-y-1 ml-1">
                <li>• 10 Studios Solo (15m²) — 50 000 FCFA</li>
                <li>• 20 T2 Duo (30m²) — 75 000 FCFA</li>
                <li>• 10 T3 Trio (40m²) — 90 000 FCFA</li>
                <li>• 5 T4 Coloc (50m²) — 100 000 FCFA</li>
              </ul>
              <p className="mt-2"><strong className="text-foreground">Inclus :</strong> Meublé, électricité, eau, clim, internet fibré</p>
            </PillarImmersive>

            <PillarImmersive icon={Smartphone} title="Écosystème Numérique" gradient="from-sky-500 to-blue-600" number="PILIER 02">
              <p><strong className="text-foreground">SuperApp Houefa :</strong></p>
              <ul className="space-y-1 ml-1">
                <li>• Identité numérique & carte résident</li>
                <li>• Paiements Mobile Money intégrés</li>
                <li>• Réservation espaces & signalements</li>
                <li>• Job board, events, formations</li>
                <li>• Messagerie & communauté par filière</li>
              </ul>
              <p className="mt-2"><strong className="text-foreground">Accès :</strong> JSTOR, Coursera, edX, Microsoft 365, GitHub</p>
            </PillarImmersive>

            <PillarImmersive icon={Utensils} title="Services & Bien-être" gradient="from-orange-400 to-amber-600" number="PILIER 03">
              <ul className="space-y-1 ml-1">
                <li>• Restaurant subventionné à prix étudiants</li>
                <li>• Infirmerie / Point santé</li>
                <li>• Vélos électriques en location</li>
                <li>• WiFi gratuit partout</li>
              </ul>
              <p className="mt-2"><strong className="text-foreground">Programmation :</strong> Conférences, ateliers CV/pitch, bootcamps tech, networking</p>
            </PillarImmersive>

            <PillarImmersive icon={Heart} title="Impact & Mission Sociale" gradient="from-rose-500 to-red-600" number="PILIER 04">
              <ul className="space-y-1 ml-1">
                <li>• 40% logements à tarif accessible (25-30k FCFA)</li>
                <li>• Sélection sur potentiel, pas les moyens</li>
                <li>• Bourses pour étudiants d'excellence modestes</li>
                <li>• Mentorat croisé (aisés ↔ modestes)</li>
                <li>• Réseau alumni</li>
              </ul>
              <p className="mt-2"><strong className="text-foreground">Partenariats :</strong> UAC, entreprises sponsors, fondations</p>
            </PillarImmersive>
          </div>
        </GlassSection>

        {/* S6 - BUSINESS MODEL */}
        <GlassSection id="business">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 tracking-widest">06</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Modèle Économique</h2>
            </div>
          </div>

          {/* Revenue table */}
          <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 overflow-hidden mb-8">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
            <div className="p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" /> Revenus An 1 (100 étudiants)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 font-medium text-muted-foreground">Type</th>
                      <th className="text-center py-3 font-medium text-muted-foreground">Unités</th>
                      <th className="text-right py-3 font-medium text-muted-foreground">Prix/mois</th>
                      <th className="text-right py-3 font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      ['Studios Solo', '10', '50 000', '500 000'],
                      ['T2 Duo', '20', '75 000', '1 500 000'],
                      ['T3 Trio', '10', '90 000', '900 000'],
                      ['T4 Coloc', '5', '100 000', '500 000'],
                    ].map(([type, units, price, total], i) => (
                      <tr key={i} className="border-b border-border/30"><td className="py-3">{type}</td><td className="text-center">{units}</td><td className="text-right">{price}</td><td className="text-right">{total}</td></tr>
                    ))}
                    <tr className="font-bold text-foreground"><td className="py-3">TOTAL MENSUEL</td><td className="text-center">45</td><td></td><td className="text-right text-emerald-600">3 400 000 FCFA</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Revenue summary & Profit */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <StatGlow icon={TrendingUp} value="40.8M" label="Revenus loyers/an (FCFA)" color="emerald" />
            <StatGlow icon={DollarSign} value="46.7M" label="Revenus totaux/an (~80k$)" color="sky" />
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/10" />
              <div className="relative p-5 text-center flex flex-col items-center justify-center h-full">
                <Zap className="w-6 h-6 text-emerald-500 mb-2" />
                <p className="text-3xl font-black text-emerald-600">14.2M</p>
                <p className="text-xs text-muted-foreground mt-1">Profit Net An 1</p>
                <Badge className="mt-2 bg-emerald-500/20 text-emerald-700 border-emerald-500/30 text-xs">✅ Rentable dès An 1</Badge>
              </div>
            </div>
          </div>

          {/* Charges */}
          <div className="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/30 p-6">
            <h3 className="font-bold text-foreground mb-4">Charges An 1 — 32.5M FCFA</h3>
            <div className="space-y-3">
              {[
                { label: 'Personnel (8 postes)', amount: '10.2M', pct: 31 },
                { label: 'Opérations (maintenance, resto...)', amount: '11.8M', pct: 36 },
                { label: 'Utilités (élec, eau, internet)', amount: '5.7M', pct: 18 },
                { label: 'Numérique (apps, licences)', amount: '4.8M', pct: 15 },
              ].map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{c.label}</span>
                    <span className="font-medium text-foreground">{c.amount}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${c.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassSection>

        {/* S7 - ROADMAP */}
        <GlassSection id="roadmap">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-600 tracking-widest">07</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Roadmap (5 ans)</h2>
            </div>
          </div>

          <div className="space-y-2">
            <TimelineModern year="2025-2026" title="Préparation" color="from-sky-400 to-blue-500"
              items={['Structure juridique SARL', 'Constitution équipe associés', 'Étude de marché UAC', 'Identification terrain', 'Plans architecturaux', 'Mobiliser 100-150M FCFA']} />
            <TimelineModern year="2027" title="Mobilisation & Lancement Travaux" color="from-emerald-400 to-teal-500"
              items={['Achat terrain (20M FCFA)', 'Mobilisation 300-500M FCFA', 'Permis de construire', 'Lancement chantier', 'Début dev SuperApp']} />
            <TimelineModern year="2028" title="Construction & Marketing" color="from-orange-400 to-amber-500"
              items={['Achever construction (18 mois)', 'Finaliser SuperApp', 'Campagne marketing UAC', 'Recrutement personnel', 'Pré-réservations 70%']} />
            <TimelineModern year="2029" title="🎉 Ouverture !" color="from-rose-400 to-red-500"
              items={['Inauguration Août 2029', 'Emménagement 1ère cohorte Sept', '100% occupation en 6 mois', 'Ajustements modèle']} />
            <TimelineModern year="2030+" title="Expansion" color="from-violet-400 to-purple-500" isLast
              items={['Résidence 2 (autre ville)', 'Levée de fonds 1-2 milliards FCFA', 'Professionnaliser l\'équipe', 'Référence Afrique de l\'Ouest']} />
          </div>
        </GlassSection>

        {/* S8 - EQUIPE */}
        <GlassSection id="equipe">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-600 tracking-widest">08</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">L'Équipe</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Calixte', role: 'Fondateur & Gérant Majoritaire', parts: '60-70%', desc: 'Vision & stratégie, gestion opérationnelle, relations investisseurs', highlight: true, gradient: 'from-emerald-500 to-teal-600' },
              { name: 'Associé 1', role: 'Directeur Financier', parts: '10-15%', desc: 'Comptabilité, finance, trésorerie', highlight: false, gradient: 'from-sky-500 to-blue-600' },
              { name: 'Associé 2', role: 'Directeur Tech', parts: '10-15%', desc: 'Dev SuperApp, infrastructure IT, sécurité', highlight: false, gradient: 'from-violet-500 to-purple-600' },
              { name: 'Associé 3', role: 'Directeur Marketing & Ops', parts: '5-10%', desc: 'Remplissage résidence, communication, opérations', highlight: false, gradient: 'from-orange-400 to-amber-600' },
            ].map((p, i) => (
              <motion.div key={i} whileHover={{ y: -4 }}
                className={`rounded-2xl bg-card/80 backdrop-blur-xl border p-5 ${p.highlight ? 'border-emerald-500/30 ring-1 ring-emerald-500/20' : 'border-border/40'}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {p.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.role}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">{p.parts}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/30 p-5">
            <h4 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-violet-500" /> Protections juridiques</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {['Clause rachat parts (valeur marché +20%)', 'Droit de veto sur décisions stratégiques', 'Clause non-concurrence (5 ans)', 'Gérance majoritaire pour le fondateur'].map((item, i) => (
                <div key={i} className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-violet-500 shrink-0" />{item}</div>
              ))}
            </div>
          </div>
        </GlassSection>

        {/* S9 - FINANCEMENT */}
        <GlassSection id="financement">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <PiggyBank className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 tracking-widest">09</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Budget & Levée de Fonds</h2>
            </div>
          </div>

          {/* Investment table */}
          <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 overflow-hidden mb-8">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
            <div className="p-6">
              <h3 className="font-bold text-foreground mb-4">Investissement Initial Total</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border/50"><th className="text-left py-3 font-medium text-muted-foreground">Poste</th><th className="text-right py-3 font-medium text-muted-foreground">FCFA</th></tr></thead>
                  <tbody className="text-muted-foreground">
                    {[['Terrain (1-2 hectares)','20M'],['Construction','285M'],['Équipements & Mobilier','68M'],['Infrastructure technique','50M'],['Développement SuperApp','15M'],['Frais admin & légaux','13M'],['Fonds de roulement (6 mois)','10M'],['Buffer imprévus (10%)','46M']].map(([p,m],i)=>(
                      <tr key={i} className="border-b border-border/30"><td className="py-2.5">{p}</td><td className="text-right">{m}</td></tr>
                    ))}
                    <tr className="font-bold text-foreground"><td className="py-3">TOTAL</td><td className="text-right text-emerald-600">~507M FCFA (~866k$)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobilisation phases */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { year: 'An 1 (2025)', amount: '100M', sources: 'Apports personnels + associés + famille', color: 'from-sky-400 to-blue-500' },
              { year: 'An 2 (2026)', amount: '200M', sources: 'Épargne + prêt bancaire + investisseurs', color: 'from-emerald-400 to-teal-500' },
              { year: 'An 3 (2027)', amount: '250M', sources: 'Prêt principal + fondations + diaspora', color: 'from-violet-400 to-purple-500' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="group">
                <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-5 text-center overflow-hidden">
                  <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-all`} />
                  <p className="text-xs text-muted-foreground font-medium">{item.year}</p>
                  <p className="text-3xl font-black text-foreground mt-1">{item.amount}</p>
                  <p className="text-xs text-muted-foreground mt-2">{item.sources}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl bg-amber-500/5 border border-amber-500/15 p-5 text-center">
            <p className="text-sm font-bold text-amber-700 flex items-center justify-center gap-2"><Lightbulb className="w-4 h-4" /> Objectif sécurité : 550M FCFA (~940k$)</p>
            <p className="text-xs text-muted-foreground mt-2">Option MVP : 300M FCFA (~510k$) — 50 étudiants, 25 logements</p>
          </div>
        </GlassSection>

        {/* S10 - KPIs */}
        <GlassSection id="kpis">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-600 tracking-widest">10</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Indicateurs de Succès</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Financiers', icon: DollarSign, color: 'from-emerald-500 to-teal-600', items: ['Taux d\'occupation : 90%+', 'Revenus mensuels : 3.4M+ FCFA', 'Rentabilité opérationnelle dès An 1', 'Marge nette : 30%+'] },
              { title: 'Satisfaction', icon: Heart, color: 'from-rose-400 to-pink-500', items: ['NPS : 50+', 'Rétention An 2 : 70%+', 'Satisfaction : 4.2/5+', 'SuperApp : 80%+ actifs mensuels'] },
              { title: 'Impact Académique', icon: GraduationCap, color: 'from-sky-400 to-blue-500', items: ['Taux réussite > moyenne UAC', 'Bourses obtenues : 20+ étudiants', 'Startups lancées : 5+'] },
              { title: 'Communauté', icon: Users, color: 'from-violet-400 to-purple-500', items: ['Événements : 24+/an', 'Participation : 40%+', 'Partenariats actifs : 10+'] },
            ].map((cat, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground">{cat.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </GlassSection>

        {/* S11 - BRANDING */}
        <GlassSection id="branding">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-orange-600 tracking-widest">11</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Identité Visuelle</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6">
              <h3 className="font-bold text-foreground mb-4">Taglines</h3>
              <div className="flex flex-wrap gap-3">
                {['"Plus qu\'un toit, un écosystème pour ta réussite"', '"Là où l\'excellence devient accessible"', '"Ton campus, ta communauté, ton avenir"'].map((t, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-secondary/60 text-sm text-muted-foreground italic">{t}</span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6">
                <h3 className="font-bold text-foreground mb-4">Palette Couleurs</h3>
                <div className="space-y-3">
                  {[
                    { color: 'bg-gradient-to-r from-emerald-400 to-teal-500', label: 'Vert — Croissance & nature' },
                    { color: 'bg-gradient-to-r from-sky-400 to-blue-500', label: 'Bleu — Innovation & confiance' },
                    { color: 'bg-gradient-to-r from-orange-400 to-amber-500', label: 'Orange — Jeunesse & énergie' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${c.color} shadow-md`} />
                      <span className="text-sm text-muted-foreground">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6">
                <h3 className="font-bold text-foreground mb-4">Valeurs</h3>
                <div className="flex flex-wrap gap-2">
                  {['Excellence accessible', 'Innovation', 'Communauté', 'Impact', 'Durabilité'].map((v, i) => (
                    <Badge key={i} className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 px-3 py-1.5">{v}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassSection>

        {/* S12 - RISQUES */}
        <GlassSection id="risques">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/25">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-600 tracking-widest">12</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Risques & Mitigation</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <RiskModern index={0} title="Difficulté de financement" probability="Moyenne-Haute" impact="Critique" mitigations={['Commencer par MVP (50 étudiants)', 'Diversifier sources de fonds', 'Pilote en louant un immeuble existant']} />
            <RiskModern index={1} title="Faible occupation initiale" probability="Moyenne" impact="Élevé" mitigations={['Marketing intense 6 mois avant', 'Partenariats UAC', 'Offres early-bird']} />
            <RiskModern index={2} title="Retards construction" probability="Haute" impact="Moyen-Élevé" mitigations={['Entreprise fiable + visites chantier', 'Pénalités retard au contrat', 'Buffer 3-6 mois']} />
            <RiskModern index={3} title="Problèmes techniques" probability="Moyenne" impact="Élevé" mitigations={['Sur-dimensionner infrastructure', 'Panneaux solaires backup', 'Double connexion internet']} />
            <RiskModern index={4} title="Conflits associés" probability="Moyenne" impact="Critique" mitigations={['Pacte associés très clair', 'Rôles définis précisément', 'Clause sortie/rachat anticipée']} />
            <RiskModern index={5} title="Copycats" probability="Haute (si succès)" impact="Moyen" mitigations={['First-mover advantage', 'SuperApp = barrière à l\'entrée', 'Scale rapidement']} />
          </div>
        </GlassSection>

        {/* S13 - RESSOURCES */}
        <GlassSection id="ressources">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-600 tracking-widest">13</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Ressources</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-sky-500" /> Documents clés</h3>
              <ul className="space-y-2">
                {['Business plan détaillé', 'Pitch deck investisseurs', 'Étude de marché UAC', 'Plans architecturaux', 'Cahier des charges SuperApp', 'Modèle financier', 'Pacte associés'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded border-2 border-border/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> Inspirations</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {['Roam (Co-living global)', 'Common (Co-living USA)', 'WeWork (modèle espace partagé)', 'Studesk, Studélites (résidences Europe)', 'Andela (écosystème tech africain)'].map((item, i) => (
                  <p key={i} className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-amber-500" />{item}</p>
                ))}
              </div>
            </div>
          </div>
        </GlassSection>

        {/* S14 - ACTIONS */}
        <GlassSection id="actions">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-orange-600 tracking-widest">14</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">Mes 90 Prochains Jours</h2>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { title: 'Semaines 1-4 : Fondations', icon: Clock, color: 'text-orange-500', items: ['Rédiger pacte associés (avec avocat)', 'Créer SARL au Bénin', 'Ouvrir compte bancaire entreprise', 'Finaliser business plan v1.0', 'Étude marché terrain UAC (50+ étudiants interrogés)'] },
              { title: 'Semaines 5-8 : Validation', icon: Clock, color: 'text-sky-500', items: ['Identifier 3-5 terrains potentiels Calavi', 'Visiter terrains avec associés', 'Rencontrer 2-3 architectes', 'Affiner projections financières', 'Créer pitch deck v1.0'] },
              { title: 'Semaines 9-12 : Mobilisation', icon: Clock, color: 'text-emerald-500', items: ['Commencer mobilisation apports personnels', 'Réunions investisseurs potentiels', 'Pré-négocier terrain préféré', 'Lancer brainstorm branding', 'Commencer cahier des charges SuperApp'] },
            ].map((phase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card/80 backdrop-blur-xl border border-border/40 p-6"
              >
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <phase.icon className={`w-4 h-4 ${phase.color}`} />
                  {phase.title}
                </h3>
                <ul className="space-y-2">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-4 h-4 rounded border-2 border-border/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </GlassSection>

        {/* S15 - MOTIVATION */}
        <GlassSection id="motivation">
          <div className="relative rounded-[2rem] overflow-hidden">
            {/* Gradient BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-orange-500/15" />
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-orange-500/10 blur-[100px]" />
            
            <div className="relative p-10 md:p-16 text-center border border-emerald-500/10 rounded-[2rem]">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
                <Flame className="w-12 h-12 text-orange-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8">Pourquoi je me lève chaque matin</h2>
                
                <blockquote className="text-xl md:text-3xl font-black text-foreground italic leading-snug mb-10 max-w-2xl mx-auto">
                  "Je ne construis pas une résidence, je construis des destins."
                </blockquote>

                <div className="space-y-3 text-sm text-muted-foreground max-w-lg mx-auto mb-12">
                  <p>1. Parce que j'ai vu trop d'étudiants brillants échouer à cause de mauvaises conditions de vie.</p>
                  <p>2. Parce que je crois que l'égalité des chances commence par un environnement propice à la réussite.</p>
                  <p>3. Parce que je veux prouver qu'on peut être rentable ET avoir un impact social massif.</p>
                </div>

                <div className="inline-flex flex-col items-center gap-2 bg-card/60 backdrop-blur-xl rounded-2xl px-10 py-6 border border-emerald-500/20">
                  <p className="text-6xl font-black text-emerald-600">{countdown.days}</p>
                  <p className="text-sm text-muted-foreground">jours avant le lancement 🚀</p>
                </div>
              </motion.div>
            </div>
          </div>
        </GlassSection>

        {/* Footer */}
        <div className="text-center py-16">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground/60">
            <span>Dernière mise à jour : Février 2026</span>
            <span>·</span>
            <span>Version 2.0</span>
          </div>
          <p className="text-xs text-muted-foreground/40 mt-2 italic">Projet confidentiel — Ne pas diffuser sans autorisation</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProjetHouefa;
