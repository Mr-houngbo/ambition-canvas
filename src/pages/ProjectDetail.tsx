import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Target,
  Lightbulb,
  Link as LinkIcon,
  Loader2,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useProjectStore } from '@/store/projectStore';
import { useToast } from '@/hooks/use-toast';
import { projectService } from '@/services/projectService';
import {
  STATUS_LABELS,
  STATUS_COLORS,
  HORIZON_LABELS,
  HORIZON_COLORS,
  Project,
} from '@/types/project';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateProject, deleteProject } = useProjectStore();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const data = await projectService.getById(id);
        if (!data) {
          toast({
            title: 'Projet introuvable',
            description: "Ce projet n'existe pas.",
            variant: 'destructive',
          });
          navigate('/');
          return;
        }
        setProject(data);
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger le projet.',
          variant: 'destructive',
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate, toast]);

  const handleTogglePublic = async () => {
    if (!project) return;

    try {
      const updated = await projectService.update(project.id, {
        est_public: !project.est_public,
      });
      setProject(updated);
      updateProject(project.id, { est_public: updated.est_public });
      toast({
        title: updated.est_public ? 'Projet public' : 'Projet privé',
        description: updated.est_public
          ? 'Ce projet est maintenant visible dans le portfolio.'
          : "Ce projet n'est plus visible dans le portfolio.",
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier la visibilité.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!project) return;

    try {
      if (project.image_url) {
        await projectService.deleteImage(project.image_url);
      }
      await projectService.delete(project.id);
      deleteProject(project.id);
      toast({
        title: 'Projet supprimé',
        description: 'Le projet a été supprimé définitivement.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le projet.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary/10 to-accent/10">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.titre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-5xl font-bold gradient-text">
                  {project.titre.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Back button */}
          <div className="absolute top-4 left-4">
            <Button variant="glass" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="glass" size="icon-sm" onClick={handleTogglePublic}>
              {project.est_public ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>
            <Link to={`/edit/${project.id}`}>
              <Button variant="glass" size="icon-sm">
                <Edit2 className="w-4 h-4" />
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="glass" size="icon-sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer ce projet?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Le projet sera définitivement
                    supprimé.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Content */}
        <div className="container max-w-4xl py-8 -mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Card */}
            <Card className="p-8 mb-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={STATUS_COLORS[project.statut]}>
                  {STATUS_LABELS[project.statut]}
                </Badge>
                <Badge
                  variant="secondary"
                  className={HORIZON_COLORS[project.horizon_temps]}
                >
                  {HORIZON_LABELS[project.horizon_temps]}
                </Badge>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {project.categorie}
                </span>
                {project.est_public && (
                  <Badge variant="outline" className="ml-auto">
                    <Eye className="w-3 h-3 mr-1" />
                    Public
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {project.titre}
              </h1>

              {/* Short description */}
              <p className="text-lg text-muted-foreground mb-6">
                {project.description_courte}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                <Calendar className="w-4 h-4" />
                <span>
                  Créé le{' '}
                  {new Date(project.date_creation).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </Card>

            {/* Detailed Description */}
            {project.description_detaillee && (
              <Card className="p-8 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Description détaillée</h2>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">
                  {project.description_detaillee}
                </p>
              </Card>
            )}

            {/* Motivation */}
            {project.motivation && (
              <Card className="p-8 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-semibold">Motivation</h2>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">
                  {project.motivation}
                </p>
              </Card>
            )}

            {/* Resources */}
            {project.ressources && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-info" />
                  </div>
                  <h2 className="text-xl font-semibold">Ressources</h2>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">
                  {project.ressources}
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
