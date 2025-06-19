interface ViewToggleProps {
  currentView: "public" | "my";
  onViewChange: (view: "public" | "my") => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex bg-muted rounded-lg p-1">
      <button
        onClick={() => onViewChange("public")}
        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
          currentView === "public"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        All Recipes
      </button>
      <button
        onClick={() => onViewChange("my")}
        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
          currentView === "my"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        My Recipes
      </button>
    </div>
  );
}
