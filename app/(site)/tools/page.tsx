import { BackLink } from "@/components/site/BackLink";
import { Reveal } from "@/components/site/Reveal";
import { SiteShell } from "@/components/site/SiteShell";
import { ArrowLeft, Timer } from "lucide-react";
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
    <SiteShell>
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal as="header" delayMs={40}>
          <BackLink />
          <h1 className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
            Tools
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-normal text-muted-foreground">
            Small utilities and vibe-coded experiments — handy, not heavy.
          </p>
        </Reveal>

        <div className="mt-11 grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Reveal
                key={tool.href}
                className="h-full"
                delayMs={140 + index * 80}
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-card/60 shadow-lg backdrop-blur-lg transition-all duration-400 hover:-translate-y-2 hover:border-border/70 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br transition-[transform,filter] duration-500 ease-out group-hover:scale-110 group-hover:brightness-110 ${tool.backgroundColor}`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]">
                          <Icon className="size-20 text-white drop-shadow-xl" />
                        </span>
                      </div>
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
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
