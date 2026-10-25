# WFC_Landscape
A random landscape generator based on WFC for Plasma Wallpapers

# Current state
The background is currently working and supports the following tilesets:
- Dungeon
- Landscape
- Roads
- Serene Village (default; terrain, houses, trees, rocks and flowers)

It uses 32x32 pixel sized images and takes around 1:30 minutes for a 1920x1080 screen

Currently known bugs/issues:
- Current WFC implementations sometimes doesn't find a possible solution
    - _I currently have a fix in place where a new loop starts if this happens. Looking into it in the future_

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

## Serene Village

Includes static houses, trees, rocks, bushes and flowers placed on suitable
ground during terrain collapse. Larger objects need enough open land.

See [asset credits and licensing](contents/ui/assets/SereneVillage/ATTRIBUTION.md).

Choose `SereneVillage`, `Landscape`, `Dungeon` or `Roads` in Plasma’s wallpaper settings.
Some runs may encounter a contradiction and restart.


## Generator settings

Select **WFC Landscape** in Plasma's wallpaper settings to configure the tileset,
time per collapse (10–1000 ms), automatic restart, restart pause (1–3600 seconds),
and Serene Village decorations. Lower collapse times make generation faster.
Changing the tileset, collapse time, restart pause or decoration settings starts
a fresh generation. Turning automatic restart off keeps the current generation
and cancels the pending restart; an unfinished generation continues to completion.
Turning automatic restart back on starts a fresh generation.
With automatic restart disabled, the final or partially generated image stays
visible, including when WFC encounters a contradiction.
