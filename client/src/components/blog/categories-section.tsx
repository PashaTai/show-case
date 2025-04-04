import { Link } from "wouter";
import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";

export default function CategoriesSection() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Browse by Category</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-500 sm:mt-4">
            Find articles specific to your marketing interests and challenges.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group relative bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full"
            >
              <div className="h-48 bg-primary group-hover:opacity-75 transition-opacity duration-300">
                <img 
                  src={category.imageUrl} 
                  alt={category.title} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">
                    <Link href={`/blog?category=${category.slug}`}>
                      <span className="hover:underline cursor-pointer">{category.title}</span>
                    </Link>
                  </h3>
                  <p className="mt-3 text-base text-slate-500">{category.description}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/blog?category=${category.slug}`}>
                    <span className="text-base font-medium text-primary hover:text-primary-700 inline-flex items-center cursor-pointer">
                      View articles <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
