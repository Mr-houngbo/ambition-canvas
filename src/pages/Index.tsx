import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FolderOpen } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import FloatingAddButton from '@/components/projects/FloatingAddButton';
import { useProjectStore } from '@/store/projectStore';
import { Project } from '@/types/project';

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: '1',
    titre: 'Application de méditation IA',
    categorie: 'Tech',
    description_courte: 'Une app de méditation personnalisée par intelligence artificielle',
    description_detaillee: 'Développer une application mobile qui utilise l\'IA pour créer des séances de méditation personnalisées basées sur l\'humeur et les préférences de l\'utilisateur.',
    statut: 'en_cours',
    horizon_temps: 'court_terme',
    tags: ['IA', 'Bien-être', 'Mobile'],
    motivation: 'Combiner technologie et bien-être pour aider les gens à mieux gérer leur stress.',
    ressources: 'OpenAI API, React Native, Headspace pour inspiration',
    date_creation: '2024-01-15',
    est_public: true,
    image_url: null,
  },
  {
    id: '2',
    titre: 'Marketplace créateurs locaux',
    categorie: 'Business',
    description_courte: 'Plateforme e-commerce pour artisans et créateurs locaux',
    description_detaillee: 'Créer une marketplace qui met en avant les créateurs locaux avec une expérience d\'achat premium et des fonctionnalités de mise en relation.',
    statut: 'idee',
    horizon_temps: 'moyen_terme',
    tags: ['E-commerce', 'Local', 'Artisanat'],
    motivation: 'Soutenir l\'économie locale et les créateurs indépendants.',
    ressources: 'Stripe, Next.js, Etsy pour benchmark',
    date_creation: '2024-02-20',
    est_public: true,
    image_url: null,
  },
  {
    id: '3',
    titre: 'Podcast sur l\'innovation',
    categorie: 'Créatif',
    description_courte: 'Série de podcasts sur les innovations tech et leur impact sociétal',
    description_detaillee: 'Lancer un podcast hebdomadaire interviewant des innovateurs, entrepreneurs et penseurs sur les technologies émergentes.',
    statut: 'en_pause',
    horizon_temps: 'long_terme',
    tags: ['Podcast', 'Innovation', 'Interviews'],
    motivation: 'Partager des idées inspirantes et créer une communauté.',
    ressources: 'Riverside.fm, Spotify for Podcasters',
    date_creation: '2024-03-10',
    est_public: false,
    image_url: null,
  },
  {
    id: '4',
    titre: 'Apprendre le japonais',
    categorie: 'Personnel',
    description_courte: 'Objectif: niveau N3 en 2 ans',
    description_detaillee: 'Plan d\'apprentissage structuré pour atteindre le niveau N3 du JLPT avec des ressources variées.',
    statut: 'en_cours',
    horizon_temps: 'long_terme',
    tags: ['Langues', 'Japon', 'Développement personnel'],
    motivation: 'Passion pour la culture japonaise et voyages futurs.',
    ressources: 'Wanikani, Genki textbooks, Tandem',
    date_creation: '2024-01-05',
    est_public: true,
    image_url: null,
  },
];

const Index = () => {
  const { projects, setProjects, getFilteredProjects, isLoading } = useProjectStore();

  useEffect(() => {
    // Load mock data
    if (projects.length === 0) {
      setProjects(mockProjects);
    }
  }, []);

  const filteredProjects = getFilteredProjects();

  return (
    <Layout>
      <div className="container py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Catalogue d'Ambition
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vos <span className="gradient-text">projets</span> d'avenir
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organisez, planifiez et suivez tous vos projets ambitieux en un seul endroit.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <ProjectFilters />
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-6">
              <FolderOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucun projet trouvé</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {projects.length === 0
                ? "Commencez par ajouter votre premier projet ambitieux!"
                : "Aucun projet ne correspond à vos filtres."}
            </p>
          </motion.div>
        )}
      </div>

      <FloatingAddButton />
    </Layout>
  );
};

export default Index;
