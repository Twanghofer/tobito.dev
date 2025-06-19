import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  recipes: defineTable({
    title: v.string(),
    content: v.string(), // Flexible content - can be simple notes or detailed instructions
    ingredients: v.optional(v.string()), // Optional detailed ingredients
    imageId: v.optional(v.id("_storage")), // Optional recipe image
    tags: v.array(v.string()), // Tags for categorization
    externalUrl: v.optional(v.string()), // Optional link to external recipe
    authorId: v.optional(v.id("users")), // Author of the recipe (optional for public recipes)
    authorName: v.optional(v.string()), // Display name of the author
    isFavorite: v.optional(v.boolean()),
    isPublic: v.boolean(), // Whether the recipe is publicly visible
  })
    .index("by_public", ["isPublic"])
    .index("by_author", ["authorId"])
    .searchIndex("search_recipes", {
      searchField: "title",
      filterFields: ["isPublic"],
    }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
