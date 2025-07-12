import { readFileSync } from 'fs';
import { join } from 'path';
import type { InsertRecipe, InsertCuisine } from '@shared/schema';

interface ParsedRecipe {
  name: string;
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
  category: string;
}

export class RecipeParser {
  private static cuisineData: Record<string, InsertCuisine> = {
    "Turkish": {
      name: "Turkish",
      flag: "🇹🇷",
      description: "Rich flavors from the crossroads of Europe and Asia",
      featured: "Kebabs, Baklava, Dolma",
      imageUrl: "https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "Italian": {
      name: "Italian",
      flag: "🇮🇹",
      description: "Mediterranean cuisine with pasta, pizza, and wine",
      featured: "Pasta, Pizza, Risotto",
      imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "Japanese": {
      name: "Japanese",
      flag: "🇯🇵",
      description: "Delicate flavors and artful presentation",
      featured: "Sushi, Ramen, Tempura",
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "Mexican": {
      name: "Mexican",
      flag: "🇲🇽",
      description: "Bold spices and vibrant colors",
      featured: "Tacos, Pozole, Guacamole",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "Spanish": {
      name: "Spanish",
      flag: "🇪🇸",
      description: "Mediterranean and Atlantic influences",
      featured: "Paella, Tapas, Gazpacho",
      imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "Thai": {
      name: "Thai",
      flag: "🇹🇭",
      description: "Sweet, sour, salty, and spicy harmony",
      featured: "Pad Thai, Green Curry, Tom Yum",
      imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "Chinese": {
      name: "Chinese",
      flag: "🇨🇳",
      description: "Diverse regional flavors and techniques",
      featured: "Kung Pao, Dumplings, Fried Rice",
      imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "French": {
      name: "French",
      flag: "🇫🇷",
      description: "Elegant techniques and refined flavors",
      featured: "Coq au Vin, Bouillabaisse, Crème Brûlée",
      imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "Indian": {
      name: "Indian",
      flag: "🇮🇳",
      description: "Complex spices and aromatic dishes",
      featured: "Curry, Biryani, Tandoori",
      imageUrl: "https://images.unsplash.com/photo-1574653339527-d91e31a5e6d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    },
    "Greek": {
      name: "Greek",
      flag: "🇬🇷",
      description: "Fresh ingredients and Mediterranean sunshine",
      featured: "Moussaka, Souvlaki, Greek Salad",
      imageUrl: "https://images.unsplash.com/photo-1544124499-58912cbddaad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"
    }
  };

  private static recipeImages: Record<string, string> = {
    "Adana Kebap": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Urfa Kebap": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "İskender Kebap": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Cağ Kebabı": "https://images.unsplash.com/photo-1595777342537-b0c5f2a1c6f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Beyti Kebap": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Testi Kebabı": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Fıstıklı Kebap": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Dana Şiş": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Kuzu Şiş": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Ali Nazik": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Etli Güveç": "https://images.unsplash.com/photo-1572441709701-6c8c8d2c7e0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Dana Haşlama": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Kuzu Tandır": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Tas Kebabı": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    "Hünkar Beğendi": "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  };

  public static parseRecipeFile(filePath: string): { recipes: InsertRecipe[], cuisines: InsertCuisine[] } {
    try {
      const fileContent = readFileSync(filePath, 'utf-8');
      const recipes = this.parseRecipes(fileContent);
      const cuisines = Object.values(this.cuisineData);
      return { recipes, cuisines };
    } catch (error) {
      console.error('Error parsing recipe file:', error);
      return { recipes: [], cuisines: [] };
    }
  }

  private static parseRecipes(content: string): InsertRecipe[] {
    const recipes: InsertRecipe[] = [];
    const sections = content.split('**YEMEK ADI:**').filter(section => section.trim());
    
    for (const section of sections) {
      try {
        const recipe = this.parseRecipeSection(section);
        if (recipe) {
          recipes.push(recipe);
        }
      } catch (error) {
        console.error('Error parsing recipe section:', error);
      }
    }
    
    return recipes;
  }

  private static parseRecipeSection(section: string): InsertRecipe | null {
    const lines = section.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length === 0) return null;
    
    const recipe: Partial<ParsedRecipe> = {};
    let currentSection = '';
    let currentContent: string[] = [];
    
    // Extract recipe name
    recipe.name = lines[0].trim();
    
    // Determine category based on content structure
    let currentCategory = 'Main Course';
    if (section.includes('KEBAPLAR')) {
      currentCategory = 'Kebabs';
    } else if (section.includes('GÜVEÇ') || section.includes('TENCERE')) {
      currentCategory = 'Stews';
    }
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('**KÖKENİ VE KISA TARİHÇESİ:**')) {
        this.saveCurrentSection(recipe, currentSection, currentContent);
        currentSection = 'origin';
        currentContent = [];
      } else if (line.startsWith('**LEZZET PROFİLİ:**')) {
        this.saveCurrentSection(recipe, currentSection, currentContent);
        currentSection = 'flavorProfile';
        currentContent = [];
      } else if (line.startsWith('**MALZEMELER:**')) {
        this.saveCurrentSection(recipe, currentSection, currentContent);
        currentSection = 'ingredients';
        currentContent = [];
      } else if (line.startsWith('**HAZIRLANIŞI')) {
        this.saveCurrentSection(recipe, currentSection, currentContent);
        currentSection = 'instructions';
        currentContent = [];
      } else if (line.startsWith('**PÜF NOKTALARI')) {
        this.saveCurrentSection(recipe, currentSection, currentContent);
        currentSection = 'tips';
        currentContent = [];
      } else if (line.startsWith('**SERVİS ÖNERİSİ:**')) {
        this.saveCurrentSection(recipe, currentSection, currentContent);
        currentSection = 'servingSuggestion';
        currentContent = [];
      } else if (line.startsWith('**SAĞLIK VE BESİN BİLGİLERİ:**')) {
        this.saveCurrentSection(recipe, currentSection, currentContent);
        currentSection = 'nutritionInfo';
        currentContent = [];
      } else if (line.startsWith('─────────────────────────────────')) {
        this.saveCurrentSection(recipe, currentSection, currentContent);
        break;
      } else if (line.startsWith('**') || line.startsWith('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')) {
        // Skip other headers
        continue;
      } else if (line && !line.startsWith('**')) {
        currentContent.push(line);
      }
    }
    
    // Save the last section
    this.saveCurrentSection(recipe, currentSection, currentContent);
    
    if (!recipe.name) return null;
    
    return {
      name: recipe.name,
      cuisine: 'Turkish',
      category: currentCategory,
      origin: recipe.origin || '',
      flavorProfile: recipe.flavorProfile || '',
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      tips: recipe.tips || [],
      servingSuggestion: recipe.servingSuggestion || '',
      nutritionInfo: recipe.nutritionInfo || '',
      cookingTime: this.extractCookingTime(recipe.instructions || []),
      servings: this.extractServings(recipe.ingredients || []),
      difficulty: this.determineDifficulty(recipe.instructions || []),
      imageUrl: this.recipeImages[recipe.name] || "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
    };
  }

  private static saveCurrentSection(recipe: Partial<ParsedRecipe>, section: string, content: string[]) {
    if (!section || content.length === 0) return;
    
    const contentText = content.join(' ').trim();
    
    switch (section) {
      case 'origin':
        recipe.origin = contentText;
        break;
      case 'flavorProfile':
        recipe.flavorProfile = contentText;
        break;
      case 'ingredients':
        recipe.ingredients = content.filter(line => line.startsWith('-')).map(line => line.substring(1).trim());
        break;
      case 'instructions':
        recipe.instructions = content.filter(line => line.match(/^\d+\./)).map(line => line.replace(/^\d+\.\s*/, ''));
        break;
      case 'tips':
        recipe.tips = content.filter(line => line.startsWith('-')).map(line => line.substring(1).trim());
        break;
      case 'servingSuggestion':
        recipe.servingSuggestion = contentText;
        break;
      case 'nutritionInfo':
        recipe.nutritionInfo = contentText;
        break;
    }
  }

  private static extractCookingTime(instructions: string[]): string {
    // Look for time patterns in instructions
    const timePattern = /(\d+)\s*(dk|dakika|saat|min|minute|hour)/i;
    let totalMinutes = 0;
    
    for (const instruction of instructions) {
      const match = instruction.match(timePattern);
      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        if (unit.includes('saat') || unit.includes('hour')) {
          totalMinutes += value * 60;
        } else {
          totalMinutes += value;
        }
      }
    }
    
    if (totalMinutes === 0) return '30 min';
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    
    return `${totalMinutes}m`;
  }

  private static extractServings(ingredients: string[]): string {
    // Look for serving indicators in ingredients
    const servingPattern = /(\d+)\s*(kişi|portion|serving)/i;
    
    for (const ingredient of ingredients) {
      const match = ingredient.match(servingPattern);
      if (match) {
        return match[1];
      }
    }
    
    // Default based on ingredient quantities
    const hasLargeQuantities = ingredients.some(ing => 
      ing.includes('500 gr') || ing.includes('1 kg') || ing.includes('800 gr')
    );
    
    return hasLargeQuantities ? '4-6' : '2-4';
  }

  private static determineDifficulty(instructions: string[]): string {
    const stepCount = instructions.length;
    const complexKeywords = ['marine', 'yoğur', 'dinlendir', 'köz', 'tandır', 'fırın'];
    
    const hasComplexSteps = instructions.some(instruction => 
      complexKeywords.some(keyword => instruction.toLowerCase().includes(keyword))
    );
    
    if (stepCount >= 8 || hasComplexSteps) return 'Hard';
    if (stepCount >= 5) return 'Medium';
    return 'Easy';
  }

  public static getCuisines(): InsertCuisine[] {
    return Object.values(this.cuisineData);
  }
}
