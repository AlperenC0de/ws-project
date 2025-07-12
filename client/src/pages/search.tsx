import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/lib/types";

export default function SearchPage() {
  const [location] = useLocation();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const query = params.get('q') || '';
    setSearchQuery(query);
  }, [location]);

  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ['/api/recipes/search', searchQuery],
    enabled: !!searchQuery,
  });

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              Search Results
            </h1>
            {searchQuery && (
              <p className="text-xl mb-8 opacity-90">
                Results for "{searchQuery}"
              </p>
            )}
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search recipes, cuisines, or ingredients..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {searchQuery ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-poppins font-bold text-dark-gray">
                  Search Results
                </h2>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {recipes?.length || 0} recipes found
                </Badge>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                      <div className="w-full h-48 bg-gray-300 rounded-xl mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/4 mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recipes?.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No recipes found matching your search.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Try searching for different keywords or cuisine types.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recipes?.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      onClick={handleRecipeClick}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Enter a search query to find recipes.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recipe Modal */}
      <RecipeModal 
        recipe={selectedRecipe}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
