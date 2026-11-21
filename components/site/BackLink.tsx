import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BackLinkProps = {
  href?: string;
  className?: string;
  label?: string;
};

export function BackLink({
  href = "/",
  className,
  label = "Back",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary",
        className
      )}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span>{label}</span>
    </Link>
  );
}
