/**
 * Types for the Strapi API
 */

// Generic response from Strapi
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Response for collections in Strapi
export interface StrapiCollectionResponse<T> {
  data: StrapiEntry<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Single entry from Strapi
export interface StrapiEntry<T> {
  id: number;
  attributes: T;
}

// Media object in Strapi
export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail?: StrapiMediaFormat;
        small?: StrapiMediaFormat;
        medium?: StrapiMediaFormat;
        large?: StrapiMediaFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
}

// Media format in Strapi
interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

// Blog Post structure in Strapi
export interface StrapiBlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  metaTitle: string | null;
  metaDescription: string | null;
  readTime: number;
  featured: boolean;
  thumbnail: StrapiMedia;
  category: {
    data: StrapiEntry<StrapiCategory> | null;
  };
  author: {
    data: StrapiEntry<StrapiAuthor> | null;
  };
}

// Category structure in Strapi
export interface StrapiCategory {
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  image: StrapiMedia;
}

// Author structure in Strapi
export interface StrapiAuthor {
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  avatar: StrapiMedia;
}

/**
 * Utility function to format a blog post from Strapi to a more friendly format
 */
export function formatBlogPostFromStrapi(strapiPost: StrapiEntry<StrapiBlogPost>) {
  const post = strapiPost.attributes;
  
  return {
    id: strapiPost.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    date: post.publishedAt,
    readTime: post.readTime,
    featured: post.featured,
    metaTitle: post.metaTitle || post.title,
    metaDescription: post.metaDescription || post.excerpt,
    imageUrl: post.thumbnail?.data?.attributes.url || '',
    category: post.category?.data?.attributes.name || 'Uncategorized',
    categorySlug: post.category?.data?.attributes.slug || '',
    author: post.author?.data?.attributes.name || 'Anonymous',
    authorBio: post.author?.data?.attributes.bio || '',
    authorAvatar: post.author?.data?.attributes.avatar?.data?.attributes.url || '',
  };
}

/**
 * Utility function to format a category from Strapi to a more friendly format
 */
export function formatCategoryFromStrapi(strapiCategory: StrapiEntry<StrapiCategory>) {
  const category = strapiCategory.attributes;
  
  return {
    id: strapiCategory.id,
    title: category.name,
    slug: category.slug,
    description: category.description,
    imageUrl: category.image?.data?.attributes.url || '',
  };
}