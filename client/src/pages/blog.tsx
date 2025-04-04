import { Helmet } from "react-helmet";
import BlogHeader from "@/components/blog/blog-header";
import FeaturedArticles from "@/components/blog/featured-articles";
import RecentArticles from "@/components/blog/recent-articles";
import CategoriesSection from "@/components/blog/categories-section";

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog | Andrew Ivanov</title>
        <meta name="description" content="Discover actionable marketing strategies, case studies, and insights to help grow your business." />
      </Helmet>
      <div className="space-y-0">
        <BlogHeader />
        <FeaturedArticles />
        <RecentArticles />
        <CategoriesSection />
      </div>
    </>
  );
}
