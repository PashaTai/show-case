import { Helmet } from "react-helmet";
import { useRoute, Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { formatDate, calculateReadTime } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-28 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }
  
  const readTime = calculateReadTime(post.content);
  
  return (
    <>
      <Helmet>
        <title>{post.title} | Andrew Ivanov</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      
      <div className="bg-primary py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <Link href="/blog">
            <Button variant="ghost" className="text-white mb-6 hover:bg-primary-700">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <span className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{post.title}</h1>
        </div>
      </div>
      
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center mb-8 pb-6 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/assets/andrew-ivanov.jpg" alt="Andrew Ivanov" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <div className="font-medium">Andrew Ivanov</div>
            <div className="text-sm text-slate-500">
              {formatDate(post.date)} · {readTime} min read
            </div>
          </div>
        </div>
        
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full rounded-lg mb-8 object-cover max-h-[500px]"
          />
        )}
        
        <div className="prose prose-slate max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
