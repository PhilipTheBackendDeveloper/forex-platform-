"use client";

import { ChevronRight, Package, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { useId, useState } from "react";
import { Dialog, DialogEmpty } from "@/components/ui/dialog";
import { headerActionClasses } from "@/components/layout/page-header";
import { Fade } from "@/components/ui/section-heading";
import { formatPrice } from "@/features/courses/filter";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/domain";

const categories = ["All", "Accessories", "Clothing", "Others"] as const;

function OrdersDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} title="My Orders" description="Your order history and delivery status.">
      <DialogEmpty icon={<Package aria-hidden className="size-6" />} title="No orders yet">
        Orders you place will appear here. Sign-in and checkout aren&apos;t connected on this preview yet.
      </DialogEmpty>
    </Dialog>
  );
}

function BagDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} title="Your Bag" variant="drawer">
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <DialogEmpty icon={<ShoppingBag aria-hidden className="size-6" />} title="Your bag is empty.">
          Products will appear here once the shop opens.
        </DialogEmpty>
      </div>
    </Dialog>
  );
}

/** "My Orders" trigger for the page sub-header. */
export function MyOrdersButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={headerActionClasses()}>
        My Orders
      </button>
      <OrdersDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/**
 * Shop shell (reference parity): hero panel with bag button, segmented categories, search,
 * "coming soon" empty state, floating "View Cart" pill, bag drawer and orders modal.
 * Checkout is not implemented — no product can be bought on this preview.
 */
export function ShopBrowser({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [bagOpen, setBagOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const searchId = useId();
  const q = query.trim().toLowerCase();
  const visible = products.filter((p) => !q || p.name.toLowerCase().includes(q));

  return (
    <>
      <div className="rounded-[var(--radius-panel)] border border-white/10 bg-white/[0.025] p-6 backdrop-blur sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-foreground/70 uppercase">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" /> Official store
            </p>
            <h1 className="mt-5 text-[clamp(40px,5.5vw,64px)] leading-none font-black tracking-[-0.045em]">
              The <Fade italic>Shop.</Fade>
            </h1>
            <p className="mt-4 text-[15px] text-foreground/60">Apparel, journals and trading resources.</p>
            <button type="button" onClick={() => setOrdersOpen(true)} className="mt-3 inline-flex min-h-11 items-center gap-1 text-[14px] font-medium text-[var(--ring)] hover:underline">
              View your order history <ChevronRight aria-hidden className="size-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setBagOpen(true)}
            className="inline-flex min-h-13 items-center gap-2 self-start rounded-2xl bg-foreground px-5 text-[13px] font-bold tracking-[0.1em] text-background uppercase shadow-[0_0_40px_-10px_rgb(255_255_255/0.5)]"
          >
            <ShoppingCart aria-hidden className="size-4" /> Bag (0)
          </button>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <div role="group" aria-label="Product category" className="inline-flex w-fit flex-wrap gap-1 rounded-2xl border border-white/10 bg-black/30 p-1">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "min-h-10 rounded-xl px-4 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors",
                  category === c ? "bg-white/10 text-foreground" : "text-foreground/50 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full md:max-w-xs">
            <label htmlFor={searchId} className="sr-only">
              Search products
            </label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/40" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="min-h-11 w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pr-4 pl-11 text-[14px] placeholder:text-foreground/35 focus:border-[var(--ring)] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-[var(--radius-panel)] border border-white/10 bg-white/[0.02] px-6 py-24 text-center">
          <Package aria-hidden className="size-9 text-foreground/40" />
          <p className="mt-5 text-[20px] font-semibold">Coming soon</p>
          <p className="mt-2 text-[15px] text-foreground/50">We haven&apos;t listed any items yet. Checkout will open once secure payments are configured.</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.id} className="rounded-[1.4rem] border border-white/10 p-6">
              <h2 className="text-[19px] font-semibold">{p.name}</h2>
              <p className="mt-1 text-foreground/55">{formatPrice(p.price)}</p>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setBagOpen(true)}
        className="fixed right-4 bottom-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-[#070d1a]/90 px-5 text-[14px] font-semibold shadow-2xl backdrop-blur-xl md:right-28 md:bottom-9"
      >
        <ShoppingCart aria-hidden className="size-4" /> View Cart
      </button>

      <BagDrawer open={bagOpen} onClose={() => setBagOpen(false)} />
      <OrdersDialog open={ordersOpen} onClose={() => setOrdersOpen(false)} />
    </>
  );
}
