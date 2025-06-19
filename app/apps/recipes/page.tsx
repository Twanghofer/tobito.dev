"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import { AuthPage } from "./_components/AuthPage";
import { RecipeApp } from "./_components/RecipeApp";
import { SignOutButton } from "./_components/SignOutButton";

export default function App() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const [showAuthPage, setShowAuthPage] = useState(false);

  // Show auth page if explicitly requested
  if (showAuthPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <AuthPage onBack={() => setShowAuthPage(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm h-16 flex justify-between items-center border-b border-border shadow-sm px-4">
        <h2 className="text-xl font-semibold text-primary">
          Recipe Collection
        </h2>
        <div className="flex items-center gap-4">
          {loggedInUser === undefined ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          ) : loggedInUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Welcome, {loggedInUser.name || "User"}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              <button
                onClick={() => setShowAuthPage(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Sign In / Create Account
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1">
        <Content onShowAuth={() => setShowAuthPage(true)} />
      </main>
    </div>
  );
}

function Content({ onShowAuth }: { onShowAuth: () => void }) {
  return (
    <div className="w-full">
      <RecipeApp onShowAuth={onShowAuth} />
    </div>
  );
}
