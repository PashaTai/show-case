import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location === href;

    return (
      <div className="inline-block">
        <Link href={href}>
          <span className={cn(
            "text-slate-900 hover:text-primary font-medium px-3 py-2 rounded-md text-sm cursor-pointer inline-block",
            isActive && "text-primary"
          )}>
            {children}
          </span>
        </Link>
      </div>
    );
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <span className="font-bold text-xl text-primary cursor-pointer">Andrew Ivanov</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/biography">Biography</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <div className="inline-block ml-4">
              <Link href="/#contact">
                <Button size="sm" asChild>
                  <span>Contact</span>
                </Button>
              </Link>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <Link href="/">
                <span 
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white cursor-pointer",
                    location === "/" ? "bg-primary text-white" : "text-slate-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </span>
              </Link>
              <Link href="/biography">
                <span 
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white cursor-pointer",
                    location === "/biography" ? "bg-primary text-white" : "text-slate-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Biography
                </span>
              </Link>
              <Link href="/blog">
                <span 
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white cursor-pointer",
                    location === "/blog" ? "bg-primary text-white" : "text-slate-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </span>
              </Link>
              <Link href="/#contact">
                <span 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary-700 cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
