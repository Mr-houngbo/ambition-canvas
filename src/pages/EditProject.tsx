import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProjectForm from '@/components/projects/ProjectForm';
import { useProjectStore } from '@/store/projectStore';
import { useToast } from '@/hooks/use-toast';
import { ProjectFormData, Project } from '@/types/project';
import { projectService } from '@/services/projectService';

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

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
        setIsFetching(false);
      }
    };

    fetchProject();
  }, [id, navigate, toast]);

  const handleSubmit = async (data: ProjectFormData, imageFile?: File) => {
    if (!id || !project) return;

    setIsLoading(true);

    try {
      let imageUrl = data.image_url;

      if (imageFile) {
        // Delete old image if exists
        if (project.image_url) {
          await projectService.deleteImage(project.image_url);
        }
        imageUrl = await projectService.uploadImage(imageFile);
      }

      const updated = await projectService.update(id, {
        ...data,
        image_url: imageUrl,
      });

      updateProject(id, updated);

      toast({
        title: 'Projet mis à jour!',
        description: 'Les modifications ont été enregistrées.',
      });

      navigate(`/projet/${id}`);
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le projet.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
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
      <div className="container max-w-3xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Modifier le projet</h1>
          <p className="text-muted-foreground">
            Mettez à jour les informations de votre projet.
          </p>
        </div>

        <ProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};

export default EditProject;
