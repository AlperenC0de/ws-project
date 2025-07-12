import { Clock, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/lib/types";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
}

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

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const flag = cuisineFlags[recipe.cuisine] || "🍽️";
  const rating = recipe.rating / 10; // Convert to 5-star scale

  return (
    <Card 
      className="recipe-card cursor-pointer group" 
      onClick={() => onClick?.(recipe)}
    >
      <div className="relative">
        <img 
          src={recipe.imageUrl || "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"} 
          alt={recipe.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-primary text-white">
            {flag} {recipe.cuisine}
          </Badge>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-poppins font-semibold mb-2 text-dark-gray">
          {recipe.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {recipe.flavorProfile}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{recipe.cookingTime}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
