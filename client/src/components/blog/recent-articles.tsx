import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { blogPosts } from "@/data/blog-posts";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function RecentArticles() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get posts excluding featured ones (which are the 3 most recent)
  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(3, 9);
  
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const newsletterMutation = useMutation({
    mutationFn: (data: NewsletterFormValues) => 
      apiRequest("POST", "/api/newsletter", data),
    onSuccess: () => {
      toast({
        title: "Subscription Successful",
        description: "You've been added to our newsletter list.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem with your subscription. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });
  
  function onSubmit(data: NewsletterFormValues) {
    setIsSubmitting(true);
    newsletterMutation.mutate(data);
  }
  
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto divide-y-2 divide-slate-200">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-slate-900 sm:text-4xl">Recent Articles</h2>
          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
            <p className="text-xl text-slate-500">
              Get the latest marketing insights and strategies from my blog.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          type="email" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="mt-3 sm:mt-0 sm:ml-3" 
                  disabled={isSubmitting}
                >
                  Subscribe
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
          {recentPosts.map((post) => (
            <div key={post.id}>
              <p className="text-sm text-primary">
                <Link href={`/blog?category=${post.category}`}>
                  <a className="hover:underline">{post.category}</a>
                </Link>
              </p>
              <Link href={`/blog/${post.slug}`}>
                <a className="mt-2 block">
                  <p className="text-xl font-semibold text-slate-900">{post.title}</p>
                  <p className="mt-3 text-base text-slate-500">{post.excerpt}</p>
                </a>
              </Link>
              <div className="mt-3">
                <Link href={`/blog/${post.slug}`}>
                  <a className="text-base font-semibold text-primary hover:text-primary-700 inline-flex items-center">
                    Read full article 
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
