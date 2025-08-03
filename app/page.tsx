import {
  ArrowRight,
  Lightbulb,
  Sparkles,
  Timer,
  User,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Welcome to my dev playground
          </div>

          <h1 className="text-4xl leading-tight md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Hey, I'm Tobi
          </h1>
        </div>

        {/* Live Tools Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            My latest additions
          </h2>

          <div className="space-y-4">
            <Link
              href="/tools/interval-timer"
              className="group block bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Timer className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      ⏱️ Interval Timer
                    </h3>
                    <p className="text-muted-foreground">
                      Vibe-coded, but fully functional
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/*   <Link
              href="/apps/recipes"
              className="group block bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      🍳 Recipe Collection
                    </h3>
                    <p className="text-muted-foreground">
                      Store and organize your favorite recipes
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link> */}
          </div>
        </div>

        {/* Placeholder Sections Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tools Section */}
          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">🧰 My Tools</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Handy utilities and tools I've built for fun and productivity.
            </p>
            <div className="text-xs text-muted-foreground/60">
              Coming soon...
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">💡 Projects</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Cool side projects and experiments I'm working on.
            </p>
            <div className="text-xs text-muted-foreground/60">
              Coming soon...
            </div>
          </div>

          {/* About Section */}
          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">👾 About Me</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Learn more about my journey, skills, and what makes me tick.
            </p>
            <div className="text-xs text-muted-foreground/60">
              Coming soon...
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <a
            href="https://github.com/twanghofer"
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
