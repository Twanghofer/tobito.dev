"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useQuery } from "convex-helpers/react/cache/hooks";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { formatTag } from "./formatTag";
import { RecipeContainer } from "./RecipeContainer";
import { RecipeViewSkeleton } from "./RecipeSkeletons";
import {
  recipeBtnGhost,
  recipeBtnSecondary,
  recipeChip,
} from "./recipeUi";

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
    } catch {
      toast.error("Failed to update favorite status");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe({ recipeId });
        toast.success("Recipe deleted");
        onBack();
      } catch {
        toast.error("Failed to delete recipe");
      }
    }
  };

  if (recipe === undefined) {
    return <RecipeViewSkeleton />;
  }

  if (recipe === null) {
    return (
      <RecipeContainer size="reading" className="py-16 text-center">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Recipe not found
        </h2>
        <button
          type="button"
          onClick={onBack}
          className={`${recipeBtnGhost} mt-4 px-3 py-2`}
        >
          ← Back to recipes
        </button>
      </RecipeContainer>
    );
  }

  return (
    <RecipeContainer size="reading" className="py-6 sm:py-8 pb-16">
      <article className="recipes-card overflow-hidden rounded-xl">
        <div className="border-b border-border/50 p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className={`${recipeBtnGhost} -ml-2 px-2 py-1.5`}
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            {canEdit && (
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`rounded-lg p-2 transition-colors ${
                    recipe.isFavorite
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  }`}
                  title={
                    recipe.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  aria-label={
                    recipe.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <svg
                    className="size-5"
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
                <button
                  type="button"
                  onClick={onEdit}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  title="Edit recipe"
                  aria-label="Edit recipe"
                >
                  <svg
                    className="size-5"
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
                  onClick={handleDelete}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                  title="Delete recipe"
                  aria-label="Delete recipe"
                >
                  <svg
                    className="size-5"
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

          <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
            {recipe.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time className="tabular-nums">
              Created {new Date(recipe._creationTime).toLocaleDateString()}
            </time>
            {recipe.isFavorite && (
              <span className="inline-flex items-center gap-1 text-primary">
                <svg
                  className="size-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorite
              </span>
            )}
          </div>
        </div>

        {recipe.imageUrl && (
          <div className="aspect-[16/9] bg-muted">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-7 p-5 sm:p-6">
          {recipe.tags.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Tags
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {recipe.tags.map((tag) => (
                  <span key={tag} className={recipeChip}>
                    {formatTag(tag)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {recipe.externalUrl && (
            <div>
              <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Original recipe
              </h2>
              <a
                href={recipe.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View original
              </a>
            </div>
          )}

          {recipe.ingredients && (
            <div>
              <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
                Ingredients
              </h2>
              <div className="rounded-lg bg-muted/60 px-4 py-3.5">
                <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                  {recipe.ingredients}
                </pre>
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
              {recipe.ingredients ? "Instructions" : "Recipe"}
            </h2>
            <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed text-pretty">
              {recipe.content}
            </pre>
          </div>

          {canEdit && (
            <div className="flex gap-2 border-t border-border/50 pt-5">
              <button type="button" onClick={onEdit} className={recipeBtnSecondary}>
                Edit recipe
              </button>
            </div>
          )}
        </div>
      </article>
    </RecipeContainer>
  );
}
