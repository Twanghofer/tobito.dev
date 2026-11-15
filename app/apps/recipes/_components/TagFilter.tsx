import { formatTag } from "./formatTag";

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

export function TagFilter({
  tags,
  selectedTag,
  onTagSelect,
  onClearFilters,
  isLoading = false,
}: TagFilterProps) {
  if (isLoading) {
    return (
      <div
        className="flex flex-wrap gap-2 items-center"
        aria-busy="true"
        aria-label="Loading tags"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="recipes-skeleton h-7 rounded-md"
            style={{ width: `${3 + (i % 3)}rem` }}
          />
        ))}
      </div>
    );
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground mr-1">
        Tags
      </span>
      <button
        type="button"
        onClick={() => onTagSelect("")}
        className={`px-2.5 py-1 rounded-md text-sm transition-colors ${
          selectedTag === ""
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:text-foreground"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          type="button"
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-2.5 py-1 rounded-md text-sm transition-colors ${
            selectedTag === tag
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {formatTag(tag)}
        </button>
      ))}
      {selectedTag && (
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm text-muted-foreground hover:text-foreground ml-1 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
