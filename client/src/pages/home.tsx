import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { CuisineGrid } from "@/components/CuisineGrid";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import type { Recipe } from "@/lib/types";

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ['/api/recipes'],
  });

  // Get featured recipes (first 6)
  const featuredRecipes = recipes?.slice(0, 6) || [];

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleSearch = (query: string) => {
    // This will be handled by the SearchBar component navigation
    console.log('Search query:', query);
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Discover World Flavors
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Authentic recipes from 10 cuisines around the globe
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Featured Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{recipes?.length || 0}+</div>
                <div className="text-lg opacity-90">Authentic Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10</div>
                <div className="text-lg opacity-90">World Cuisines</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100k+</div>
                <div className="text-lg opacity-90">Happy Cooks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisine Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-poppins font-bold text-center mb-12 text-dark-gray">
            Explore Cuisines
          </h3>
          <CuisineGrid />
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 bg-warm-gray">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-poppins font-bold text-center mb-12 text-dark-gray">
            Featured Recipes
          </h3>
          
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={handleRecipeClick}
                />
              ))}
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
