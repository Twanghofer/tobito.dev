import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Get all public recipes (no auth required)
export const getPublicRecipes = query({
  args: {
    tagFilter: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let recipes;

    if (args.searchQuery) {
      // Use search index for text search
      recipes = await ctx.db
        .query("recipes")
        .withSearchIndex("search_recipes", (q) =>
          q.search("title", args.searchQuery!).eq("isPublic", true)
        )
        .collect();
    } else {
      // Get all public recipes
      recipes = await ctx.db
        .query("recipes")
        .withIndex("by_public", (q) => q.eq("isPublic", true))
        .order("desc")
        .collect();
    }

    // Filter by tag if specified
    if (args.tagFilter) {
      recipes = recipes.filter(recipe => 
        recipe.tags.includes(args.tagFilter!)
      );
    }

    // Get image URLs for recipes that have images
    return Promise.all(
      recipes.map(async (recipe) => ({
        ...recipe,
        imageUrl: recipe.imageId
          ? await ctx.storage.getUrl(recipe.imageId)
          : null,
      }))
    );
  },
});

// Get user's own recipes (auth required)
export const getUserRecipes = query({
  args: {
    tagFilter: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    let recipes;

    if (args.searchQuery) {
      // Get all user's recipes and filter by search
      recipes = await ctx.db
        .query("recipes")
        .withIndex("by_author", (q) => q.eq("authorId", userId))
        .collect();
      
      recipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(args.searchQuery!.toLowerCase())
      );
    } else {
      // Get all recipes for user
      recipes = await ctx.db
        .query("recipes")
        .withIndex("by_author", (q) => q.eq("authorId", userId))
        .order("desc")
        .collect();
    }

    // Filter by tag if specified
    if (args.tagFilter) {
      recipes = recipes.filter(recipe => 
        recipe.tags.includes(args.tagFilter!)
      );
    }

    // Get image URLs for recipes that have images
    return Promise.all(
      recipes.map(async (recipe) => ({
        ...recipe,
        imageUrl: recipe.imageId
          ? await ctx.storage.getUrl(recipe.imageId)
          : null,
      }))
    );
  },
});

// Get a single recipe by ID (public access)
export const getRecipe = query({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) {
      return null;
    }

    // Check if recipe is public or if user is the author
    const userId = await getAuthUserId(ctx);
    const canView = recipe.isPublic || (userId && recipe.authorId === userId);
    
    if (!canView) {
      return null;
    }

    return {
      ...recipe,
      imageUrl: recipe.imageId
        ? await ctx.storage.getUrl(recipe.imageId)
        : null,
    };
  },
});

// Check if user can edit a recipe
export const canEditRecipe = query({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return false;
    }

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) {
      return false;
    }

    return recipe.authorId === userId;
  },
});

// Create a new recipe (auth required)
export const createRecipe = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    ingredients: v.optional(v.string()),
    tags: v.array(v.string()),
    externalUrl: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to create recipes");
    }

    const user = await ctx.db.get(userId);
    const authorName = user?.name || "Anonymous";

    return await ctx.db.insert("recipes", {
      ...args,
      authorId: userId,
      authorName,
      isFavorite: false,
    });
  },
});

// Update an existing recipe (auth required, author only)
export const updateRecipe = mutation({
  args: {
    recipeId: v.id("recipes"),
    title: v.string(),
    content: v.string(),
    ingredients: v.optional(v.string()),
    tags: v.array(v.string()),
    externalUrl: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to update recipes");
    }

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe || recipe.authorId !== userId) {
      throw new Error("Recipe not found or access denied");
    }

    const { recipeId, ...updates } = args;
    await ctx.db.patch(recipeId, updates);
  },
});

// Delete a recipe (auth required, author only)
export const deleteRecipe = mutation({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to delete recipes");
    }

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe || recipe.authorId !== userId) {
      throw new Error("Recipe not found or access denied");
    }

    await ctx.db.delete(args.recipeId);
  },
});

// Toggle favorite status (auth required, author only)
export const toggleFavorite = mutation({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in");
    }

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe || recipe.authorId !== userId) {
      throw new Error("Recipe not found or access denied");
    }

    await ctx.db.patch(args.recipeId, {
      isFavorite: !recipe.isFavorite,
    });
  },
});

// Generate upload URL for recipe images (auth required)
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to upload images");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

// Get all unique tags from public recipes
export const getPublicTags = query({
  handler: async (ctx) => {
    const recipes = await ctx.db
      .query("recipes")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .collect();

    const tagSet = new Set<string>();
    recipes.forEach((recipe) => {
      recipe.tags.forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet).sort();
  },
});

// Get all unique tags for the current user's recipes
export const getUserTags = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const recipes = await ctx.db
      .query("recipes")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .collect();

    const tagSet = new Set<string>();
    recipes.forEach((recipe) => {
      recipe.tags.forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet).sort();
  },
});
