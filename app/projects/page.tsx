import { ArrowLeft, ChefHat, Sparkles, Timer } from "lucide-react";
import Link from "next/link";

const apps = [
  {
    name: "MyRecipes",
    href: "/apps/recipes",
    icon: ChefHat,
    emoji: "🍳",
    color: "from-orange-500 to-red-500",
    favorite: false,
    vibeCoded: true,
  },
  {
    name: "Interval Timer",
    href: "/tools/interval-timer",
    icon: Timer,
    emoji: "⏱️",
    color: "from-blue-500 to-cyan-500",
    favorite: false,
    vibeCoded: true,
  },
];

// Sort apps: favorites first, then regular, then vibe coded last
const sortedApps = [...apps].sort((a, b) => {
  if (a.favorite && !b.favorite) return -1;
  if (!a.favorite && b.favorite) return 1;
  if (!a.vibeCoded && b.vibeCoded) return -1;
  if (a.vibeCoded && !b.vibeCoded) return 1;
  return 0;
});

export default function Projects() {
  const vibeCodedApps = apps.filter((app) => app.vibeCoded);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
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
        </div>

        {/* Legend */}
        {vibeCodedApps.length > 0 && (
          <div className="mt-5 flex items-center gap-2 text-base text-muted-foreground">
            <Sparkles className="size-4" aria-label="Sparkles" />
            <span>
              <b>Vibe coded</b> — quick experiments and prototypes
            </span>
          </div>
        )}

        <div className="grid mt-10 grid-cols-3 sm:grid-cols-[repeat(auto-fill,minmax(min(9rem,15.5vw),1fr))] gap-8 justify-items-center">
          {sortedApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.href}
                className="group relative w-full flex flex-col items-center gap-2.5 transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <div
                  aria-hidden="true"
                  className={`relative w-full  aspect-square bg-gradient-to-br ${app.color} rounded-4xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200`}
                >
                  <Icon className="size-7/12 text-white" />
                  {app.vibeCoded && (
                    <div className="absolute top-2.5 border-2 right-2.5 translate-x-1/2 -translate-y-1/2 size-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Sparkles className="size-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Link
                  href={app.href}
                  className="text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors text-center max-w-[140px] truncate"
                >
                  <h2>{app.name}</h2>

                  {app.vibeCoded && (
                    <span className="sr-only">- Vibe coded</span>
                  )}
                </Link>

                <Link
                  href={app.href}
                  className="absolute inset-0"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
