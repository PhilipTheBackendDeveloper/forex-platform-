import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { AuthForm } from "@/features/auth/components/auth-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <h1 className="text-[36px] leading-tight font-bold tracking-[-0.03em]">Welcome back.</h1>
      <p className="mt-2 mb-8 text-foreground/55">Sign in to your {siteConfig.name} dashboard.</p>
      <AuthForm mode="login" />
      <p className="mt-8 text-center text-sm text-foreground/55">
        Don&apos;t have an account?{" "}
        <Link href={routes.register} className="font-semibold text-foreground hover:underline">
          Create yours now.
        </Link>
      </p>
    </>
  );
}
