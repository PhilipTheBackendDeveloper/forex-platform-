import type { Metadata } from "next";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site.config";
import { AuthForm, RegisterStepper } from "@/features/auth/components/auth-form";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <>
      <RegisterStepper current={0} />
      <h1 className="text-[36px] leading-tight font-bold tracking-[-0.03em]">Create your account.</h1>
      <p className="mt-2 mb-8 text-foreground/55">One account for everything in the {siteConfig.name} ecosystem.</p>
      <AuthForm mode="register" />
      <p className="mt-8 text-center text-sm text-foreground/55">
        Already have an account?{" "}
        <Link href={routes.login} className="font-semibold text-foreground hover:underline">
          Sign in.
        </Link>
      </p>
    </>
  );
}
