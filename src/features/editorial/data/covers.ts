import { clientPhotos, type ClientPhoto } from "@/config/assets";

/**
 * Article cover photos (client-supplied, consent pending). Replace with licensed editorial
 * imagery per article when available; unmapped articles fall back to generated chart art.
 */
const covers: Record<string, ClientPhoto> = {
  "risk-first-position-sizing": clientPhotos.blackOutfitWindow,
  "building-a-trading-routine": clientPhotos.stainedGlass,
  "reading-market-structure": clientPhotos.london,
  "your-first-90-days": clientPhotos.yacht,
};

export function getArticleCover(slug: string): ClientPhoto | undefined {
  return covers[slug];
}
