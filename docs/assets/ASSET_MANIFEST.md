# Asset manifest — client photographs

**Permission status (all seven): user-supplied for this project; publication consent from the pictured person/client NOT yet confirmed.** Do not deploy publicly until confirmed (OPEN_CLIENT_ITEMS #4).

## Processing
1. Originals copied unmodified to `private/reference-assets/client-originals/` (git-ignored; SHA-256 below).
2. Web sources in `public/images/client/*.jpg` are **byte-identical copies** of the originals: re-encoding with `sips` at q80 produced *larger* files, and no EXIF GPS was present (`mdls kMDItemLatitude` = null), so the originals are already the best source.
3. `next/image` serves responsive AVIF/WebP at request time from these sources (static imports → intrinsic size + blur placeholder).
4. Static AVIF derivatives (`sips -s format avif -s formatOptions 60 -Z 1600`) in `public/images/client/avif/` for non-Next uses (email, social).
5. `public/og/default.jpg` (1200×630) = `black-outfit-window` resized to 1200 wide and centre-cropped.
6. **No edits to the person:** no retouching, recolouring, reshaping or cutouts. Hero blending uses CSS `mask-image` gradients only.

| Original | Web file | px | SHA-256 (original) | Description | Placement | Alt text |
|---|---|---|---|---|---|---|
| client-purple-portrait.jpeg | purple-portrait.jpg | 1320×1209 | `bfd95be28fc9fa4183e5834c93f16e598bbdab082c4a703fda140fc0c735cfbe` | Front-facing, purple T-shirt, arms crossed, white backdrop | **Home hero** (masked), About hero | The mentor in a purple T-shirt, arms crossed, smiling at the camera |
| client-black-outfit-window.jpeg | black-outfit-window.jpg | 1600×1064 | `51db332a95d53c9342c8143eb0bf34063a0b9cf4e8a83447f546e6c9c0d4a247` | Black outfit seated by tall bright windows | Home educator, Coaching philosophy, auth side panel, OG image | The mentor in black, seated beside tall bright windows and looking over their shoulder |
| client-yacht.jpeg | yacht.jpg | 1307×1600 | `6d8f05227f7e5da84577ca3cbe44ad71700db8b5786e63b50d0a46a1d2efc750` | White outfit on yacht deck | Home coaching collage, Academy "Online", About gallery | The mentor dressed in white, seated on the deck of a sailing yacht under a blue sky |
| client-red-outfit.jpeg | red-outfit.jpg | 1320×1365 | `547fb2bd40aec342260014bd0a21af863d72d8f65ec79f159896d8b02171494b` | Profile, red jersey & cap, beside painting | Home coaching collage, Gold Digger, About gallery | The mentor in a red jersey and cap, leaning on a wall beside a framed painting |
| client-london.jpeg | london.jpg | 1200×1600 | `c33af2e0560afa52cb701fb78c86055905c35482ef020683b840e0bab4615211` | Black outfit at Victoria Memorial, London | Home coaching collage, Academy "Physical", About gallery | The mentor standing in front of the Victoria Memorial in London |
| client-stained-glass.jpeg | stained-glass.jpg | 1320×1382 | `091c0e2e945689d1d6fa9305fa4508d9417bf2d475eb06c5f1e285d8221e3239` | Standing before stained-glass window | Home academy band background, About gallery | The mentor standing before a tall, colourful stained-glass window |
| client-football-stadium.jpeg | football-stadium.jpg | 1320×1600 | `bf3ba12fcd17ff8d3c2ae70ea20a0f98cabdaac2d881d948b39cad212203f59e` | Seated in football changing room | About gallery only (not trading-relevant) | The mentor seated in a football changing room beneath hanging team shirts |

Verify with: `shasum -a 256 private/reference-assets/client-originals/*`.

## Notes / risks
- `client-football-stadium` shows a club's branded shirts with player names; `client-red-outfit` shows a framed artwork with luxury-brand pattern; `client-london` and `client-stained-glass` include bystanders/branded interiors. Confirm the client is comfortable publishing these.
- Clothing in some photos carries third-party brand marks (e.g. caps, a "UAE" polo, product branding on a T-shirt). Fine for lifestyle use, but avoid implying endorsement.

## Missing assets
Logo (SVG), favicon/app icons, brand colours, any course/academy imagery, instructor video, approved testimonial photos.
