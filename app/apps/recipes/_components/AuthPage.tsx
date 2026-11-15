import { NewSignInForm } from "./NewSignInForm";
import { RecipeContainer } from "./RecipeContainer";
import { recipeBtnGhost } from "./recipeUi";

interface AuthPageProps {
  onBack?: () => void;
}

export function AuthPage({ onBack }: AuthPageProps) {
  return (
    <div className="flex flex-1 items-center justify-center py-12">
      <RecipeContainer size="narrow" className="space-y-8">
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

        <div className="recipes-card rounded-xl p-6 sm:p-7">
          <NewSignInForm />
        </div>

        <p className="text-center text-sm text-muted-foreground text-pretty">
          Store and organize your favorite recipes in one place.
        </p>
      </RecipeContainer>
    </div>
  );
}
