import { cn } from "@/lib/utils";
import { RecipeContainer } from "./RecipeContainer";

function Bone({ className }: { className?: string }) {
  return <div className={cn("recipes-skeleton rounded-md", className)} />;
}

export function AuthHeaderSkeleton() {
  return (
    <div
      className="flex items-center gap-3"
      aria-busy="true"
      aria-label="Loading account"
    >
      <Bone className="h-4 w-24 hidden sm:block" />
      <Bone className="h-9 w-20 rounded-lg" />
    </div>
  );
}

export function RecipeListSkeleton() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      aria-busy="true"
      aria-label="Loading recipes"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="recipes-card overflow-hidden rounded-xl">
          <Bone className="aspect-[16/10] rounded-none" />
          <div className="p-4 space-y-3">
            <Bone className="h-5 w-3/4" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-2/3" />
            <div className="flex gap-2 pt-1">
              <Bone className="h-5 w-14 rounded-md" />
              <Bone className="h-5 w-16 rounded-md" />
            </div>
            <div className="pt-3 border-t border-border/50">
              <Bone className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecipeViewSkeleton() {
  return (
    <RecipeContainer size="reading" className="py-6 sm:py-8">
      <div
        className="recipes-card overflow-hidden rounded-xl"
        aria-busy="true"
        aria-label="Loading recipe"
      >
        <div className="p-5 sm:p-6 space-y-4 border-b border-border/50">
          <Bone className="h-4 w-28" />
          <Bone className="h-8 w-4/5" />
          <Bone className="h-4 w-36" />
        </div>
        <Bone className="aspect-[16/9] rounded-none" />
        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex gap-2">
            <Bone className="h-6 w-14 rounded-md" />
            <Bone className="h-6 w-16 rounded-md" />
            <Bone className="h-6 w-12 rounded-md" />
          </div>
          <div className="space-y-2">
            <Bone className="h-5 w-24" />
            <Bone className="h-24 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Bone className="h-5 w-28" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-5/6" />
            <Bone className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </RecipeContainer>
  );
}

export function RecipeFormSkeleton() {
  return (
    <RecipeContainer size="reading" className="py-6 sm:py-8">
      <div
        className="recipes-card rounded-xl p-5 sm:p-7 space-y-5"
        aria-busy="true"
        aria-label="Loading form"
      >
        <div className="flex items-center justify-between">
          <Bone className="h-7 w-44" />
          <Bone className="size-9 rounded-lg" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Bone className="h-4 w-24" />
            <Bone
              className={cn("w-full rounded-lg", i === 1 ? "h-28" : "h-10")}
            />
          </div>
        ))}
        <div className="flex gap-3 pt-1">
          <Bone className="h-10 flex-1 rounded-lg" />
          <Bone className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </RecipeContainer>
  );
}
