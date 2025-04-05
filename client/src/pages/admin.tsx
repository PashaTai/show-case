import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StrapiConfig from "@/components/admin/strapi-config";
import BlogEditor from "@/components/admin/blog-editor";
import { 
  useBlogPosts, 
  useBlogPost 
} from "@/hooks/use-strapi-blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Fetch blog posts
  const { data: blogData, isLoading, refetch } = useBlogPosts({
    limit: 100, // Fetch all posts
  });
  
  // Get the post being edited
  const slug = editPostId ? `blog-post-${editPostId}` : '';
  const { data: postToEdit } = useBlogPost(slug);
  
  // Reset editor state
  const handleEditorSuccess = () => {
    setEditPostId(null);
    setIsCreating(false);
    refetch();
  };
  
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Helmet>
        <title>Admin Dashboard | Andrew Ivanov</title>
      </Helmet>
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="posts">Manage Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Posts Tab */}
          <TabsContent value="posts">
            {isCreating || editPostId ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {isCreating ? 'Create New Post' : 'Edit Post'}
                  </h2>
                  <Button variant="outline" onClick={() => {
                    setIsCreating(false);
                    setEditPostId(null);
                  }}>
                    Cancel
                  </Button>
                </div>
                
                <BlogEditor 
                  postId={editPostId ?? undefined}
                  initialData={postToEdit}
                  onSuccess={handleEditorSuccess}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Blog Posts</h2>
                  <Button onClick={() => setIsCreating(true)}>
                    Create New Post
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    {isLoading ? (
                      <p>Loading posts...</p>
                    ) : blogData?.posts?.length ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {blogData.posts.map((post) => (
                            <TableRow key={post.id}>
                              <TableCell className="font-medium">{post.title}</TableCell>
                              <TableCell>{post.category}</TableCell>
                              <TableCell>{formatDate(post.date)}</TableCell>
                              <TableCell>{post.featured ? 'Yes' : 'No'}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditPostId(post.id)}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-500">No posts found</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsCreating(true)}
                        >
                          Create your first post
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Categories</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Category Management</CardTitle>
                  <CardDescription>
                    Coming soon: Create and manage blog categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Category management interface is under development.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">CMS Settings</h2>
              
              <StrapiConfig />
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Help & Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Setting Up Strapi CMS</h3>
                    <ol className="list-decimal ml-5 space-y-2">
                      <li>
                        Install Strapi on your server or use a Strapi cloud provider
                      </li>
                      <li>
                        Create content types in Strapi that match the expected structure:
                        <ul className="list-disc ml-5 mt-1">
                          <li><strong>Article</strong>: title, content, excerpt, slug, etc.</li>
                          <li><strong>Category</strong>: name, description, slug, etc.</li>
                          <li><strong>Author</strong>: name, bio, etc.</li>
                        </ul>
                      </li>
                      <li>
                        Generate an API token in Strapi Admin (Settings → API Tokens)
                      </li>
                      <li>
                        Configure your Strapi URL and API token in the settings above
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}