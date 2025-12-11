import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Sparkles, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectService } from '@/services/projectService';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/types/project';

const Portfolio = () => {
  const { toast } = useToast();
  const [publicProjects, setPublicProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublicProjects = async () => {
      try {
        const data = await projectService.getPublic();
        setPublicProjects(data);
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger le portfolio.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicProjects();
  }, [toast]);

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Share2 className="w-4 h-4" />
            Portfolio Public
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="gradient-text">ambitions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes projets en cours et mes idées pour l'avenir.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Chargement du portfolio...</p>
          </div>
        ) : publicProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicProjects.map((project, index) => (
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
              <Sparkles className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucun projet public</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Il n'y a pas encore de projets visibles dans le portfolio.
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Portfolio;
