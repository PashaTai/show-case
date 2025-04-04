import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";

export default function FeaturedArticles() {
  // Get the 3 most recent blog posts for the featured section
  const featuredPosts = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="relative bg-slate-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-slate-900 sm:text-4xl">Featured Articles</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-500 sm:mt-4">
            Hand-picked content to help you master modern marketing techniques.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden">
              <div className="flex-shrink-0">
                <img 
                  className="h-48 w-full object-cover" 
                  src={post.imageUrl} 
                  alt={post.title} 
                />
              </div>
              <CardContent className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">
                    <Link href={`/blog?category=${post.category}`}>
                      <a className="hover:underline">{post.category}</a>
                    </Link>
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <a className="block mt-2">
                      <p className="text-xl font-semibold text-slate-900">{post.title}</p>
                      <p className="mt-3 text-base text-slate-500">{post.excerpt}</p>
                    </a>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/assets/andrew-ivanov.jpg" alt="Andrew Ivanov" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">Andrew Ivanov</p>
                    <div className="flex space-x-1 text-sm text-slate-500">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
