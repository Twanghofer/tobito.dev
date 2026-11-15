import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyRecipes",
  description:
    "Your personal cooking companion — save, organize, and discover recipes.",
  icons: {
    icon: [{ url: "/apps/recipes/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/apps/recipes/favicon.svg",
    apple: "/apps/recipes/favicon.svg",
  },
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
