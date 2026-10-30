import type { ReactNode } from "react";

/** Header + main landmark for landing pages, keeping the header outside `<main>`. */
export function LandingShell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <>
      {header}
      <main id="main" className="relative overflow-x-clip">
        {children}
      </main>
    </>
  );
}
