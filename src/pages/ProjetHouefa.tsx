import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Heart, MapPin, Layers, DollarSign, Rocket, Users, 
  PiggyBank, BarChart3, Palette, AlertTriangle, BookOpen, 
  CheckSquare, Flame, ChevronDown, ChevronUp, Target, Lightbulb,
  Wifi, Shield, Utensils, Bike, Smartphone, GraduationCap,
  TrendingUp, Calendar, Clock, Star, Globe, Zap, Home
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import heroImage from '@/assets/houefa-hero.jpg';

// Countdown to Sept 2029
const getCountdown = () => {
  const target = new Date('2029-09-01').getTime();
  const now = Date.now();
  const diff = target - now;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

// Section wrapper with collapse
const Section = ({ id, icon: Icon, title, color = 'houefa-green', children }: {
  id: string; icon: any; title: string; color?: string; children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  const colorMap: Record<string, string> = {
    'houefa-green': 'from-emerald-500 to-teal-600',
    'houefa-blue': 'from-sky-500 to-blue-600',
    'houefa-orange': 'from-orange-400 to-amber-600',
    'houefa-red': 'from-rose-500 to-red-600',
    'houefa-purple': 'from-violet-500 to-purple-600',
  };
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 mb-6 group"
      >
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground flex-1 text-left">{title}</h2>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      {open && <div className="pl-0 md:pl-16">{children}</div>}
    </motion.section>
  );
};

const PillarCard = ({ icon: Icon, title, gradient, children }: { icon: any; title: string; gradient: string; children: React.ReactNode }) => (
  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className={`h-2 bg-gradient-to-r ${gradient}`} />
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground space-y-2">{children}</CardContent>
  </Card>
);

const Checklist = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-sm">
        <div className="w-5 h-5 mt-0.5 rounded border-2 border-muted-foreground/30 flex-shrink-0" />
        <span className="text-muted-foreground">{item}</span>
      </li>
    ))}
  </ul>
);

const TimelineItem = ({ year, title, color, items }: { year: string; title: string; color: string; items: string[] }) => (
  <div className="relative pl-8 pb-10 border-l-2 border-border last:border-l-0 last:pb-0">
    <div className={`absolute -left-3 w-6 h-6 rounded-full bg-gradient-to-br ${color} shadow-md`} />
    <Badge variant="outline" className="mb-2 text-xs font-bold">{year}</Badge>
    <h4 className="font-semibold text-foreground mb-3">{title}</h4>
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
          <span className="text-emerald-500 mt-0.5">✓</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const RiskCard = ({ title, probability, impact, mitigations }: { title: string; probability: string; impact: string; mitigations: string[] }) => (
  <Card className="border-0 shadow-md">
    <CardContent className="pt-5 space-y-3">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <div className="flex gap-2">
        <Badge variant="outline" className="text-xs">Probabilité: {probability}</Badge>
        <Badge variant="outline" className="text-xs">Impact: {impact}</Badge>
      </div>
      <ul className="text-sm text-muted-foreground space-y-1">
        {mitigations.map((m, i) => <li key={i} className="flex items-start gap-2"><Shield className="w-3.5 h-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />{m}</li>)}
      </ul>
    </CardContent>
  </Card>
);

const ProjetHouefa = () => {
  const [daysLeft, setDaysLeft] = useState(getCountdown());

  useEffect(() => {
    const t = setInterval(() => setDaysLeft(getCountdown()), 86400000);
    return () => clearInterval(t);
  }, []);

  // Milestones progress (conceptualization phase)
  const milestonesCompleted = 1;
  const totalMilestones = 12;
  const progressPercent = Math.round((milestonesCompleted / totalMilestones) * 100);

  const navSections = [
    { id: 'vision', label: 'Vision' },
    { id: 'definition', label: 'Définition' },
    { id: 'pourquoi', label: 'Pourquoi' },
    { id: 'localisation', label: 'Lieu' },
    { id: 'piliers', label: 'Piliers' },
    { id: 'business', label: 'Business' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'financement', label: 'Fonds' },
    { id: 'kpis', label: 'KPIs' },
    { id: 'branding', label: 'Marque' },
    { id: 'risques', label: 'Risques' },
    { id: 'ressources', label: 'Ressources' },
    { id: 'actions', label: 'Actions' },
    { id: 'motivation', label: 'Motivation' },
  ];

  return (
    <Layout>
      {/* HERO */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={heroImage} alt="Houefa Campus" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-sm px-4 py-1.5">
              Phase de conceptualisation
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 tracking-tight">
              HOUEFA
            </h1>
            <p className="text-xl md:text-2xl text-emerald-200 font-medium mb-2 italic">
              « Maison paisible, apaisée et apaisante »
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Plus qu'un toit, un écosystème pour ta réussite
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                <p className="text-3xl font-bold text-white">{daysLeft}</p>
                <p className="text-xs text-white/70">jours avant lancement</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                <p className="text-3xl font-bold text-white">2029</p>
                <p className="text-xs text-white/70">ouverture cible</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                <p className="text-3xl font-bold text-white">100</p>
                <p className="text-xs text-white/70">étudiants Phase 1</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Nav */}
      <div className="sticky top-[4.5rem] z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 py-2 min-w-max">
            {navSections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="px-3 py-1.5 text-xs font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors whitespace-nowrap">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="container pt-8">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm font-medium text-muted-foreground">Progression globale</span>
          <span className="text-sm font-bold text-emerald-600">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* CONTENT */}
      <div className="container py-12 max-w-4xl">

        {/* S1 - VISION */}
        <Section id="vision" icon={Target} title="Vision & Identité" color="houefa-green">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Fondateur', value: 'Calixte', icon: Star },
              { label: 'Horizon', value: '5 ans (2025-2029)', icon: Calendar },
              { label: 'Ouverture', value: 'Sept 2029', icon: Rocket },
              { label: 'Statut', value: 'Conceptualisation', icon: Lightbulb },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="pt-4 pb-3 text-center">
                  <item.icon className="w-5 h-5 mx-auto mb-2 text-emerald-500" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <blockquote className="border-l-4 border-emerald-500 pl-6 py-3 bg-emerald-500/5 rounded-r-xl text-lg italic text-foreground/90">
            "Je ne construis pas une résidence, je construis des destins."
          </blockquote>
        </Section>

        <Separator className="my-8" />

        {/* S2 - DEFINITION */}
        <Section id="definition" icon={Building2} title="Qu'est-ce que Houefa ?" color="houefa-blue">
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              <strong className="text-foreground">Houefa</strong> est un concept de résidences étudiantes intelligentes de nouvelle génération au Bénin. Plus qu'un simple logement, c'est un écosystème complet qui combine hébergement moderne, technologie de pointe, formation continue et communauté d'excellence — le tout accessible via un loyer mensuel unique all-inclusive.
            </p>
            <p>
              Ce qui distingue Houefa, c'est son approche holistique : une <strong className="text-foreground">SuperApp intégrée</strong> centralise l'identité numérique de chaque résident, ses paiements, l'accès aux services et aux opportunités. L'infrastructure comprend WiFi fibré, électricité et eau incluses, espaces de co-working intelligents, un restaurant subventionné, une bibliothèque numérique et des formations en ligne partenaires.
            </p>
            <p>
              Houefa ambitionne d'être la <strong className="text-foreground">première résidence de ce type en Afrique de l'Ouest</strong>, avec un modèle réplicable dans toutes les grandes villes universitaires du continent. Une architecture futuriste et verte, une communauté d'excellence qui s'entraide, et un impact social mesurable.
            </p>
            <p>
              <strong className="text-foreground">Phase 1</strong> : Abomey-Calavi (UAC), 100 étudiants. <strong className="text-foreground">Vision 5-10 ans</strong> : 20-30 résidences en Afrique de l'Ouest, devenir LA référence pour le logement étudiant africain.
            </p>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S3 - POURQUOI */}
        <Section id="pourquoi" icon={Heart} title="Pourquoi je crée ce projet" color="houefa-orange">
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" /> Le problème que j'ai observé
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Le logement étudiant en Afrique — et à l'UAC en particulier — est catastrophique. Des étudiants brillants échouent non pas par manque de talent, mais parce que leurs conditions de vie les empêchent de se concentrer sur leurs études. Des infrastructures vétustes, pas d'électricité stable, pas d'eau courante, pas d'internet. Comment exceller quand l'environnement conspire contre toi ?
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" /> L'impact que je veux avoir
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Je veux former une nouvelle génération de talents africains en leur donnant l'égalité des chances. Prouver qu'un modèle d'excellence accessible est viable. Créer les leaders de demain grâce à un environnement stimulant et contribuer au développement du Bénin et de l'Afrique tout entière.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-2xl p-6 border border-orange-500/10">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" /> Ma motivation personnelle
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                « J'ai fait l'UAC. J'ai vu de mes propres yeux comment l'environnement influence massivement les résultats des étudiants. Si on supprime les soucis de nourriture, d'électricité, d'eau, de loyer — si on libère l'étudiant de ces fardeaux — il peut se consacrer à apprendre, à grandir, à innover. Houefa, c'est la résidence que j'aurais voulu avoir. C'est mon héritage pour les générations qui viennent. »
              </p>
              <p className="text-right text-sm font-semibold text-foreground mt-3">— Calixte</p>
            </div>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S4 - LOCALISATION */}
        <Section id="localisation" icon={MapPin} title="Où et pour qui" color="houefa-blue">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2"><CardTitle className="text-base">📍 Localisation Phase 1</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p><strong className="text-foreground">Pays :</strong> Bénin 🇧🇯</p>
                <p><strong className="text-foreground">Ville :</strong> Abomey-Calavi</p>
                <p><strong className="text-foreground">Proximité :</strong> Université d'Abomey-Calavi (UAC)</p>
                <p><strong className="text-foreground">Quartiers ciblés :</strong> Godomey, Akassato, Tankpè</p>
                <p><strong className="text-foreground">Justification :</strong> 60 000+ étudiants, marché quasi-vierge</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2"><CardTitle className="text-base">🎯 Public cible</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Étudiants UAC (Licence, Master) + universités de la zone</p>
                <p><strong className="text-foreground">Mix social :</strong> 40% modestes · 40% classe moyenne · 20% aisés</p>
                <p><strong className="text-foreground">Critères :</strong> Sérieux académique, envie de réussir, esprit communautaire</p>
                <Separator className="my-2" />
                <p className="text-xs"><strong className="text-foreground">Opportunité :</strong> Étudiants paient 45-55k FCFA/mois pour des conditions médiocres. Notre offre : 25-50k FCFA tout compris avec services premium.</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S5 - PILIERS */}
        <Section id="piliers" icon={Layers} title="Les 4 Piliers de Houefa" color="houefa-green">
          <div className="grid md:grid-cols-2 gap-6">
            <PillarCard icon={Home} title="Infrastructure Physique" gradient="from-emerald-500 to-teal-600">
              <p><strong className="text-foreground">45 unités / 100 places :</strong></p>
              <ul className="space-y-1 ml-1">
                <li>• 10 Studios Solo (15m²) — 50 000 FCFA</li>
                <li>• 20 T2 Duo (30m²) — 75 000 FCFA</li>
                <li>• 10 T3 Trio (40m²) — 90 000 FCFA</li>
                <li>• 5 T4 Coloc (50m²) — 100 000 FCFA</li>
              </ul>
              <p className="mt-2"><strong className="text-foreground">Inclus :</strong> Meublé, électricité, eau, clim/ventilation, internet fibré</p>
              <p><strong className="text-foreground">Espaces communs (~500m²) :</strong> Learning Hub, bibliothèque, co-working, amphithéâtre, fitness, cafétéria, jardins, laverie</p>
            </PillarCard>

            <PillarCard icon={Smartphone} title="Écosystème Numérique" gradient="from-sky-500 to-blue-600">
              <p><strong className="text-foreground">SuperApp Houefa :</strong></p>
              <ul className="space-y-1 ml-1">
                <li>• Identité numérique & carte résident</li>
                <li>• Paiements Mobile Money intégrés</li>
                <li>• Réservation espaces & signalements</li>
                <li>• Menu resto & marketplace étudiant</li>
                <li>• Job board, events, formations</li>
                <li>• Messagerie & communauté par filière</li>
              </ul>
              <p className="mt-2"><strong className="text-foreground">Accès inclus :</strong> JSTOR, Coursera, edX, Microsoft 365, GitHub, Grammarly Premium</p>
            </PillarCard>

            <PillarCard icon={Utensils} title="Services & Bien-être" gradient="from-orange-400 to-amber-600">
              <ul className="space-y-1 ml-1">
                <li>• Restaurant subventionné à prix étudiants</li>
                <li>• Infirmerie / Point santé</li>
                <li>• Consignes colis sécurisées</li>
                <li>• Vélos électriques en location</li>
                <li>• WiFi gratuit partout</li>
              </ul>
              <p className="mt-2"><strong className="text-foreground">Programmation :</strong> Conférences mensuelles, ateliers CV/pitch, bootcamps tech, networking, projections cinéma</p>
            </PillarCard>

            <PillarCard icon={Heart} title="Impact & Mission Sociale" gradient="from-rose-500 to-red-600">
              <ul className="space-y-1 ml-1">
                <li>• 40% logements à tarif accessible (25-30k FCFA)</li>
                <li>• Sélection sur potentiel, pas les moyens</li>
                <li>• Bourses pour étudiants d'excellence modestes</li>
                <li>• Mentorat croisé (aisés ↔ modestes)</li>
                <li>• Suivi académique & orientation carrière</li>
                <li>• Réseau alumni</li>
              </ul>
              <p className="mt-2"><strong className="text-foreground">Partenariats :</strong> UAC, entreprises sponsors, fondations, startups</p>
            </PillarCard>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S6 - BUSINESS MODEL */}
        <Section id="business" icon={DollarSign} title="Modèle Économique & Viabilité" color="houefa-green">
          <div className="space-y-8">
            {/* Revenus */}
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" /> Revenus An 1 (100 étudiants)</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-medium text-muted-foreground">Type</th>
                        <th className="text-center py-2 font-medium text-muted-foreground">Unités</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">Prix/mois</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50"><td className="py-2">Studios Solo</td><td className="text-center">10</td><td className="text-right">50 000</td><td className="text-right">500 000</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2">T2 Duo</td><td className="text-center">20</td><td className="text-right">75 000</td><td className="text-right">1 500 000</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2">T3 Trio</td><td className="text-center">10</td><td className="text-right">90 000</td><td className="text-right">900 000</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2">T4 Coloc</td><td className="text-center">5</td><td className="text-right">100 000</td><td className="text-right">500 000</td></tr>
                      <tr className="font-bold text-foreground"><td className="py-2">TOTAL MENSUEL</td><td className="text-center">45</td><td></td><td className="text-right text-emerald-600">3 400 000 FCFA</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-emerald-500/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">40.8M FCFA</p>
                    <p className="text-xs text-muted-foreground">Revenus loyers/an</p>
                  </div>
                  <div className="bg-sky-500/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-sky-600">46.7M FCFA</p>
                    <p className="text-xs text-muted-foreground">Revenus totaux/an (~80k$)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charges & Résultat */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader><CardTitle className="text-base">📊 Charges An 1</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <div className="flex justify-between"><span>Personnel (8 postes)</span><span className="font-medium">10.2M</span></div>
                  <div className="flex justify-between"><span>Utilités (élec, eau, internet)</span><span className="font-medium">5.7M</span></div>
                  <div className="flex justify-between"><span>Numérique (apps, licences)</span><span className="font-medium">4.8M</span></div>
                  <div className="flex justify-between"><span>Opérations (maintenance, resto...)</span><span className="font-medium">11.8M</span></div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-foreground"><span>TOTAL</span><span className="text-orange-500">32.5M FCFA</span></div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-500/10 to-teal-500/5">
                <CardContent className="pt-6 flex flex-col items-center justify-center h-full text-center">
                  <Zap className="w-10 h-10 text-emerald-500 mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Profit Net An 1</p>
                  <p className="text-4xl font-extrabold text-emerald-600">14.2M FCFA</p>
                  <p className="text-sm text-muted-foreground mt-1">(~24 500$)</p>
                  <Badge className="mt-3 bg-emerald-500/20 text-emerald-700 border-emerald-500/30">✅ Rentable dès l'an 1</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S7 - ROADMAP */}
        <Section id="roadmap" icon={Rocket} title="Plan de mise en œuvre (5 ans)" color="houefa-blue">
          <div className="space-y-2">
            <TimelineItem year="2025-2026" title="Préparation" color="from-sky-400 to-blue-500"
              items={['Structure juridique SARL', 'Constitution équipe associés', 'Étude de marché UAC', 'Identification terrain', 'Plans architecturaux', 'Mobiliser 100-150M FCFA']} />
            <TimelineItem year="2027" title="Mobilisation & Lancement Travaux" color="from-emerald-400 to-teal-500"
              items={['Achat terrain (20M FCFA)', 'Mobilisation 300-500M FCFA', 'Permis de construire', 'Lancement chantier', 'Début dev SuperApp']} />
            <TimelineItem year="2028" title="Construction & Marketing" color="from-orange-400 to-amber-500"
              items={['Achever construction (18 mois)', 'Finaliser SuperApp', 'Campagne marketing UAC', 'Recrutement personnel', 'Pré-réservations 70%']} />
            <TimelineItem year="2029" title="🎉 Ouverture !" color="from-rose-400 to-red-500"
              items={['Inauguration Août 2029', 'Emménagement 1ère cohorte Sept', '100% occupation en 6 mois', 'Ajustements modèle']} />
            <TimelineItem year="2030+" title="Expansion" color="from-violet-400 to-purple-500"
              items={['Résidence 2 (autre ville)', 'Levée de fonds 1-2 milliards FCFA', 'Professionnaliser l\'équipe', 'Référence Afrique de l\'Ouest']} />
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S8 - EQUIPE */}
        <Section id="equipe" icon={Users} title="L'Équipe" color="houefa-purple">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Calixte', role: 'Fondateur & Gérant Majoritaire', parts: '60-70%', desc: 'Vision & stratégie, gestion opérationnelle, relations investisseurs', highlight: true },
              { name: '[Associé 1]', role: 'Directeur Financier', parts: '10-15%', desc: 'Comptabilité, finance, trésorerie' },
              { name: '[Associé 2]', role: 'Directeur Tech', parts: '10-15%', desc: 'Dev SuperApp, infrastructure IT, sécurité' },
              { name: '[Associé 3]', role: 'Directeur Marketing & Ops', parts: '5-10%', desc: 'Remplissage résidence, communication, opérations' },
            ].map((p, i) => (
              <Card key={i} className={`border-0 shadow-md ${p.highlight ? 'ring-2 ring-emerald-500/30' : ''}`}>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${p.highlight ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-secondary text-secondary-foreground'}`}>
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.role}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto text-xs">{p.parts}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-0 shadow-sm mt-6 bg-secondary/30">
            <CardContent className="pt-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">Protections juridiques</p>
              <ul className="space-y-1">
                <li>• Clause rachat parts (valeur marché +20%)</li>
                <li>• Droit de veto sur décisions stratégiques</li>
                <li>• Clause non-concurrence (5 ans)</li>
                <li>• Gérance majoritaire pour le fondateur</li>
              </ul>
            </CardContent>
          </Card>
        </Section>

        <Separator className="my-8" />

        {/* S9 - FINANCEMENT */}
        <Section id="financement" icon={PiggyBank} title="Budget & Levée de Fonds" color="houefa-green">
          <Card className="border-0 shadow-md mb-6 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
            <CardHeader><CardTitle className="text-base">Investissement Initial Total</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground">Poste</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">FCFA</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      ['Terrain (1-2 hectares)', '20M'],
                      ['Construction', '285M'],
                      ['Équipements & Mobilier', '68M'],
                      ['Infrastructure technique', '50M'],
                      ['Développement SuperApp', '15M'],
                      ['Frais admin & légaux', '13M'],
                      ['Fonds de roulement (6 mois)', '10M'],
                      ['Buffer imprévus (10%)', '46M'],
                    ].map(([poste, montant], i) => (
                      <tr key={i} className="border-b border-border/50"><td className="py-2">{poste}</td><td className="text-right">{montant}</td></tr>
                    ))}
                    <tr className="font-bold text-foreground"><td className="py-2">TOTAL</td><td className="text-right text-emerald-600">~507M FCFA (~866k$)</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-amber-500/10 rounded-xl text-center">
                <p className="text-sm font-semibold text-amber-700">💡 Objectif sécurité : 550M FCFA (~940k$)</p>
              </div>
            </CardContent>
          </Card>

          {/* Mobilisation */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { year: 'An 1 (2025)', amount: '100M', sources: 'Apports personnels + associés + famille' },
              { year: 'An 2 (2026)', amount: '200M', sources: 'Épargne + prêt bancaire + investisseurs + pré-ventes' },
              { year: 'An 3 (2027)', amount: '250M', sources: 'Prêt principal + fondations + diaspora + sponsors' },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-sm text-center">
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground">{item.year}</p>
                  <p className="text-2xl font-bold text-emerald-600">{item.amount}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.sources}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* MVP */}
          <Card className="border-0 shadow-md bg-secondary/30">
            <CardHeader><CardTitle className="text-base">🚀 Option MVP (Budget réduit)</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Budget MVP : 300M FCFA (~510k$)</strong> — 50 étudiants, 25 logements</p>
              <p>Teste le concept avant scaling. Revenus An 1 : ~20-25M FCFA. Profit : ~8-10M FCFA.</p>
            </CardContent>
          </Card>
        </Section>

        <Separator className="my-8" />

        {/* S10 - KPIs */}
        <Section id="kpis" icon={BarChart3} title="Indicateurs de Succès" color="houefa-blue">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: '💰 Financiers', items: ['Taux d\'occupation : 90%+', 'Revenus mensuels : 3.4M+ FCFA', 'Rentabilité opérationnelle dès An 1', 'Taux recouvrement : 95%+', 'Marge nette : 30%+'] },
              { title: '😊 Satisfaction', items: ['NPS : 50+', 'Rétention An 2 : 70%+', 'Satisfaction : 4.2/5+', 'Utilisation SuperApp : 80%+ actifs mensuels'] },
              { title: '📚 Impact Académique', items: ['Taux réussite > moyenne UAC', 'Bourses obtenues : 20+ étudiants', 'Startups lancées : 5+'] },
              { title: '🤝 Communauté', items: ['Événements : 24+/an', 'Participation : 40%+', 'Partenariats actifs : 10+'] },
            ].map((cat, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardHeader className="pb-2"><CardTitle className="text-base">{cat.title}</CardTitle></CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    {cat.items.map((item, j) => <li key={j} className="flex items-start gap-2"><span className="text-emerald-500">✓</span>{item}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S11 - BRANDING */}
        <Section id="branding" icon={Palette} title="Identité Visuelle" color="houefa-orange">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Taglines</h3>
              <div className="flex flex-wrap gap-2">
                {['"Plus qu\'un toit, un écosystème pour ta réussite"', '"Là où l\'excellence devient accessible"', '"Ton campus, ta communauté, ton avenir"'].map((t, i) => (
                  <Badge key={i} variant="outline" className="text-xs py-1 px-3">{t}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Palette Couleurs</h3>
              <div className="flex gap-4">
                {[
                  { color: '#2ECC71', label: 'Vert — Croissance' },
                  { color: '#3498DB', label: 'Bleu — Innovation' },
                  { color: '#E67E22', label: 'Orange — Jeunesse' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg shadow-sm" style={{ background: c.color }} />
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Valeurs de marque</h3>
              <div className="flex flex-wrap gap-2">
                {['Excellence accessible', 'Innovation', 'Communauté', 'Impact', 'Durabilité'].map((v, i) => (
                  <Badge key={i} className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20">{v}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S12 - RISQUES */}
        <Section id="risques" icon={AlertTriangle} title="Risques & Mitigation" color="houefa-red">
          <div className="grid md:grid-cols-2 gap-4">
            <RiskCard title="Difficulté de financement" probability="Moyenne-Haute" impact="Critique"
              mitigations={['Commencer par MVP (50 étudiants)', 'Diversifier sources de fonds', 'Pilote en louant un immeuble existant']} />
            <RiskCard title="Faible occupation initiale" probability="Moyenne" impact="Élevé"
              mitigations={['Marketing intense 6 mois avant', 'Partenariats UAC', 'Offres early-bird', 'Ambassadeurs étudiants']} />
            <RiskCard title="Retards construction" probability="Haute" impact="Moyen-Élevé"
              mitigations={['Entreprise fiable + visites chantier', 'Pénalités retard au contrat', 'Buffer 3-6 mois']} />
            <RiskCard title="Problèmes techniques" probability="Moyenne" impact="Élevé"
              mitigations={['Sur-dimensionner infrastructure', 'Panneaux solaires backup', 'Double connexion internet']} />
            <RiskCard title="Conflits associés" probability="Moyenne" impact="Critique"
              mitigations={['Pacte associés très clair', 'Rôles définis précisément', 'Clause sortie/rachat anticipée']} />
            <RiskCard title="Copycats" probability="Haute (si succès)" impact="Moyen"
              mitigations={['First-mover advantage', 'SuperApp = barrière à l\'entrée', 'Scale rapidement']} />
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S13 - RESSOURCES */}
        <Section id="ressources" icon={BookOpen} title="Ressources & Références" color="houefa-blue">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-base">📄 Documents clés</CardTitle></CardHeader>
              <CardContent>
                <Checklist items={['Business plan détaillé', 'Pitch deck investisseurs', 'Étude de marché UAC', 'Plans architecturaux', 'Cahier des charges SuperApp', 'Modèle financier', 'Pacte associés']} />
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-base">💡 Inspirations</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• Roam (Co-living global)</p>
                <p>• Common (Co-living USA)</p>
                <p>• WeWork (modèle espace partagé)</p>
                <p>• Studesk, Studélites (résidences Europe)</p>
                <p>• Andela (écosystème tech africain)</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S14 - ACTIONS */}
        <Section id="actions" icon={CheckSquare} title="Mes 90 Prochains Jours" color="houefa-orange">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /> Semaines 1-4 : Fondations</h3>
              <Checklist items={['Rédiger pacte associés (avec avocat)', 'Créer SARL au Bénin', 'Ouvrir compte bancaire entreprise', 'Finaliser business plan v1.0', 'Étude marché terrain UAC (50+ étudiants interrogés)']} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-sky-500" /> Semaines 5-8 : Validation</h3>
              <Checklist items={['Identifier 3-5 terrains potentiels Calavi', 'Visiter terrains avec associés', 'Rencontrer 2-3 architectes', 'Affiner projections financières', 'Créer pitch deck v1.0']} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-500" /> Semaines 9-12 : Mobilisation</h3>
              <Checklist items={['Commencer mobilisation apports personnels', 'Réunions investisseurs potentiels', 'Pré-négocier terrain préféré', 'Lancer brainstorm branding', 'Commencer cahier des charges SuperApp']} />
            </div>
          </div>
        </Section>

        <Separator className="my-8" />

        {/* S15 - MOTIVATION */}
        <Section id="motivation" icon={Flame} title="Pourquoi je me lève chaque matin" color="houefa-orange">
          <div className="bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-emerald-500/10 rounded-3xl p-8 border border-orange-500/10">
            <blockquote className="text-xl md:text-2xl font-bold text-foreground text-center mb-8 italic">
              "Je ne construis pas une résidence, je construis des destins."
            </blockquote>
            <div className="space-y-4 text-sm text-muted-foreground text-center max-w-lg mx-auto">
              <p>1. Parce que j'ai vu trop d'étudiants brillants échouer à cause de mauvaises conditions de vie.</p>
              <p>2. Parce que je crois que l'égalité des chances commence par un environnement propice à la réussite.</p>
              <p>3. Parce que je veux prouver qu'on peut être rentable ET avoir un impact social massif.</p>
            </div>
            <Separator className="my-8 bg-orange-500/20" />
            <div className="flex flex-col items-center gap-2">
              <p className="text-5xl font-extrabold text-emerald-600">{daysLeft}</p>
              <p className="text-sm text-muted-foreground">jours avant le lancement 🚀</p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="text-center py-12 text-xs text-muted-foreground space-y-1">
          <p>Dernière mise à jour : Février 2026 · Version 1.0</p>
          <p className="italic">Projet confidentiel — Ne pas diffuser sans autorisation</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProjetHouefa;
