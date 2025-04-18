import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Biography from "@/pages/biography";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Admin from "@/pages/admin";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  const [location] = useLocation();
  const isAdminPage = location === "/admin";

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Header />}
      <main className={`flex-grow ${isAdminPage ? 'pt-0' : 'pt-16'}`}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/biography" component={Biography} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
