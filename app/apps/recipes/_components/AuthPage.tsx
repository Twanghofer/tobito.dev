import { NewSignInForm } from "./NewSignInForm";
import { RecipeContainer } from "./RecipeContainer";
import { recipeBtnGhost } from "./recipeUi";

interface AuthPageProps {
  onBack?: () => void;
}

export function AuthPage({ onBack }: AuthPageProps) {
  return (
    <RecipeContainer size="form" className="py-6 sm:py-8 pb-16 space-y-6">
      {onBack && (
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
          Back to recipes
        </button>
      )}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
          Your recipe collection
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
          Sign in or create an account to save and organize your favorite
          recipes.
        </p>
      </div>

      <div className="recipes-card rounded-xl p-6 sm:p-7">
        <NewSignInForm />
      </div>
    </RecipeContainer>
  );
}
