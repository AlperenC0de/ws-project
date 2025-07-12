import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { RecipeParser } from "./services/recipeParser";
import { join } from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize data on startup
  try {
    const filePath = join(process.cwd(), 'attached_assets', 'turk_mutfagi_1752349052207.txt');
    const { recipes, cuisines } = RecipeParser.parseRecipeFile(filePath);
    
    // Create cuisines first
    for (const cuisine of cuisines) {
      await storage.createCuisine(cuisine);
    }
    
    // Create recipes
    for (const recipe of recipes) {
      await storage.createRecipe(recipe);
    }
    
    console.log(`Loaded ${recipes.length} recipes and ${cuisines.length} cuisines`);
  } catch (error) {
    console.error('Error initializing data:', error);
  }

  // Get all recipes
  app.get("/api/recipes", async (req, res) => {
    try {
      const recipes = await storage.getRecipes();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  });

  // Get recipe by ID
  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const recipe = await storage.getRecipe(id);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipe" });
    }
  });

  // Search recipes
  app.get("/api/recipes/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const recipes = await storage.getRecipesBySearch(query);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to search recipes" });
    }
  });

  // Get recipes by cuisine
  app.get("/api/cuisines/:cuisine/recipes", async (req, res) => {
    try {
      const cuisine = req.params.cuisine;
      const recipes = await storage.getRecipesByCuisine(cuisine);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes by cuisine" });
    }
  });

  // Get all cuisines
  app.get("/api/cuisines", async (req, res) => {
    try {
      const cuisines = await storage.getCuisines();
      res.json(cuisines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cuisines" });
    }
  });

  // Get cuisine by name
  app.get("/api/cuisines/:name", async (req, res) => {
    try {
      const name = req.params.name;
      const cuisine = await storage.getCuisine(name);
      if (!cuisine) {
        return res.status(404).json({ error: "Cuisine not found" });
      }
      res.json(cuisine);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cuisine" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
