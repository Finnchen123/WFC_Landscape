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
dirt, water and convex grass island borders. It does not include houses,
trees, concave corners or animations. The generator can create terrain patches;
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
