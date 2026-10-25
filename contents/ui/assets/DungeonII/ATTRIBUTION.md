# 16x16 DungeonTileset II

Artwork by **0x72 (Robert)**. The source page also credits **GrafxKid** for
recoloring the earlier version.

- Source: https://0x72.itch.io/dungeontileset-ii
- Version: `0x72_DungeonTilesetII_v1.7.zip`
- License: Creative Commons Zero 1.0 Universal (CC0), for the artwork
- License text: https://creativecommons.org/publicdomain/zero/1.0/legalcode

The author explicitly permits use for any purpose under CC0. Credit is optional;
the project retains it voluntarily. No code from the asset pack is integrated.
Artwork remains separate from the project's code license.

## Integration details

Selected original frames and the low-wall atlas are retained in `source/`.
The pack's own atlas README is retained there as well. Assets are cropped and
enlarged to a 32px grid with nearest-neighbor scaling. Transparent wall pieces
are composited over the pack's `floor_1.png` to produce opaque terrain tiles.

The dungeon uses a connected room-and-corridor plan before tile collapse.
Rooms are freely placed with varied sizes and rectangular, rounded or
cut-corner shapes. A randomized spanning tree connects them with two- or
three-cell-wide corridors; optional extra links create loops. The perimeter remains solid rock. Border bits describe blocked sides
(North=1, East=2, South=4, West=8), and floor variants fill the interior.

24 terrain tiles comprise eight original floors, fifteen composite room-border
variants and one flat rock background sampled from the original floor art.
North borders use the low-wall atlas at (32,16,16,16); south borders use
`wall_top_mid.png`; side borders use the outer four columns of
`wall_edge_left.png` and `wall_edge_right.png`. These compositing operations
are project modifications, not additional original assets from 0x72.

The previous independent wall-fragment rules have been replaced. During the
collapse animation, tiles are selected only from variants compatible with the
planned layout. The reveal starts on a floor cell and grows through adjacent
cells, preferring cells with more already revealed neighbours. This preserves
a contiguous growing region rather than scattering tiles across the canvas. Dungeon II bypasses depth-limited free WFC propagation; other
tilesets retain it. The floor plan has one connected region, although props
are visual decoration rather than a gameplay collision system.

Six static details include a closed chest, a crate, a column, a skull and two
flasks. The first closed-chest animation frame is used. Taller sprites are
bottom-aligned with transparent padding to whole grid cells. They are placed
during collapse on settled floor tiles; wall tiles are excluded.

`tiles.json` records tile IDs, border masks and compositing sources.
`decorations.json` records source frames and padding. Rules and decoration
definitions live in `contents/ui/code/ruleset.js`. No characters or animation
playback are included.
