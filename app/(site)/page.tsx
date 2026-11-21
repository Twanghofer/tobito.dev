import { Reveal } from "@/components/site/Reveal";
import { SiteShell } from "@/components/site/SiteShell";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const links = [
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Tools",
      href: "/tools",
    },
    {
      name: "Contact",
      href: "mailto:hello@tobito.dev?subject=Hello%20from%20tobito.dev&body=Hey%20Tobi%2C%0A%0AI%20just%20visited%20your%20website%20and%20wanted%20to%20reach%20out...%0A%0ALooking%20forward%20to%20hearing%20from%20you%21",
    },
  ];

  return (
    <SiteShell centered>
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Reveal className="mb-28 text-center md:mb-32" delayMs={40}>
          <p className="mb-5 text-sm tracking-[0.22em] text-muted-foreground uppercase">
            tobito.dev
          </p>
          <h1 className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-5xl leading-tight font-bold text-transparent md:text-7xl lg:text-8xl">
            Hey, I&apos;m Tobi
          </h1>
        </Reveal>

        <nav>
          <ul className="space-y-8">
            {links.map((link, index) => (
              <Reveal as="li" key={link.href} delayMs={220 + index * 90}>
                <Link href={link.href} className="group block">
                  <div className="relative flex items-center justify-between border-b border-border py-4 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary/80 after:transition-transform after:duration-400 after:ease-in-out after:content-[''] group-hover:after:scale-x-100 group-active:translate-x-0.5">
                    <h2 className="relative text-3xl leading-tight font-bold transition-transform duration-300 ease-out group-hover:translate-x-2 md:text-5xl">
                      <span className="bg-gradient-to-r from-muted-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                        {link.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        {link.name}
                      </span>
                    </h2>
                    <ArrowRight className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary md:h-8 md:w-8" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </nav>

        <Reveal
          className="mt-20 border-t border-border pt-8 text-center"
          delayMs={520}
        >
          <a
            href="https://github.com/tobitodotdev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
        </Reveal>
      </div>
    </SiteShell>
  );
}
