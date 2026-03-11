import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Project, projects as staticProjects } from '@/data/projects';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching projects:', error);
        return staticProjects;
      }

      if (!data || data.length === 0) {
        return staticProjects;
      }

      return data.map((p) => ({
        id: p.slug,
        name: p.name,
        description: p.description,
        fullDescription: p.full_description,
        image: p.image,
        tech: p.tech || [],
        link: p.link,
        category: p.category,
        features: p.features || [],
        gallery: p.gallery || [],
        featured: p.featured || false,
        sortOrder: p.sort_order || 0,
      }));
    },
  });
};

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async (): Promise<Project | undefined> => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return staticProjects.find((p) => p.id === slug);
      }

      return {
        id: data.slug,
        name: data.name,
        description: data.description,
        fullDescription: data.full_description,
        image: data.image,
        tech: data.tech || [],
        link: data.link,
        category: data.category,
        features: data.features || [],
        gallery: data.gallery || [],
        featured: data.featured || false,
        sortOrder: data.sort_order || 0,
      };
    },
  });
};
