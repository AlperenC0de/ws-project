import { X, Clock, Users, Signal, Flag, Check, Lightbulb } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Recipe } from "@/lib/types";

interface RecipeModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
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

export function RecipeModal({ recipe, open, onClose }: RecipeModalProps) {
  if (!recipe) return null;

  const flag = cuisineFlags[recipe.cuisine] || "🍽️";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-poppins font-bold">
            {recipe.name}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh] px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image and Info */}
            <div className="space-y-6">
              <img 
                src={recipe.imageUrl || "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"} 
                alt={recipe.name}
                className="w-full h-64 object-cover rounded-xl"
              />
              
              <div className="bg-warm-gray p-6 rounded-xl">
                <h3 className="text-lg font-poppins font-semibold mb-4">Recipe Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="text-primary mr-3 w-5 h-5" />
                    <span>Cooking Time: {recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-primary mr-3 w-5 h-5" />
                    <span>Servings: {recipe.servings}</span>
                  </div>
                  <div className="flex items-center">
                    <Signal className="text-primary mr-3 w-5 h-5" />
                    <span>Difficulty: {recipe.difficulty}</span>
                  </div>
                  <div className="flex items-center">
                    <Flag className="text-primary mr-3 w-5 h-5" />
                    <span>Cuisine: {flag} {recipe.cuisine}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipe Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-poppins font-semibold mb-3">Origin & History</h3>
                <p className="text-gray-600">{recipe.origin}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-poppins font-semibold mb-3">Flavor Profile</h3>
                <p className="text-gray-600">{recipe.flavorProfile}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-poppins font-semibold mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-primary mr-2 w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-poppins font-semibold mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 mt-1">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              {recipe.tips.length > 0 && (
                <div>
                  <h3 className="text-lg font-poppins font-semibold mb-3">Tips & Tricks</h3>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="text-yellow-500 mr-2 w-4 h-4 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-poppins font-semibold mb-3">Serving Suggestion</h3>
                <p className="text-gray-600">{recipe.servingSuggestion}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-poppins font-semibold mb-3">Nutrition Info</h3>
                <p className="text-gray-600">{recipe.nutritionInfo}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
