"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

interface RecipeViewProps {
  recipeId: Id<"recipes">;
  onBack: () => void;
  onEdit: () => void;
}

export function RecipeView({ recipeId, onBack, onEdit }: RecipeViewProps) {
  const recipe = useQuery(api.recipes.getRecipe, { recipeId });
  const canEdit = useQuery(api.recipes.canEditRecipe, { recipeId });
  const toggleFavorite = useMutation(api.recipes.toggleFavorite);
  const deleteRecipe = useMutation(api.recipes.deleteRecipe);

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite({ recipeId });
    } catch (error) {
      toast.error("Failed to update favorite status");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe({ recipeId });
        toast.success("Recipe deleted");
        onBack();
      } catch (error) {
        toast.error("Failed to delete recipe");
      }
    }
  };

  if (recipe === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (recipe === null) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Recipe not found
          </h2>
          <button
            onClick={onBack}
            className="text-primary hover:text-primary/80 font-medium"
          >
            ← Back to recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to recipes
            </button>
            {canEdit && (
              <div className="flex gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-lg transition-colors ${
                    recipe.isFavorite
                      ? "text-destructive hover:text-destructive/80 bg-destructive/10"
                      : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  }`}
                  title={
                    recipe.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <svg
                    className="w-6 h-6"
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
                <button
                  onClick={onEdit}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  title="Edit recipe"
                >
                  <svg
                    className="w-6 h-6"
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
                  onClick={handleDelete}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  title="Delete recipe"
                >
                  <svg
                    className="w-6 h-6"
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

          <h1 className="text-3xl font-bold text-foreground mb-2">
            {recipe.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Created {new Date(recipe._creationTime).toLocaleDateString()}
            </span>
            {recipe.isFavorite && (
              <span className="flex items-center gap-1 text-destructive">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorite
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        {recipe.imageUrl && (
          <div className="aspect-video bg-muted">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External Link */}
          {recipe.externalUrl && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Original Recipe
              </h3>
              <a
                href={recipe.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
                View original recipe
              </a>
            </div>
          )}

          {/* Ingredients */}
          {recipe.ingredients && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Ingredients
              </h3>
              <div className="bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-foreground font-sans">
                  {recipe.ingredients}
                </pre>
              </div>
            </div>
          )}

          {/* Instructions/Content */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {recipe.ingredients ? "Instructions" : "Recipe"}
            </h3>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-foreground font-sans leading-relaxed">
                {recipe.content}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
