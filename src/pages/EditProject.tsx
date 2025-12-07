import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProjectForm from '@/components/projects/ProjectForm';
import { useProjectStore } from '@/store/projectStore';
import { useToast } from '@/hooks/use-toast';
import { ProjectFormData } from '@/types/project';

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projects, updateProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);

  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (!project) {
      toast({
        title: 'Projet introuvable',
        description: 'Ce projet n\'existe pas.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [project, navigate, toast]);

  const handleSubmit = async (data: ProjectFormData, imageFile?: File) => {
    if (!id) return;

    setIsLoading(true);

    try {
      let imageUrl = data.image_url;

      if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile);
      }

      updateProject(id, {
        ...data,
        image_url: imageUrl,
      });

      toast({
        title: 'Projet mis à jour!',
        description: 'Les modifications ont été enregistrées.',
      });

      navigate(`/projet/${id}`);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le projet.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
