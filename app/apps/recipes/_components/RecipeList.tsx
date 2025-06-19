"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { toast } from "sonner";

interface RecipeListProps {
  recipes: FunctionReturnType<typeof api.recipes.getPublicRecipes>;
  onViewRecipe: (recipeId: Id<"recipes">) => void;
  onEditRecipe: (recipeId: Id<"recipes">) => void;
  hasFilters: boolean;
  onClearFilters: () => void;
  isLoggedIn: boolean;
  currentView: "public" | "my";
}

export function RecipeList({
  recipes,
  onViewRecipe,
  onEditRecipe,
  hasFilters,
  onClearFilters,
  isLoggedIn,
  currentView,
}: RecipeListProps) {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const toggleFavorite = useMutation(api.recipes.toggleFavorite);
  const deleteRecipe = useMutation(api.recipes.deleteRecipe);

  const handleToggleFavorite = async (recipeId: Id<"recipes">) => {
    try {
      await toggleFavorite({ recipeId });
    } catch (error) {
      toast.error("Failed to update favorite status");
    }
  };

  const handleDeleteRecipe = async (recipeId: Id<"recipes">) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe({ recipeId });
        toast.success("Recipe deleted");
      } catch (error) {
        toast.error("Failed to delete recipe");
      }
    }
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          {hasFilters ? "No recipes found" : "No recipes yet"}
        </h3>
        <p className="text-muted-foreground mb-4">
          {hasFilters
            ? "Try adjusting your search or filters"
            : "Start building your recipe collection by adding your first recipe"}
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300"
        >
          {/* Recipe Image */}
          <div className="aspect-video bg-muted overflow-hidden">
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onViewRecipe(recipe._id)}
              />
            )}
          </div>

          <div className="p-4">
            {/* Title and Favorite */}
            <div className="flex items-start justify-between mb-2">
              <h3
                className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors line-clamp-2 flex-1"
                onClick={() => onViewRecipe(recipe._id)}
              >
                {recipe.title}
              </h3>
              {isLoggedIn && loggedInUser?._id === recipe.authorId && (
                <button
                  onClick={() => handleToggleFavorite(recipe._id)}
                  className={`ml-2 p-1 rounded ${
                    recipe.isFavorite
                      ? "text-destructive hover:text-destructive/80"
                      : "text-muted-foreground hover:text-destructive"
                  } transition-colors`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={recipe.isFavorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Content Preview */}
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {recipe.content}
            </p>

            {/* Tags */}
            {recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {recipe.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{recipe.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* External Link */}
            {recipe.externalUrl && (
              <div className="mb-3">
                <a
                  href={recipe.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View original
                </a>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">
                {new Date(recipe._creationTime).toLocaleDateString()}
              </span>
              {isLoggedIn && loggedInUser?._id === recipe.authorId && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditRecipe(recipe._id)}
                    className="text-muted-foreground hover:text-primary p-1 rounded transition-colors"
                    title="Edit recipe"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(recipe._id)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                    title="Delete recipe"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
