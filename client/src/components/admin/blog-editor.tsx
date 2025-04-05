import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import slugify from "slugify";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateBlogPost, useUpdateBlogPost, useCategories, useUploadFile } from "@/hooks/use-strapi-blog";

// Schema for blog post form
const blogPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  excerpt: z.string().min(1, { message: "Excerpt is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  readTime: z.coerce.number().min(1, { message: "Read time is required" }),
  featured: z.boolean().default(false),
  categoryId: z.string().optional(),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface BlogEditorProps {
  postId?: number;
  initialData?: Partial<BlogPostFormValues>;
  onSuccess?: () => void;
}

export default function BlogEditor({ postId, initialData, onSuccess }: BlogEditorProps) {
  const { toast } = useToast();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  
  // Get categories from Strapi
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  
  // Setup mutations
  const createBlogPost = useCreateBlogPost();
  const updateBlogPost = postId ? useUpdateBlogPost(postId) : null;
  const uploadFile = useUploadFile();
  
  const defaultValues = {
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    readTime: 3,
    featured: false,
    categoryId: '',
    ...initialData
  };
  
  // Initialize form with default values
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues,
  });
  
  // Watch title to generate slug
  const title = form.watch('title');
  
  // Auto-generate slug when title changes
  useEffect(() => {
    if (title && !form.getValues('slug')) {
      const generatedSlug = slugify(title, { lower: true, strict: true });
      form.setValue('slug', generatedSlug);
    }
  }, [title, form]);
  
  // Handle thumbnail file selection
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Form submission handler
  const onSubmit = async (values: BlogPostFormValues) => {
    try {
      // First, upload thumbnail if exists
      let thumbnailId = null;
      
      if (thumbnailFile) {
        const uploadResponse = await uploadFile.mutateAsync({
          file: thumbnailFile,
          alt: values.title
        });
        
        if (uploadResponse && uploadResponse[0]) {
          thumbnailId = uploadResponse[0].id;
        }
      }
      
      // Prepare data for Strapi
      const postData: any = {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt,
        slug: values.slug,
        metaTitle: values.metaTitle || values.title,
        metaDescription: values.metaDescription || values.excerpt,
        readTime: values.readTime,
        featured: values.featured,
      };
      
      // Add category if selected
      if (values.categoryId) {
        postData.category = values.categoryId;
      }
      
      // Add thumbnail if uploaded
      if (thumbnailId) {
        postData.thumbnail = thumbnailId;
      }
      
      // Create or update the post
      if (postId && updateBlogPost) {
        await updateBlogPost.mutateAsync(postData);
        toast({
          title: "Success!",
          description: "Blog post updated successfully.",
        });
      } else {
        await createBlogPost.mutateAsync(postData);
        toast({
          title: "Success!",
          description: "Blog post created successfully.",
        });
      }
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const isSubmitting = createBlogPost.isPending || (updateBlogPost?.isPending ?? false) || uploadFile.isPending;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{postId ? 'Edit' : 'Create'} Blog Post</CardTitle>
        <CardDescription>
          Manage your blog content
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="content" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="My Amazing Blog Post" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A brief summary of your blog post" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        This will appear in blog cards and search results
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your blog post content..." 
                          className="min-h-[300px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Use Markdown formatting for text styling
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="my-amazing-blog-post" {...field} />
                      </FormControl>
                      <FormDescription>
                        The URL path for this post (auto-generated from title)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="SEO-optimized title (optional)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Defaults to post title if left empty
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="SEO-optimized description (optional)" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Defaults to post excerpt if left empty
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="media" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <FormLabel className="block mb-2">Thumbnail Image</FormLabel>
                    <div className="mt-1 flex items-center space-x-4">
                      {thumbnailPreview && (
                        <div className="relative w-32 h-32 rounded overflow-hidden">
                          <img 
                            src={thumbnailPreview} 
                            alt="Thumbnail preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('thumbnail-upload')?.click()}
                      >
                        {thumbnailPreview ? 'Change Image' : 'Upload Image'}
                      </Button>
                      <input
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailChange}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Recommended size: 1200 x 630 pixels
                    </p>
                  </div>
                  
                  {/* Add image uploader for content here if needed */}
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={isCategoriesLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="readTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Read Time (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Post</FormLabel>
                        <FormDescription>
                          Featured posts appear prominently on the blog homepage
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (postId ? 'Update Post' : 'Create Post')}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}