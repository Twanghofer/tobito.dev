"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { recipeBtnPrimary, recipeField, recipeLabel } from "./recipeUi";

export function NewSignInForm() {
  const { signIn } = useAuthActions();
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent, flow: "signIn" | "signUp") => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("flow", flow);

    void signIn("password", formData)
      .then(() => {
        toast.success(
          flow === "signIn" ? "Welcome back" : "Account created"
        );
      })
      .catch((error) => {
        let toastTitle = "";
        if (error.message.includes("Invalid password")) {
          toastTitle = "Invalid password. Please try again.";
        } else if (error.message.includes("User already exists")) {
          toastTitle =
            "An account with this email already exists. Try signing in instead.";
        } else if (error.message.includes("User not found")) {
          toastTitle =
            "No account found with this email. Try creating an account instead.";
        } else {
          toastTitle =
            flow === "signIn"
              ? "Sign in failed. Please check your credentials."
              : "Account creation failed. Please try again.";
        }
        toast.error(toastTitle);
        setSubmitting(false);
      });
  };

  return (
    <div className="w-full">
      <div
        className="mb-6 flex rounded-lg bg-muted p-1"
        role="tablist"
        aria-label="Account"
      >
        {(
          [
            { id: "signIn", label: "Sign in" },
            { id: "signUp", label: "Create account" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "signIn" && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Welcome back
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Sign in to access your recipe collection
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e, "signIn")}
          >
            <div>
              <label htmlFor="signin-email" className={recipeLabel}>
                Email
              </label>
              <input
                id="signin-email"
                className={recipeField}
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="signin-password" className={recipeLabel}>
                Password
              </label>
              <input
                id="signin-password"
                className={recipeField}
                type="password"
                name="password"
                placeholder="Your password"
                required
              />
            </div>
            <button
              className={`w-full ${recipeBtnPrimary}`}
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "signUp" && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Create your account
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Start building your personal recipe collection
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e, "signUp")}
          >
            <div>
              <label htmlFor="signup-email" className={recipeLabel}>
                Email
              </label>
              <input
                id="signup-email"
                className={recipeField}
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="signup-password" className={recipeLabel}>
                Password
              </label>
              <input
                id="signup-password"
                className={recipeField}
                type="password"
                name="password"
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>
            <button
              className={`w-full ${recipeBtnPrimary}`}
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
