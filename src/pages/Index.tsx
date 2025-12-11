import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FolderOpen, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import FloatingAddButton from '@/components/projects/FloatingAddButton';
import { useProjectStore } from '@/store/projectStore';
import { projectService } from '@/services/projectService';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { projects, setProjects, getFilteredProjects, isLoading, setLoading } = useProjectStore();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les projets.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [setProjects, setLoading, toast]);

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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Chargement des projets...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
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
