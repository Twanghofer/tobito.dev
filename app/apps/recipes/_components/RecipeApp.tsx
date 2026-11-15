"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useEffect, useState } from "react";
import { RecipeContainer } from "./RecipeContainer";
import { RecipeForm } from "./RecipeForm";
import { RecipeList } from "./RecipeList";
import { RecipeView } from "./RecipeView";
import { recipeBtnPrimary } from "./recipeUi";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";
import { ViewToggle } from "./ViewToggle";

type View = "list" | "add" | "edit" | "view";
type RecipeView = "public" | "my";
type RecipeListData = FunctionReturnType<typeof api.recipes.getPublicRecipes>;

interface RecipeAppProps {
  onShowAuth: () => void;
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export function RecipeApp({ onShowAuth }: RecipeAppProps) {
  const [currentView, setCurrentView] = useState<View>("list");
  const [recipeView, setRecipeView] = useState<RecipeView>("public");
  const [selectedRecipeId, setSelectedRecipeId] =
    useState<Id<"recipes"> | null>(null);
  const [tagFilter, setTagFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 250);
  const [cachedRecipes, setCachedRecipes] = useState<{
    view: RecipeView;
    recipes: RecipeListData;
  } | null>(null);

  const loggedInUser = useQuery(api.auth.loggedInUser);

  // Fall back to public while auth is unknown or signed out so we never
  // treat a skipped user query as an empty list.
  const effectiveView =
    loggedInUser && recipeView === "my" ? "my" : "public";

  const publicRecipes = useQuery(api.recipes.getPublicRecipes, {
    tagFilter: tagFilter || undefined,
    searchQuery: debouncedSearchQuery || undefined,
  });

  const userRecipes = useQuery(
    api.recipes.getUserRecipes,
    loggedInUser
      ? {
          tagFilter: tagFilter || undefined,
          searchQuery: debouncedSearchQuery || undefined,
        }
      : "skip"
  );

  const publicTags = useQuery(api.recipes.getPublicTags);
  const userTags = useQuery(
    api.recipes.getUserTags,
    loggedInUser ? {} : "skip"
  );

  const recipes = effectiveView === "public" ? publicRecipes : userRecipes;
  const tags = effectiveView === "public" ? publicTags : userTags;

  useEffect(() => {
    if (recipes !== undefined) {
      setCachedRecipes({ view: effectiveView, recipes });
    }
  }, [recipes, effectiveView]);

  // Keep prior results while filters refetch; only skeleton on true first load /
  // view switches with no cache for that view.
  const displayRecipes =
    recipes ??
    (cachedRecipes?.view === effectiveView ? cachedRecipes.recipes : undefined);
  const isLoadingRecipes = displayRecipes === undefined;

  const handleAddRecipe = () => {
    if (!loggedInUser) {
      onShowAuth();
      return;
    }
    setCurrentView("add");
    setSelectedRecipeId(null);
  };

  const handleEditRecipe = (recipeId: Id<"recipes">) => {
    if (!loggedInUser) {
      onShowAuth();
      return;
    }
    setCurrentView("edit");
    setSelectedRecipeId(recipeId);
  };

  const handleViewRecipe = (recipeId: Id<"recipes">) => {
    setCurrentView("view");
    setSelectedRecipeId(recipeId);
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedRecipeId(null);
  };

  const clearFilters = () => {
    setTagFilter("");
    setSearchQuery("");
  };

  const handleViewChange = (view: RecipeView) => {
    setRecipeView(view);
    clearFilters();
  };

  if (currentView === "add") {
    return (
      <RecipeForm onCancel={handleBackToList} onSuccess={handleBackToList} />
    );
  }

  if (currentView === "edit" && selectedRecipeId) {
    return (
      <RecipeForm
        recipeId={selectedRecipeId}
        onCancel={handleBackToList}
        onSuccess={handleBackToList}
      />
    );
  }

  if (currentView === "view" && selectedRecipeId) {
    return (
      <RecipeView
        recipeId={selectedRecipeId}
        onBack={handleBackToList}
        onEdit={() => handleEditRecipe(selectedRecipeId)}
      />
    );
  }

  return (
    <RecipeContainer className="py-6 sm:py-8 pb-16">
      <div className="mb-8 space-y-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-balance">
              {effectiveView === "my" ? "My recipes" : "Browse recipes"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {effectiveView === "my"
                ? "Your personal collection, ready when you cook."
                : "Discover dishes from the community."}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1 min-w-0">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {loggedInUser && (
              <ViewToggle
                currentView={effectiveView}
                onViewChange={handleViewChange}
              />
            )}
            <button onClick={handleAddRecipe} className={recipeBtnPrimary}>
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add recipe
            </button>
          </div>
        </div>

        <TagFilter
          tags={tags ?? []}
          selectedTag={tagFilter}
          onTagSelect={setTagFilter}
          onClearFilters={clearFilters}
          isLoading={tags === undefined}
        />
      </div>

      <RecipeList
        recipes={displayRecipes}
        isLoading={isLoadingRecipes}
        onViewRecipe={handleViewRecipe}
        onEditRecipe={handleEditRecipe}
        hasFilters={!!tagFilter || !!searchQuery}
        onClearFilters={clearFilters}
        isLoggedIn={!!loggedInUser}
        currentView={effectiveView}
      />

      {loggedInUser === null && (
        <div className="recipes-card mt-12 rounded-xl px-6 py-10 text-center sm:px-10">
          <h3 className="text-xl font-semibold tracking-tight text-foreground text-balance">
            Ready to save your own recipes?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground text-pretty">
            Create an account to build a personal collection you can cook from
            anytime.
          </p>
          <button
            type="button"
            onClick={onShowAuth}
            className={`${recipeBtnPrimary} mt-6 px-6`}
          >
            Create account
          </button>
        </div>
      )}
    </RecipeContainer>
  );
}
