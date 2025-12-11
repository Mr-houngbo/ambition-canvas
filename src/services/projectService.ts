import { supabase } from "@/integrations/supabase/client";
import { Project, ProjectFormData, ProjectStatus, TimeHorizon } from "@/types/project";

// Helper to cast database row to Project type
const mapToProject = (row: any): Project => ({
  ...row,
  statut: row.statut as ProjectStatus,
  horizon_temps: row.horizon_temps as TimeHorizon,
  tags: row.tags || [],
});

export const projectService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projets")
      .select("*")
      .order("date_creation", { ascending: false });

    if (error) throw error;
    return (data || []).map(mapToProject);
  },

  async getPublic(): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projets")
      .select("*")
      .eq("est_public", true)
      .order("date_creation", { ascending: false });

    if (error) throw error;
    return (data || []).map(mapToProject);
  },

  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from("projets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data ? mapToProject(data) : null;
  },

  async create(data: ProjectFormData): Promise<Project> {
    const { data: project, error } = await supabase
      .from("projets")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return mapToProject(project);
  },

  async update(id: string, data: Partial<ProjectFormData>): Promise<Project> {
    const { data: project, error } = await supabase
      .from("projets")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return mapToProject(project);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("projets")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images_projets")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("images_projets")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteImage(imageUrl: string): Promise<void> {
    const path = imageUrl.split("/images_projets/")[1];
    if (path) {
      await supabase.storage.from("images_projets").remove([path]);
    }
  },
};
