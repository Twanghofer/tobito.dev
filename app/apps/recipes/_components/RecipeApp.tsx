"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { useEffect, useState } from "react";
import { RecipeForm } from "./RecipeForm";
import { RecipeList } from "./RecipeList";
import { RecipeView } from "./RecipeView";
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

  // Get recipes based on current view
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

  // Get tags based on current view
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
    <div className="max-w-6xl mx-auto p-4">
      {/* Header with search, filters, and view toggle */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex gap-2">
            {loggedInUser && (
              <ViewToggle
                currentView={effectiveView}
                onViewChange={handleViewChange}
              />
            )}
            <button
              onClick={handleAddRecipe}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
            >
              + Add Recipe
            </button>
          </div>
        </div>

        <TagFilter
          tags={tags ?? []}
          selectedTag={tagFilter}
          onTagSelect={setTagFilter}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Recipe List */}
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

      {/* Call-to-action for unauthenticated users (wait until auth resolves) */}
      {loggedInUser === null && (
        <div className="mt-12 text-center py-12 bg-card rounded-lg border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Ready to create your own recipes?
          </h3>
          <p className="text-muted-foreground mb-6">
            Create an account to start building your personal recipe collection
          </p>
          <button
            onClick={onShowAuth}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Create Account
          </button>
        </div>
      )}
    </div>
  );
}
