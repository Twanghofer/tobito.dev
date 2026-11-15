"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { toast } from "sonner";
import { formatTag } from "./formatTag";
import { RecipeListSkeleton } from "./RecipeSkeletons";
import { recipeBtnGhost, recipeChip } from "./recipeUi";

interface RecipeListProps {
  recipes: FunctionReturnType<typeof api.recipes.getPublicRecipes> | undefined;
  isLoading: boolean;
  onViewRecipe: (recipeId: Id<"recipes">) => void;
  onEditRecipe: (recipeId: Id<"recipes">) => void;
  hasFilters: boolean;
  onClearFilters: () => void;
  isLoggedIn: boolean;
  currentView: "public" | "my";
}

export function RecipeList({
  recipes,
  isLoading,
  onViewRecipe,
  onEditRecipe,
  hasFilters,
  onClearFilters,
  isLoggedIn,
}: RecipeListProps) {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const toggleFavorite = useMutation(api.recipes.toggleFavorite);
  const deleteRecipe = useMutation(api.recipes.deleteRecipe);

  const handleToggleFavorite = async (recipeId: Id<"recipes">) => {
    try {
      await toggleFavorite({ recipeId });
    } catch {
      toast.error("Failed to update favorite status");
    }
  };

  const handleDeleteRecipe = async (recipeId: Id<"recipes">) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe({ recipeId });
        toast.success("Recipe deleted");
      } catch {
        toast.error("Failed to delete recipe");
      }
    }
  };

  if (isLoading || recipes === undefined) {
    return <RecipeListSkeleton />;
  }

  if (recipes.length === 0) {
    return (
      <div className="recipes-card rounded-xl px-6 py-14 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {hasFilters ? "No recipes found" : "No recipes yet"}
        </h3>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground text-pretty">
          {hasFilters
            ? "Try a different search or clear your filters."
            : "Add your first recipe to start building your collection."}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className={`${recipeBtnGhost} mt-4 px-3 py-2`}
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <article
          key={recipe._id}
          className="recipes-card recipes-card-interactive relative flex flex-col overflow-hidden rounded-xl"
        >
          <div className="aspect-[16/10] bg-muted overflow-hidden">
            {recipe.imageUrl ? (
              <img
                src={recipe.imageUrl}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
                <svg
                  className="size-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.25}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="flex-1 text-base font-semibold tracking-tight text-foreground line-clamp-2">
                <a
                  href={`#recipe-${recipe._id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onViewRecipe(recipe._id);
                  }}
                  className="hover:text-primary transition-colors after:absolute after:inset-0"
                >
                  {recipe.title}
                </a>
              </h3>
              {isLoggedIn && loggedInUser?._id === recipe.authorId && (
                <button
                  type="button"
                  onClick={() => handleToggleFavorite(recipe._id)}
                  className={`relative z-10 -mr-1 -mt-1 rounded-lg p-1.5 transition-colors ${
                    recipe.isFavorite
                      ? "text-primary hover:text-primary/80"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  aria-label={
                    recipe.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <svg
                    className="size-4"
                    fill={recipe.isFavorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
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

            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              {recipe.content}
            </p>

            {recipe.tags.length > 0 && (
              <div className="mt-auto mb-3 flex flex-wrap items-center gap-1.5">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={recipeChip}>
                    {formatTag(tag)}
                  </span>
                ))}
                {recipe.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{recipe.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {recipe.externalUrl && (
              <div className="relative z-10 mb-3">
                <a
                  href={recipe.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <svg
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Original
                </a>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-border/50 pt-3">
              <time className="text-xs text-muted-foreground tabular-nums">
                {new Date(recipe._creationTime).toLocaleDateString()}
              </time>
              {isLoggedIn && loggedInUser?._id === recipe.authorId && (
                <div className="relative z-10 flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => onEditRecipe(recipe._id)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Edit recipe"
                    aria-label="Edit recipe"
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
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
                    type="button"
                    onClick={() => handleDeleteRecipe(recipe._id)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                    title="Delete recipe"
                    aria-label="Delete recipe"
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
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
        </article>
      ))}
    </div>
  );
}
