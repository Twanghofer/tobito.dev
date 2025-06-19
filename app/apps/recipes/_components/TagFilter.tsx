interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  onClearFilters: () => void;
}

export function TagFilter({
  tags,
  selectedTag,
  onTagSelect,
  onClearFilters,
}: TagFilterProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium text-foreground">
        Filter by tag:
      </span>
      <button
        onClick={() => onTagSelect("")}
        className={`px-3 py-1 rounded-full text-sm transition-colors ${
          selectedTag === ""
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTag === tag
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {tag}
        </button>
      ))}
      {selectedTag && (
        <button
          onClick={onClearFilters}
          className="text-sm text-muted-foreground hover:text-foreground ml-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
