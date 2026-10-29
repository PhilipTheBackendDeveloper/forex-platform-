import type { Loadable, Product } from "@/types/domain";

/**
 * Shop adapter. No client merchandise has been supplied, so the catalogue is empty and checkout
 * is not implemented. Replace with the commerce service once products and payments are approved.
 */
export async function listProducts(): Promise<Loadable<Product[]>> {
  const products: Product[] = [];
  return products.length ? { state: "ready", data: products } : { state: "empty" };
}
