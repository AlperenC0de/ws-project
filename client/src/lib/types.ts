export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  category: string;
  origin: string;
  flavorProfile: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  servingSuggestion: string;
  nutritionInfo: string;
  cookingTime: string;
  servings: string;
  difficulty: string;
  imageUrl?: string;
  rating: number;
}

export interface Cuisine {
  id: number;
  name: string;
  flag: string;
  description: string;
  featured: string;
  imageUrl?: string;
}

export interface SearchFilters {
  cuisine?: string;
  category?: string;
  difficulty?: string;
  maxCookingTime?: number;
}
