# WFC_Landscape
A random landscape generator based on WFC for Plasma Wallpapers

# Current state
The background is currently working and supports the following tilesets:
- Mini World (original coastal terrain, buildings, trees, rocks and fields)
- DungeonTileset II (connected rooms and corridors, chests, columns and props)
- Serene Village (default; terrain, houses, trees, rocks and flowers)

It uses a 32×32 pixel grid. At the default 40 ms per collapse, a complete
1920×1080 generation takes roughly 82 seconds plus loading and rendering time.

Currently known bugs/issues:
- Landscape WFC can encounter contradictions and restart. Dungeon II uses a
  connected room plan to avoid dead ends in tile selection.

# How to use
## Requirements

KDE Plasma 6.

## Setup

From the repository root, install the wallpaper plugin:

```sh
kpackagetool6 --type Plasma/Wallpaper --install .
```

To update an existing installation:

```sh
kpackagetool6 --type Plasma/Wallpaper --upgrade .
```

Reopen the desktop wallpaper settings and choose **WFC Landscape** in the
wallpaper type selector. This is a wallpaper plugin, not an image file.

## Testing
Serve the repository root with a local HTTP server:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/contents/ui/code/testing/index.html.
Asset loading failures are reported; reload the page to retry. Plasma reports
loading failures too; apply a setting change to retry there.
Set `TILESET` in `contents/ui/code/testing/testing.js` to `SereneVillage`,
`MiniWorld` or `DungeonII` to change the browser preview.

## Tilesets

Choose `SereneVillage`, `MiniWorld` or `DungeonII` in Plasma's wallpaper settings.
All sets include static details placed during terrain collapse. Larger objects
need enough settled, suitable ground. Some runs may encounter a contradiction.

| Tileset | Credits and licensing |
| --- | --- |
| Serene Village | [Attribution](contents/ui/assets/SereneVillage/ATTRIBUTION.md) |
| Mini World | [Attribution](contents/ui/assets/MiniWorld/ATTRIBUTION.md) |
| DungeonTileset II | [Attribution](contents/ui/assets/DungeonII/ATTRIBUTION.md) |

## Generator settings

Select **WFC Landscape** in Plasma's wallpaper settings to configure the tileset,
time per collapse (10–1000 ms), automatic restart, restart pause (1–3600 seconds),
and decorations. Lower collapse times make generation faster.
Changing the tileset, collapse time, restart pause or decoration settings starts
a fresh generation. Turning automatic restart off keeps the current generation
and cancels the pending restart; an unfinished generation continues to completion.
Turning automatic restart back on starts a fresh generation.
With automatic restart disabled, the final or partially generated image stays
visible, including when WFC encounters a contradiction.

# AI declaration

AI assistance was used to:

- Research asset packs and their stated licenses.
- Prepare existing artwork through cropping, nearest-neighbor scaling
  and compositing. No AI-generated artwork is included.
- Write terrain rules and decoration placement logic.
- Implement dungeon layouts, connectivity and the collapse reveal.
- Adapt the wallpaper and its settings for Plasma 6.
- Support the browser preview, investigate bugs, run checks
  and update documentation.

Original artwork and its licenses are documented in the attribution files.

All code was reviewed and adapted by me.