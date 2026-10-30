import type { StaticImageData } from "next/image";
import blackOutfitWindow from "../../public/images/client/black-outfit-window.jpg";
import footballStadium from "../../public/images/client/football-stadium.jpg";
import london from "../../public/images/client/london.jpg";
import purplePortrait from "../../public/images/client/purple-portrait.jpg";
import redOutfit from "../../public/images/client/red-outfit.jpg";
import stainedGlass from "../../public/images/client/stained-glass.jpg";
import yacht from "../../public/images/client/yacht.jpg";
import blackOutfitCutout from "../../public/images/client/cutouts/black-outfit-window.png";
import londonCutout from "../../public/images/client/cutouts/london.png";
import purplePortraitCutout from "../../public/images/client/cutouts/purple-portrait.png";
import redOutfitCutout from "../../public/images/client/cutouts/red-outfit.png";

export type ClientPhoto = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position that keeps the face in frame for the primary crop. */
  focus: string;
};

/**
 * Client-supplied photographs (see docs/assets/ASSET_MANIFEST.md).
 * Publication consent is still pending client confirmation — do not deploy publicly
 * until docs/OPEN_CLIENT_ITEMS.md item "Photo publication consent" is closed.
 * Static imports give next/image intrinsic sizes (no CLS) and blur placeholders.
 */
export const clientPhotos = {
  purplePortrait: {
    src: purplePortrait,
    alt: "The mentor in a purple T-shirt, arms crossed, smiling at the camera",
    focus: "50% 30%",
  },
  blackOutfitWindow: {
    src: blackOutfitWindow,
    alt: "The mentor in black, seated beside tall bright windows and looking over their shoulder",
    focus: "68% 35%",
  },
  yacht: {
    src: yacht,
    alt: "The mentor dressed in white, seated on the deck of a sailing yacht under a blue sky",
    focus: "50% 60%",
  },
  redOutfit: {
    src: redOutfit,
    alt: "The mentor in a red jersey and cap, leaning on a wall beside a framed painting",
    focus: "30% 40%",
  },
  london: {
    src: london,
    alt: "The mentor standing in front of the Victoria Memorial in London",
    focus: "50% 55%",
  },
  stainedGlass: {
    src: stainedGlass,
    alt: "The mentor standing before a tall, colourful stained-glass window",
    focus: "50% 55%",
  },
  footballStadium: {
    src: footballStadium,
    alt: "The mentor seated in a football changing room beneath hanging team shirts",
    focus: "50% 55%",
  },
} satisfies Record<string, ClientPhoto>;

export type ClientPhotoKey = keyof typeof clientPhotos;

/**
 * Subject cutouts (transparent PNG) generated from the originals with `scripts/cutout.swift`
 * (Apple Vision person segmentation, 2px defringe, 1.2px feather). The person is pixel-identical
 * to the original; only the backdrop was removed so they sit cleanly on the dark design.
 */
export const clientCutouts = {
  purplePortrait: { src: purplePortraitCutout, alt: clientPhotos.purplePortrait.alt },
  blackOutfitWindow: { src: blackOutfitCutout, alt: clientPhotos.blackOutfitWindow.alt.replace(" beside tall bright windows", "") },
  redOutfit: { src: redOutfitCutout, alt: clientPhotos.redOutfit.alt.replace(", leaning on a wall beside a framed painting", "") },
  london: { src: londonCutout, alt: "The mentor in a black polo, photographed in London" },
} satisfies Record<string, { src: StaticImageData; alt: string }>;
