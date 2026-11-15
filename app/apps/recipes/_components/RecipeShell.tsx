import { cn } from "@/lib/utils";
import Link from "next/link";
import { RecipeContainer } from "./RecipeContainer";
import { RecipeLogo } from "./RecipeLogo";

interface RecipeShellProps {
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  showHeader?: boolean;
  onHome?: () => void;
  className?: string;
}

export function RecipeShell({
  children,
  headerRight,
  showHeader = true,
  onHome,
  className,
}: RecipeShellProps) {
  return (
    <div className={cn("recipes-shell flex min-h-dvh flex-col", className)}>
      {showHeader && (
        <header className="recipes-header sticky top-0 z-20">
          <RecipeContainer className="flex h-14 items-center justify-between gap-4">
            <Link
              href="/apps/recipes"
              onClick={onHome}
              className="flex min-w-0 items-center gap-2.5 rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RecipeLogo className="size-7 shrink-0" />
              <span className="text-base font-semibold tracking-tight text-foreground">
                MyRecipes
              </span>
            </Link>
            {headerRight ? (
              <div className="flex items-center gap-3 shrink-0">{headerRight}</div>
            ) : null}
          </RecipeContainer>
        </header>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
