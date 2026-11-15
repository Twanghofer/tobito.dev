import { ArrowLeft, MapPinned, Star } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects - tobito.dev",
  description:
    "Explore the projects I've built — real products and apps that showcase what I love to create.",
};

const apps = [
  {
    name: "Project Vivia",
    backgroundColor: "from-[#F47F6B] to-[#F47F6B]",
    favorite: true,
    comingSoon: true,
    description:
      "Day-by-day itineraries from real travelers — discover what's actually worth seeing in each destination, beyond the promoted spots.",
    icon: MapPinned,
  },
  {
    name: "LoL Arena Tracker",
    href: "https://lol-arena.tobito.dev",
    backgroundColor: "from-[#060A17] to-[#561325]",
    description:
      "A web app using the Riot Games API to track the performance of a LoL Arena player. Built with Next.js & Convex",
    icon: () => (
      <img src="https://lol-arena.tobito.dev/favicon.svg" className="size-24" />
    ),
    favorite: true,
  },
  {
    name: "MyRecipes",
    href: "/apps/recipes",
    icon: () => (
      <img
        src="/apps/recipes/favicon.svg"
        alt=""
        className="size-24 rounded-2xl"
      />
    ),
    backgroundColor: "from-[#EA580C] to-[#D14A08]",
    description:
      "Full-stack recipe hub with Convex auth, community recipes, personal collections, tagging and search.",
  },
];

const sortedApps = [...apps].sort((a, b) => {
  if (a.favorite && !b.favorite) return -1;
  if (!a.favorite && b.favorite) return 1;
  return 0;
});

export default function Projects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-7xl">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </Link>
          <h1 className="text-4xl leading-tight md:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-normal text-muted-foreground">
            Real products and apps I&apos;ve built and shipped.
          </p>
        </div>

        <div className="grid mt-11 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] ">
          {sortedApps.map((app) => {
            const Icon = app.icon;
            const isLinked = Boolean(app.href);
            return (
              <div
                key={app.name}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/60 backdrop-blur-lg shadow-lg transition-all duration-400 ${
                  isLinked
                    ? "hover:-translate-y-2 hover:border-border/70 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    : ""
                }`}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {app.image ? (
                    <>
                      <img
                        src={app.image}
                        alt={app.name}
                        className="object-cover absolute inset-0 size-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t via-background/20 from-background/90 to-transparent" />
                    </>
                  ) : (
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br ${app.backgroundColor}`}
                    >
                      <Icon className="size-20 text-white drop-shadow-xl" />
                    </div>
                  )}

                  <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                    {app.favorite && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/80 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm backdrop-blur">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        Favorite
                      </span>
                    )}
                    {app.comingSoon && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-200/80 px-3 py-1 text-xs font-semibold text-sky-900 shadow-sm backdrop-blur">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 px-6 pt-5 pb-8">
                  <div className="flex items-start justify-between gap-4">
                    {isLinked ? (
                      <Link href={app.href!}>
                        <h2 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                          {app.name}
                        </h2>
                      </Link>
                    ) : (
                      <h2 className="text-xl font-semibold text-foreground">
                        {app.name}
                      </h2>
                    )}
                    {isLinked && (
                      <ArrowLeft className="h-5 w-5 -scale-x-100 text-muted-foreground transition-all duration-400 group-hover:translate-x-1 group-hover:text-primary" />
                    )}
                  </div>
                  {app.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {app.description}
                    </p>
                  )}
                </div>

                {isLinked && (
                  <Link
                    href={app.href!}
                    className="absolute inset-0"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
