import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Layout from '@/components/layout/Layout';
import ProjectForm from '@/components/projects/ProjectForm';
import { useProjectStore } from '@/store/projectStore';
import { useToast } from '@/hooks/use-toast';
import { ProjectFormData, Project } from '@/types/project';

const AddProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProjectFormData, imageFile?: File) => {
    setIsLoading(true);

    try {
      // For now, we'll use a placeholder for image handling
      // This will be connected to Supabase Storage later
      let imageUrl = data.image_url;

      if (imageFile) {
        // Create a local URL for demonstration
        imageUrl = URL.createObjectURL(imageFile);
      }

      const newProject: Project = {
        ...data,
        id: uuidv4(),
        date_creation: new Date().toISOString(),
        image_url: imageUrl,
      };

      addProject(newProject);

      toast({
        title: 'Projet créé!',
        description: 'Votre projet a été ajouté avec succès.',
      });

      navigate('/');
    } catch (error) {
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
