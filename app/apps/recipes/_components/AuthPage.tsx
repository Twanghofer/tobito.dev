import { NewSignInForm } from "./NewSignInForm";

interface AuthPageProps {
  onBack?: () => void;
}

export function AuthPage({ onBack }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {onBack && (
          <div className="text-left">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to recipes
            </button>
          </div>
        )}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Recipe Collection
          </h2>
          <p className="text-muted-foreground mb-8">
            Your personal cooking companion
          </p>
        </div>
        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          <NewSignInForm />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Securely store and organize all your favorite recipes in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
