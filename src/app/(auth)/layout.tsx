import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/layout/wordmark";
import { clientPhotos } from "@/config/assets";

// Auth pages are never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AuthLayout({ children }: LayoutProps<"/">) {
  const photo = clientPhotos.blackOutfitWindow;
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Wordmark />
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-foreground/60 hover:text-foreground">
            <ArrowLeft aria-hidden className="size-4" /> Back to site
          </Link>
        </div>
        <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-16">
          {children}
        </main>
      </div>
      <div className="relative hidden overflow-hidden lg:block">
        <Image src={photo.src} alt={photo.alt} fill priority placeholder="blur" sizes="50vw" className="object-cover" style={{ objectPosition: photo.focus }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
      </div>
    </div>
  );
}
