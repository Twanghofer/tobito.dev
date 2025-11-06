import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const links = [
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "About Me",
      href: "/about",
    },
    {
      name: "Contact",
      href: "mailto:hello@tobito.dev?subject=Hello%20from%20tobito.dev&body=Hey%20Tobi%2C%0A%0AI%20just%20visited%20your%20website%20and%20wanted%20to%20reach%20out...%0A%0ALooking%20forward%20to%20hearing%20from%20you%21",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-32">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>
              Welcome to{" "}
              <b>
                <i>tobito.dev</i>
              </b>
            </span>
          </div>

          <h1 className="text-5xl leading-tight md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Hey, I'm Tobi
          </h1>
        </div>

        <nav>
          <ul className="space-y-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group block">
                  <div className="flex items-center justify-between py-4 border-b border-border hover:border-primary/50 transition-colors">
                    <h2 className="text-3xl leading-tight md:text-5xl font-bold relative">
                      <span className="bg-gradient-to-r from-muted-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                        {link.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {link.name}
                      </span>
                    </h2>
                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-20 pt-8 border-t border-border text-center">
          <a
            href="https://github.com/tobitodotdev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              className="w-4 h-4"
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
        </div>
      </div>
    </div>
  );
}
