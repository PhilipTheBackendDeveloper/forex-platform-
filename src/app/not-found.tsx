import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="absolute top-1/4 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <p className="relative text-[clamp(96px,20vw,200px)] leading-none font-black tracking-tighter text-foreground/10">404</p>
      <h1 className="relative mt-2 text-[32px] font-bold tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="relative mt-3 max-w-md text-foreground/55">The link may be broken or the page may have moved.</p>
      <Link href="/" className={buttonClasses("light", "lg", "relative mt-10")}>
        Back to home
      </Link>
    </main>
  );
}
