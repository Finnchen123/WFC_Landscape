# Free 16x16 Mini World Sprites

Authors: **Shade (merchant-shade)** and **octoshrimpy**, as credited on the source page.

- Source: https://merchant-shade.itch.io/16x16-mini-world-sprites
- Download: `MiniWorldSprites.zip` (upload 7054436)
- License: Creative Commons Zero 1.0 Universal (CC0)
- License text: https://creativecommons.org/publicdomain/zero/1.0/legalcode

The official asset page explicitly marks the pack as CC0 and allows creative
modifications. Credit is optional; the project retains it here voluntarily.
Artwork remains separate from the project's code license.

## Integration details

Selected original PNGs are retained in `source/`. Derived sprites are cropped
and enlarged from 16×16 to 32×32 with nearest-neighbor scaling. The original
small buildings are complete one-cell sprites, not pieces of larger houses.
Only static variants are used.

20 terrain variants use the pack's original artwork: seven grass variants,
water, eight convex coastal pieces and four concave coastal pieces from
`Cliff-Water.png`. The previous synthetic grass/water and grass/sand masks
have been removed. No generated coastline artwork is used.

Opposite terrain edges must match. Opposing shores require room for an
interior, avoiding tiny coast-only islands. Concave pieces allow bays and
nonrectangular coastlines. The terrain remains procedural; it does not
reproduce a manually composed promotional map.

Twelve static decoration sprites include houses, a hut, a tower, a larger
keep, a chapel, a market, trees, a palm, a rock and wheat. They appear during
collapse on settled grass; cliffs and water are excluded. Existing decoration
priority and collision rules apply. Buildings are not linked by generated
roads, and no coordinated village layout is imposed.

`tiles.json` records original ground source rectangles.
`decorations.json` records sprite rectangles in original source pixels.
Rules and decoration definitions live in `contents/ui/code/ruleset.js`.
No characters, other creators' expansion packs or animations are integrated.
