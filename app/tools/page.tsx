import { ArrowLeft, Sparkles, Timer } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools - tobito.dev",
  description:
    "Small tools and vibe-coded experiments — handy utilities, not full products.",
};

const tools = [
  {
    name: "Interval Timer",
    href: "/tools/interval-timer",
    icon: Timer,
    backgroundColor: "from-destructive to-destructive/50",
    description:
      "Minimalist workout timer with sharable presets and quick adjustments for any routine.",
  },
];

export default function Tools() {
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
            Tools
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-normal text-muted-foreground">
            Small utilities and vibe-coded experiments — handy, not heavy.
          </p>
        </div>

        <div className="grid mt-11 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] ">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.href}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/60 backdrop-blur-lg hover:-translate-y-2 shadow-lg transition-all duration-400 hover:border-border/70 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br ${tool.backgroundColor}`}
                  >
                    <Icon className="size-20 text-white drop-shadow-xl" />
                  </div>

                  <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                      <Sparkles className="h-3.5 w-3.5" />
                      Vibe coded
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 px-6 pt-5 pb-8">
                  <div className="flex items-start justify-between gap-4">
                    <Link href={tool.href}>
                      <h2 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        {tool.name}
                      </h2>
                    </Link>
                    <ArrowLeft className="h-5 w-5 -scale-x-100 text-muted-foreground transition-all duration-400 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  {tool.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {tool.description}
                    </p>
                  )}
                </div>

                <Link
                  href={tool.href}
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
