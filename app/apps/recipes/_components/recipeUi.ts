import { cn } from "@/lib/utils";

export const recipeField = cn(
  "w-full h-10 px-3.5 rounded-lg border border-border/80 bg-background/60",
  "text-foreground placeholder:text-muted-foreground",
  "outline-none transition-[box-shadow,border-color,background-color] duration-200",
  "focus:border-primary/45 focus:ring-2 focus:ring-primary/20 focus:bg-background"
);

export const recipeTextarea = cn(
  recipeField,
  "h-auto py-3 resize-y min-h-[6.5rem] leading-relaxed"
);

export const recipeBtnPrimary = cn(
  "inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg",
  "bg-primary text-primary-foreground font-medium text-sm",
  "transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]",
  "disabled:opacity-50 disabled:pointer-events-none",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
);

export const recipeBtnSecondary = cn(
  "inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg",
  "border border-border bg-transparent text-foreground font-medium text-sm",
  "transition-all duration-200 hover:bg-muted active:scale-[0.98]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
);

export const recipeBtnGhost = cn(
  "inline-flex items-center justify-center gap-2 rounded-lg",
  "text-muted-foreground font-medium text-sm",
  "transition-colors duration-200 hover:text-foreground hover:bg-muted/70",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
);

export const recipeChip = cn(
  "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs",
  "bg-primary/12 text-primary transition-colors duration-200"
);

export const recipeLabel = "block text-sm font-medium text-foreground mb-2";
