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
      <Link href={href}>
        <a className={cn(
          "text-slate-900 hover:text-primary font-medium px-3 py-2 rounded-md text-sm",
          isActive && "text-primary"
        )}>
          {children}
        </a>
      </Link>
    );
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="font-bold text-xl text-primary">Andrew Ivanov</a>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/biography">Biography</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <Button asChild size="sm" className="ml-4">
              <Link href="/#contact">Contact</Link>
            </Button>
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
                <a 
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white",
                    location === "/" ? "bg-primary text-white" : "text-slate-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </Link>
              <Link href="/biography">
                <a 
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white",
                    location === "/biography" ? "bg-primary text-white" : "text-slate-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Biography
                </a>
              </Link>
              <Link href="/blog">
                <a 
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white",
                    location === "/blog" ? "bg-primary text-white" : "text-slate-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </a>
              </Link>
              <Link href="/#contact">
                <a 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
