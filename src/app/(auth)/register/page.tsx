import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { AuthForm } from "@/features/auth/components/auth-form";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-[40px] leading-tight font-bold tracking-[-0.03em]">Start learning.</h1>
      <p className="mt-2 mb-10 text-foreground/55">Create a free account to begin the beginner path.</p>
      <AuthForm mode="register" />
      <p className="mt-8 text-sm text-foreground/55">
        Already have an account?{" "}
        <Link href={routes.login} className="font-medium text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
