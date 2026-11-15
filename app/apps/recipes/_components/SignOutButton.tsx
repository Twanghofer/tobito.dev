"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { recipeBtnSecondary } from "./recipeUi";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      type="button"
      className={`${recipeBtnSecondary} h-9 px-3.5`}
      onClick={() => void signOut()}
    >
      Sign out
    </button>
  );
}
