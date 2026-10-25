# Serene Village — revamped

Artwork by **LimeZu**.

- Source: https://limezu.itch.io/serenevillagerevamped
- Version: Serene_Village_revamped_v1.9.zip
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
- License text: https://creativecommons.org/licenses/by/4.0/legalcode

The original `Serene_Village_16x16.png` is included for reproducibility.
The bundled terrain tiles are cropped from that sheet and enlarged from
16×16 to 32×32 with nearest-neighbor scaling. These are modifications made
for WFC_Landscape. LimeZu does not endorse this project.

The artwork retains its CC BY 4.0 license independently of the project code.
When sharing these assets, credit LimeZu, retain the license link and indicate
any modifications.

## Integration details

19 opaque terrain tiles are cropped from the original 16×16 sheet and enlarged
to 32×32 with nearest-neighbor scaling. The initial selection includes grass,
dirt, water and convex grass island borders. Concave terrain corners and animations are not included. The generator can create terrain patches;
it does not reproduce the manually designed village in the pack's screenshots.

`contents/ui/assets/SereneVillage/tiles.json` records source coordinates and
edge signatures. `getSereneVillageRules()` in `contents/ui/code/ruleset.js` returns explicit
neighbour arrays in **North, East, South, West** order, using the same
`id`, `path` and `neighbours` structure as the other tilesets. The arrays match opposite terrain edges. Opposing water shores and water
corners cannot close directly against one another: a straight segment or grass
tile must fit between them, avoiding tiny sand-only islands. Dirt and water meet
through grass. All tile IDs are consecutive.

The source blocks are not uniform 3×3 grids. Dirt borders use source columns
6, 7 and 9; water borders use columns 3, 4 and 8. The plain dirt tile is at
(10, 2). Coordinates are zero-based and recorded in `tiles.json`.

The selected rules are cached; image loading completes before the initial
WFC grid is populated. The existing limited-depth WFC propagation and restart
behavior still apply, so some runs may stop at a contradiction.


## Decoration layer

11 additional sprites are cropped from the same sheet and enlarged with
nearest-neighbor scaling: two red houses, three trees, a rock, a bush,
three flower pots and daisies. `decorations.json` records their source
rectangles as [x, y, width, height] in 16×16 cells.

`getSereneVillageDecorations()` in `ruleset.js` defines dimensions, placement
probabilities and allowed terrain IDs. After each collapse, `paintDecorations()` checks footprints containing the
newly collapsed cell and places complete sprites on unoccupied grass or dirt.
Every cell under the sprite must already be collapsed and painted; shore
tiles and water are excluded. Each eligible footprint gets one probability
roll per sprite. Large sprites are considered first within each step.
Existing placements reserve their cells until restart. Since their complete
footprints are already painted, later collapses do not overwrite them.
Small islands may have space only for flowers or bushes. Decorations are static;
houses do not currently get generated paths or connected doors.

Browser and Plasma load decoration images separately from WFC tiles. Other
tilesets keep their existing behavior. Restarting or resizing clears placements.
