import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

export function SiteShell({ children, className, centered }: SiteShellProps) {
  return (
    <div
      className={cn(
        "relative isolate min-h-dvh",
        centered && "flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
