import type { Metadata } from "next";
import { LandingShell } from "@/components/layout/landing-shell";
import { PageHeader } from "@/components/layout/page-header";
import { MyOrdersButton, ShopBrowser } from "@/features/commerce/components/shop-browser";
import { listProducts } from "@/features/commerce/data/products";

export const metadata: Metadata = {
  title: "Shop & Merchandise",
  description: "Official merchandise and trading resources.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await listProducts();
  return (
    <LandingShell header={<PageHeader title="Premium Shop" action={<MyOrdersButton />} />}>
      <section className="mx-auto min-h-[85vh] w-full max-w-7xl px-4 pt-32 pb-24 lg:px-6 lg:pt-36">
        {products.state === "error" ? (
          <p role="alert" className="text-foreground/60">
            We couldn&apos;t load products right now. Please try again shortly.
          </p>
        ) : (
          <ShopBrowser products={products.state === "ready" ? products.data : []} />
        )}
      </section>
    </LandingShell>
  );
}
