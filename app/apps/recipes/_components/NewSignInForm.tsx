"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";

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
          flow === "signIn" ? "Welcome back!" : "Account created successfully!"
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
      {/* Tab Navigation */}
      <div className="flex mb-6 bg-muted rounded-lg p-1">
        <button
          type="button"
          onClick={() => setActiveTab("signIn")}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "signIn"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Existing Users – Sign In
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("signUp")}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "signUp"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          New Users – Create Account
        </button>
      </div>

      {/* Sign In Form */}
      {activeTab === "signIn" && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Welcome Back
            </h3>
            <p className="text-sm text-muted-foreground">
              Sign in to access your recipe collection
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e, "signIn")}
          >
            <div>
              <label
                htmlFor="signin-email"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Email Address
              </label>
              <input
                id="signin-email"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="signin-password"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Password
              </label>
              <input
                id="signin-password"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      )}

      {/* Sign Up Form */}
      {activeTab === "signUp" && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Create Your Account
            </h3>
            <p className="text-sm text-muted-foreground">
              Join to start building your personal recipe collection
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e, "signUp")}
          >
            <div>
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Email Address
              </label>
              <input
                id="signup-email"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Password
              </label>
              <input
                id="signup-password"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                type="password"
                name="password"
                placeholder="Create a password (min. 6 characters)"
                minLength={6}
                required
              />
            </div>
            <div className="text-xs text-muted-foreground">
              By creating an account, you agree to store and manage your recipes
              securely.
            </div>
            <button
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
