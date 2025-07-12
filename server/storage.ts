import { recipes, cuisines, type Recipe, type InsertRecipe, type Cuisine, type InsertCuisine } from "@shared/schema";
import { RecipeParser } from "./services/recipeParser";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getRecipe(id: number): Promise<Recipe | undefined>;
  getRecipes(): Promise<Recipe[]>;
  getRecipesBySearch(query: string): Promise<Recipe[]>;
  getRecipesByCuisine(cuisine: string): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  getCuisines(): Promise<Cuisine[]>;
  getCuisine(name: string): Promise<Cuisine | undefined>;
  createCuisine(cuisine: InsertCuisine): Promise<Cuisine>;
  initializeData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private recipes: Map<number, Recipe>;
  private cuisines: Map<string, Cuisine>;
  private currentRecipeId: number;
  private currentCuisineId: number;

  constructor() {
    this.recipes = new Map();
    this.cuisines = new Map();
    this.currentRecipeId = 1;
    this.currentCuisineId = 1;
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipesBySearch(query: string): Promise<Recipe[]> {
    const searchQuery = query.toLowerCase();
    return Array.from(this.recipes.values()).filter(recipe =>
      recipe.name.toLowerCase().includes(searchQuery) ||
      recipe.cuisine.toLowerCase().includes(searchQuery) ||
      recipe.category.toLowerCase().includes(searchQuery) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchQuery)
      )
    );
  }

  async getRecipesByCuisine(cuisine: string): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).filter(recipe =>
      recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = this.currentRecipeId++;
    const recipe: Recipe = { 
      ...insertRecipe, 
      id,
      rating: 45, // Default rating
      imageUrl: insertRecipe.imageUrl || null
    };
    this.recipes.set(id, recipe);
    return recipe;
  }

  async getCuisines(): Promise<Cuisine[]> {
    return Array.from(this.cuisines.values());
  }

  async getCuisine(name: string): Promise<Cuisine | undefined> {
    return this.cuisines.get(name);
  }

  async createCuisine(insertCuisine: InsertCuisine): Promise<Cuisine> {
    const id = this.currentCuisineId++;
    const cuisine: Cuisine = { 
      ...insertCuisine, 
      id,
      imageUrl: insertCuisine.imageUrl || null
    };
    this.cuisines.set(insertCuisine.name, cuisine);
    return cuisine;
  }

  async initializeData(): Promise<void> {
    // Load all recipes from the 10 cuisine files
    const { recipes, cuisines } = RecipeParser.parseAllRecipeFiles();
    
    // Initialize cuisines
    for (const cuisine of cuisines) {
      await this.createCuisine(cuisine);
    }
    
    // Initialize recipes
    for (const recipe of recipes) {
      await this.createRecipe(recipe);
    }
    
    console.log(`Loaded ${recipes.length} recipes and ${cuisines.length} cuisines`);
  }
}

export const storage = new MemStorage();
