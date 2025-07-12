import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/home";
import CuisinePage from "@/pages/cuisine";
import RecipePage from "@/pages/recipe";
import SearchPage from "@/pages/search";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-warm-gray">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/cuisine/:name" component={CuisinePage} />
        <Route path="/recipe/:id" component={RecipePage} />
        <Route path="/search" component={SearchPage} />
        <Route component={NotFound} />
      </Switch>
      
      {/* Footer */}
      <footer className="bg-dark-gray text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🍽️</span>
                <h5 className="text-xl font-poppins font-bold">World Cuisine</h5>
              </div>
              <p className="text-gray-400">
                Discover authentic recipes from around the world and bring global flavors to your kitchen.
              </p>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Popular Cuisines</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/cuisine/Turkish" className="hover:text-white transition-colors">Turkish</a></li>
                <li><a href="/cuisine/Italian" className="hover:text-white transition-colors">Italian</a></li>
                <li><a href="/cuisine/Japanese" className="hover:text-white transition-colors">Japanese</a></li>
                <li><a href="/cuisine/Mexican" className="hover:text-white transition-colors">Mexican</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Connect</h6>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-xl">📺</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 World Cuisine Recipe Collection. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
