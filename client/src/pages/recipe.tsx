import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Clock, Users, Signal, Flag, Check, Lightbulb, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Recipe } from "@/lib/types";

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

export default function RecipePage() {
  const [match, params] = useRoute("/recipe/:id");
  const recipeId = params?.id ? parseInt(params.id) : 0;

  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ['/api/recipes', recipeId],
    enabled: !!recipeId,
  });

  if (!match) {
    return <div>Recipe not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-gray">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-warm-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark-gray mb-4">Recipe Not Found</h1>
          <p className="text-gray-600">The recipe you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const flag = cuisineFlags[recipe.cuisine] || "🍽️";
  const rating = recipe.rating / 10;

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
              {flag} {recipe.cuisine}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              {recipe.name}
            </h1>
            <div className="flex items-center justify-center text-yellow-400 mb-4">
              <Star className="w-6 h-6 fill-current" />
              <span className="ml-2 text-xl">{rating.toFixed(1)}</span>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {recipe.flavorProfile}
            </p>
          </div>
        </div>
      </section>

      {/* Recipe Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image and Info */}
            <div className="space-y-8">
              <img 
                src={recipe.imageUrl || "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"} 
                alt={recipe.name}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-poppins font-semibold mb-6">Recipe Info</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="text-primary mr-3 w-5 h-5" />
                      <div>
                        <p className="font-medium">Cook Time</p>
                        <p className="text-sm text-gray-600">{recipe.cookingTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="text-primary mr-3 w-5 h-5" />
                      <div>
                        <p className="font-medium">Servings</p>
                        <p className="text-sm text-gray-600">{recipe.servings}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Signal className="text-primary mr-3 w-5 h-5" />
                      <div>
                        <p className="font-medium">Difficulty</p>
                        <p className="text-sm text-gray-600">{recipe.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Flag className="text-primary mr-3 w-5 h-5" />
                      <div>
                        <p className="font-medium">Category</p>
                        <p className="text-sm text-gray-600">{recipe.category}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recipe Details */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-poppins font-semibold mb-4">Origin & History</h3>
                  <p className="text-gray-700">{recipe.origin}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-poppins font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-primary mr-3 w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-poppins font-semibold mb-4">Instructions</h3>
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0 mt-1">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
              
              {recipe.tips.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-poppins font-semibold mb-4">Tips & Tricks</h3>
                    <ul className="space-y-3">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <Lightbulb className="text-yellow-500 mr-3 w-4 h-4 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-poppins font-semibold mb-4">Serving Suggestion</h3>
                  <p className="text-gray-700">{recipe.servingSuggestion}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-poppins font-semibold mb-4">Nutrition Info</h3>
                  <p className="text-gray-700">{recipe.nutritionInfo}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
