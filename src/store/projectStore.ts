import { create } from 'zustand';
import { Project, ProjectStatus, TimeHorizon } from '@/types/project';

interface FilterState {
  search: string;
  status: ProjectStatus | 'all';
  category: string | 'all';
  horizon: TimeHorizon | 'all';
}

interface ProjectStore {
  projects: Project[];
  filters: FilterState;
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  getFilteredProjects: () => Project[];
}

const initialFilters: FilterState = {
  search: '',
  status: 'all',
  category: 'all',
  horizon: 'all',
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  filters: initialFilters,
  isLoading: false,

  setProjects: (projects) => set({ projects }),

  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),

  updateProject: (id, updatedData) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updatedData } : p
      ),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  setLoading: (isLoading) => set({ isLoading }),

  getFilteredProjects: () => {
    const { projects, filters } = get();

    return projects.filter((project) => {
      const matchesSearch =
        filters.search === '' ||
        project.titre.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(filters.search.toLowerCase())
        );

      const matchesStatus =
        filters.status === 'all' || project.statut === filters.status;

      const matchesCategory =
        filters.category === 'all' || project.categorie === filters.category;

      const matchesHorizon =
        filters.horizon === 'all' || project.horizon_temps === filters.horizon;

      return matchesSearch && matchesStatus && matchesCategory && matchesHorizon;
    });
  },
}));
