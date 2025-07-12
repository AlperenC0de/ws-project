import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import type { Recipe, Cuisine } from "@/lib/types";

const cuisineFlags: Record<string, string> = {
  Turkish: "🇹🇷",
  Italian: "🇮🇹",
  Japanese: "🇯🇵",
  Mexican: "🇲🇽",
  Spanish: "🇪🇸",
  Thai: "🇹🇭",
  Chinese: "🇨🇳",
  French: "🇫🇷",
  Indian: "🇮🇳",
  Greek: "🇬🇷",
};

export default function CuisinePage() {
  const [match, params] = useRoute("/cuisine/:name");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cuisineName = params?.name || "";

  const { data: cuisine } = useQuery<Cuisine>({
    queryKey: ['/api/cuisines', cuisineName],
    enabled: !!cuisineName,
  });

  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ['/api/cuisines', cuisineName, 'recipes'],
    enabled: !!cuisineName,
  });

  const filteredRecipes = recipes?.filter(recipe => 
    searchQuery === "" || 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) || [];

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (!match) {
    return <div>Cuisine not found</div>;
  }

  const flag = cuisineFlags[cuisineName] || "🍽️";

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              {flag} {cuisineName} Cuisine
            </h1>
            {cuisine && (
              <p className="text-xl mb-8 opacity-90">
                {cuisine.description}
              </p>
            )}
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                placeholder={`Search ${cuisineName} recipes...`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-poppins font-bold text-dark-gray">
              {cuisineName} Recipes
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {filteredRecipes.length} recipes
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
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery ? 'No recipes found matching your search.' : 'No recipes found for this cuisine.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
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
