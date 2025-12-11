import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProjectForm from '@/components/projects/ProjectForm';
import { useProjectStore } from '@/store/projectStore';
import { useToast } from '@/hooks/use-toast';
import { ProjectFormData } from '@/types/project';
import { projectService } from '@/services/projectService';

const AddProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProjectFormData, imageFile?: File) => {
    setIsLoading(true);

    try {
      let imageUrl = data.image_url;

      if (imageFile) {
        imageUrl = await projectService.uploadImage(imageFile);
      }

      const newProject = await projectService.create({
        ...data,
        image_url: imageUrl,
      });

      addProject(newProject);

      toast({
        title: 'Projet créé!',
        description: 'Votre projet a été ajouté avec succès.',
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le projet.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Nouveau projet</h1>
          <p className="text-muted-foreground">
            Décrivez votre nouvelle ambition avec tous les détails.
          </p>
        </div>

        <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default AddProject;
