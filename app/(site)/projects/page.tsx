import { BackLink } from "@/components/site/BackLink";
import { Reveal } from "@/components/site/Reveal";
import { SiteShell } from "@/components/site/SiteShell";
import { ArrowLeft, MapPinned, Star, type LucideIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import type { ComponentType } from "react";

export const metadata: Metadata = {
  title: "Projects - tobito.dev",
  description:
    "Explore the projects I've built — real products and apps that showcase what I love to create.",
};

type App = {
  name: string;
  backgroundColor: string;
  description: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  href?: string;
  favorite?: boolean;
  comingSoon?: boolean;
  image?: string;
};

const apps: App[] = [
  {
    name: "Project Vivia",
    backgroundColor: "from-[#F47F6B] to-[#F47F6B]",
    favorite: false,
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
    name: "Draftlane",
    href: "https://lol-draftlane.tobito.dev",
    backgroundColor: "from-[#1a1f1e] to-[#2f6f6b]",
    description:
      "Personalized champ-select recommendations for ranked — your pool, your stats, this board, with explainable reasons.",
    icon: () => (
      <img
        src="https://lol-draftlane.tobito.dev/favicon.svg"
        alt=""
        className="size-24 rounded-2xl"
      />
    ),
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
    backgroundColor: "from-[#7C2D12] to-[#EA580C]",
    description:
      "Full-stack recipe hub with Convex auth, community recipes, personal collections, tagging and search.",
  },
  {
    name: "Product Configurator",
    href: "https://selector.fritsjurgens.com/",
    backgroundColor: "from-[#252525] to-[#171714]",
    favorite: true,
    description:
      "Interactive product configurator for pivot door systems — configure hinges, dimensions, and finishes with live visualization.",
    icon: () => (
      <img
        src="https://selector.fritsjurgens.com/icon-192x192.png"
        alt=""
        className="size-24 rounded-2xl"
      />
    ),
  },
];

const sortedApps = [...apps].sort((a, b) => {
  if (a.comingSoon && !b.comingSoon) return -1;
  if (!a.comingSoon && b.comingSoon) return 1;
  if (a.favorite && !b.favorite) return -1;
  if (!a.favorite && b.favorite) return 1;
  return 0;
});

export default function Projects() {
  return (
    <SiteShell>
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal as="header" delayMs={40}>
          <BackLink />
          <h1 className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
            Projects
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-normal text-muted-foreground">
            Real products and apps I&apos;ve built and shipped.
          </p>
        </Reveal>

        <div className="mt-11 grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
          {sortedApps.map((app, index) => {
            const Icon = app.icon;
            const isLinked = Boolean(app.href);
            return (
              <Reveal
                key={app.name}
                className="h-full"
                delayMs={140 + index * 80}
              >
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/60 shadow-lg backdrop-blur-lg transition-all duration-400 hover:-translate-y-2 hover:border-border/70 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    {app.image ? (
                      <>
                        <img
                          src={app.image}
                          alt={app.name}
                          className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      </>
                    ) : (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 overflow-hidden"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br transition-[transform,filter] duration-500 ease-out group-hover:scale-110 group-hover:brightness-110 ${app.backgroundColor}`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="inline-flex transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]">
                            <Icon className="size-20 text-white drop-shadow-xl" />
                          </span>
                        </div>
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
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur">
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
                        <h2 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                          {app.name}
                        </h2>
                      )}
                      {isLinked && (
                        <ArrowLeft className="h-5 w-5 -scale-x-100 text-muted-foreground transition-all duration-400 group-hover:translate-x-1 group-hover:text-primary" />
                      )}
                    </div>
                    {app.description && (
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
