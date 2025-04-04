import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function BioIntro() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              From Tech to Marketing: My Professional Journey
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              With over 20 years of experience in marketing, I've helped more than 200 companies across 15 industries achieve breakthrough growth through innovative marketing strategies.
            </p>
            <p className="mt-4 text-lg text-slate-500">
              My approach combines data-driven analysis with creative solutions, delivering measurable results that directly impact the bottom line.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/#contact">Work With Me</Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <img 
              className="rounded-lg shadow-lg object-cover" 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
              alt="Andrew Ivanov portrait" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
