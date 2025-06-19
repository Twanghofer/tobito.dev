"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useState } from "react";
import { RecipeForm } from "./RecipeForm";
import { RecipeList } from "./RecipeList";
import { RecipeView } from "./RecipeView";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";
import { ViewToggle } from "./ViewToggle";

type View = "list" | "add" | "edit" | "view";
type RecipeView = "public" | "my";

interface RecipeAppProps {
  onShowAuth: () => void;
}

export function RecipeApp({ onShowAuth }: RecipeAppProps) {
  const [currentView, setCurrentView] = useState<View>("list");
  const [recipeView, setRecipeView] = useState<RecipeView>("public");
  const [selectedRecipeId, setSelectedRecipeId] =
    useState<Id<"recipes"> | null>(null);
  const [tagFilter, setTagFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loggedInUser = useQuery(api.auth.loggedInUser);

  // Get recipes based on current view
  const publicRecipes = useQuery(api.recipes.getPublicRecipes, {
    tagFilter: tagFilter || undefined,
    searchQuery: searchQuery || undefined,
  });

  const userRecipes = useQuery(
    api.recipes.getUserRecipes,
    loggedInUser
      ? {
          tagFilter: tagFilter || undefined,
          searchQuery: searchQuery || undefined,
        }
      : "skip"
  );

  // Get tags based on current view
  const publicTags = useQuery(api.recipes.getPublicTags);
  const userTags = useQuery(
    api.recipes.getUserTags,
    loggedInUser ? {} : "skip"
  );

  const recipes = recipeView === "public" ? publicRecipes : userRecipes;
  const tags = recipeView === "public" ? publicTags : userTags;

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
                currentView={recipeView}
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
          tags={tags || []}
          selectedTag={tagFilter}
          onTagSelect={setTagFilter}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Recipe List */}
      <RecipeList
        recipes={recipes || []}
        onViewRecipe={handleViewRecipe}
        onEditRecipe={handleEditRecipe}
        hasFilters={!!tagFilter || !!searchQuery}
        onClearFilters={clearFilters}
        isLoggedIn={!!loggedInUser}
        currentView={recipeView}
      />

      {/* Call-to-action for unauthenticated users */}
      {!loggedInUser && (
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
