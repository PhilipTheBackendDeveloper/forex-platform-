import type { Metadata } from "next";
import { Package, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHero } from "@/components/shared/page-hero";
import { routes } from "@/config/navigation";
import { listProducts } from "@/features/commerce/data/products";
import { formatPrice } from "@/features/courses/filter";

export const metadata: Metadata = {
  title: "Shop & Merchandise",
  description: "Official merchandise and trading resources.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await listProducts();
  return (
    <>
      <PageHero eyebrow="Premium shop" title="Gear for" accent="focused traders." description="Apparel, journals and trading resources.">
        <ButtonLink href={routes.login} variant="secondary" className="mt-2">
          <ShoppingBag aria-hidden className="size-4" /> My orders
        </ButtonLink>
      </PageHero>
      <section className="container-site pb-32">
        {products.state === "ready" ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.data.map((p) => (
              <li key={p.id} className="rounded-[var(--radius-card)] border border-border p-6">
                <h2 className="text-[19px] font-semibold">{p.name}</h2>
                <p className="mt-1 text-foreground/55">{formatPrice(p.price)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon={Package} title="The shop opens soon">
            {products.state === "error"
              ? "We couldn't load products right now. Please try again shortly."
              : "Merchandise hasn't been added yet. Checkout will only open once secure payments are configured."}
          </EmptyState>
        )}
      </section>
    </>
  );
}
