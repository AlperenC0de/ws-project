import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  cuisine: text("cuisine").notNull(),
  category: text("category").notNull(),
  origin: text("origin").notNull(),
  flavorProfile: text("flavor_profile").notNull(),
  ingredients: text("ingredients").array().notNull(),
  instructions: text("instructions").array().notNull(),
  tips: text("tips").array().notNull(),
  servingSuggestion: text("serving_suggestion").notNull(),
  nutritionInfo: text("nutrition_info").notNull(),
  cookingTime: text("cooking_time").notNull(),
  servings: text("servings").notNull(),
  difficulty: text("difficulty").notNull(),
  imageUrl: text("image_url"),
  rating: integer("rating").default(45), // out of 50 (4.5 stars)
});

export const cuisines = pgTable("cuisines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  flag: text("flag").notNull(),
  description: text("description").notNull(),
  featured: text("featured").notNull(),
  imageUrl: text("image_url"),
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
  rating: true,
});

export const insertCuisineSchema = createInsertSchema(cuisines).omit({
  id: true,
});

export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Cuisine = typeof cuisines.$inferSelect;
export type InsertCuisine = z.infer<typeof insertCuisineSchema>;
