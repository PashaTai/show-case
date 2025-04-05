import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import strapiClient from '@/lib/strapi';
import { 
  StrapiCollectionResponse, 
  StrapiBlogPost, 
  StrapiCategory,
  formatBlogPostFromStrapi, 
  formatCategoryFromStrapi 
} from '@/../../shared/strapi-types';

/**
 * Hook to fetch all blog posts from Strapi
 */
export function useBlogPosts(options: { 
  featured?: boolean, 
  category?: string, 
  limit?: number,
  page?: number
} = {}) {
  const { featured, category, limit = 10, page = 1 } = options;
  
  const queryParams: Record<string, any> = {
    'pagination[page]': page,
    'pagination[pageSize]': limit,
    'populate': '*',
    'sort': 'publishedAt:desc',
  };
  
  if (featured !== undefined) {
    queryParams['filters[featured][$eq]'] = featured;
  }
  
  if (category) {
    queryParams['filters[category][slug][$eq]'] = category;
  }
  
  return useQuery({
    queryKey: ['blog-posts', { featured, category, limit, page }],
    queryFn: async () => {
      const response = await strapiClient.getEntries('articles', queryParams);
      const typedResponse = response as StrapiCollectionResponse<StrapiBlogPost>;
      
      return {
        posts: typedResponse.data.map(formatBlogPostFromStrapi),
        pagination: typedResponse.meta.pagination
      };
    }
  });
}

/**
 * Hook to fetch a single blog post from Strapi
 */
export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const response = await strapiClient.getEntries('articles', {
        'filters[slug][$eq]': slug,
        'populate': '*'
      });
      
      const typedResponse = response as StrapiCollectionResponse<StrapiBlogPost>;
      
      if (!typedResponse.data.length) {
        throw new Error(`Blog post with slug "${slug}" not found`);
      }
      
      return formatBlogPostFromStrapi(typedResponse.data[0]);
    },
    enabled: !!slug
  });
}

/**
 * Hook to fetch all categories from Strapi
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await strapiClient.getEntries('categories', {
        'populate': '*',
        'sort': 'name:asc'
      });
      
      const typedResponse = response as StrapiCollectionResponse<StrapiCategory>;
      
      return typedResponse.data.map(formatCategoryFromStrapi);
    }
  });
}

/**
 * Hook to create a new blog post in Strapi
 */
export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await strapiClient.createEntry('articles', data);
      return response;
    },
    onSuccess: () => {
      // Invalidate blog posts cache
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    }
  });
}

/**
 * Hook to update a blog post in Strapi
 */
export function useUpdateBlogPost(id: number) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await strapiClient.updateEntry('articles', id, data);
      return response;
    },
    onSuccess: (_, variables) => {
      // Invalidate blog posts cache
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      
      // Invalidate specific blog post cache
      if (variables.slug) {
        queryClient.invalidateQueries({ queryKey: ['blog-post', variables.slug] });
      }
    }
  });
}

/**
 * Hook to upload a file to Strapi
 */
export function useUploadFile() {
  return useMutation({
    mutationFn: async ({ file, alt }: { file: File, alt?: string }) => {
      const response = await strapiClient.uploadFile(file, {
        alternativeText: alt
      });
      return response;
    }
  });
}