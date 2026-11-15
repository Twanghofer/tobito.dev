"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache/hooks";
import { useEffect, useState } from "react";
import { AuthPage } from "./_components/AuthPage";
import { RecipeApp } from "./_components/RecipeApp";
import { RecipeShell } from "./_components/RecipeShell";
import { AuthHeaderSkeleton } from "./_components/RecipeSkeletons";
import { recipeBtnPrimary } from "./_components/recipeUi";
import { SignOutButton } from "./_components/SignOutButton";

export default function App() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [appKey, setAppKey] = useState(0);

  // Leave the auth screen once Convex auth resolves after sign-in / sign-up.
  useEffect(() => {
    if (loggedInUser) {
      setShowAuthPage(false);
    }
  }, [loggedInUser]);

  const goHome = () => {
    setShowAuthPage(false);
    setAppKey((key) => key + 1);
  };

  if (showAuthPage && !loggedInUser) {
    return (
      <RecipeShell onHome={goHome}>
        <AuthPage onBack={() => setShowAuthPage(false)} />
      </RecipeShell>
    );
  }

  const headerRight =
    loggedInUser === undefined ? (
      <AuthHeaderSkeleton />
    ) : loggedInUser ? (
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-sm text-muted-foreground truncate max-w-[10rem]">
          {loggedInUser.name || "Signed in"}
        </span>
        <SignOutButton />
      </div>
    ) : (
      <button
        onClick={() => setShowAuthPage(true)}
        className={`${recipeBtnPrimary} h-9 px-3.5`}
      >
        Sign in
      </button>
    );

  return (
    <RecipeShell headerRight={headerRight} onHome={goHome}>
      <main className="flex-1">
        <RecipeApp key={appKey} onShowAuth={() => setShowAuthPage(true)} />
      </main>
    </RecipeShell>
  );
}
