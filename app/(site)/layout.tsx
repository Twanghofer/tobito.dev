import { AmbientField } from "@/components/site/AmbientField";
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AmbientField />
      {children}
    </>
  );
}
