interface ViewToggleProps {
  currentView: "public" | "my";
  onViewChange: (view: "public" | "my") => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div
      className="flex bg-muted rounded-lg p-1"
      role="tablist"
      aria-label="Recipe collection"
    >
      {(
        [
          { id: "public", label: "All" },
          { id: "my", label: "Mine" },
        ] as const
      ).map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={currentView === tab.id}
          onClick={() => onViewChange(tab.id)}
          className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currentView === tab.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
