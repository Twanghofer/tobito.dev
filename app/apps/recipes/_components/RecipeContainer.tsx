import { cn } from "@/lib/utils";

const sizeClass = {
  wide: "max-w-6xl",
  reading: "max-w-4xl",
  narrow: "max-w-md",
} as const;

interface RecipeContainerProps {
  children: React.ReactNode;
  size?: keyof typeof sizeClass;
  className?: string;
  as?: "div" | "main" | "section" | "header";
}

export function RecipeContainer({
  children,
  size = "wide",
  className,
  as: Tag = "div",
}: RecipeContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        sizeClass[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
