interface RecipeLogoProps {
  className?: string;
  title?: string;
}

/** Simple chef-hat mark for MyRecipes branding. */
export function RecipeLogo({
  className = "size-8",
  title = "MyRecipes",
}: RecipeLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <rect width="32" height="32" rx="8" fill="#EA580C" />
      <path
        fill="#fff"
        d="M8.5 20.5h15a1.5 1.5 0 0 1 0 3h-15a1.5 1.5 0 0 1 0-3Z"
      />
      <path
        fill="#fff"
        d="M9 20.5c0-4.2 2.2-7.5 7-7.5s7 3.3 7 7.5H9Z"
      />
      <circle cx="12.5" cy="16" r="1.25" fill="#EA580C" />
      <circle cx="16" cy="14.5" r="1.25" fill="#EA580C" />
      <circle cx="19.5" cy="16" r="1.25" fill="#EA580C" />
    </svg>
  );
}
