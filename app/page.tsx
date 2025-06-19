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

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm mostly making web things. Occasionally making sense.
          </p>
        </div>

        {/* Live Tools Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-primary" />
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
                      Vibe-coded and fully functional
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
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS, and good vibes ✨
          </p>
        </div>
      </div>
    </div>
  );
}
