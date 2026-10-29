import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { AuthForm } from "@/features/auth/components/auth-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <h1 className="text-[40px] leading-tight font-bold tracking-[-0.03em]">Welcome back.</h1>
      <p className="mt-2 mb-10 text-foreground/55">Sign in to your learning dashboard.</p>
      <AuthForm mode="login" />
      <p className="mt-8 text-sm text-foreground/55">
        New here?{" "}
        <Link href={routes.register} className="font-medium text-foreground underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
