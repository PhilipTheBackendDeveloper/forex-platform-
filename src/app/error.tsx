"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Replace with the monitoring provider once chosen (docs/architecture/OPERATIONS.md).
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[32px] font-bold tracking-tight">Something went wrong.</h1>
      <p className="mt-3 max-w-md text-foreground/55">Please try again. If the problem continues, come back a little later.</p>
      <Button variant="light" size="lg" className="mt-8" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
