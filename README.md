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
- You need to have a UNIX-OS with KDE Plasma anad the necessary rights on the device to setup wallpapers
- Download the latest release from here or visit [INSERT LINK TO KDE PAGE HERE]
    - You can also setup a wallpaper from Plasma: 
        1. Rightclick your desktop
        2. Select "Setup Screen or Workspace"
        3. Select "Background"
        4. Click "Get new Modules" and search for "WFC Landscape"
## Setup
If you download it using the steps **a-d** from above you are already good to go. If you download it from Github you have to extract the archive into `~/.local/share/plasma/wallpapers/` and rename it to `org.kde.plasma.wfc_landscape`

## Testing
Serve the repository root with a local HTTP server:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/contents/ui/code/testing/index.html.
The browser preview and Plasma use the same rules and field implementation;
no namespace edits, commented imports or release-time code changes are needed.
Browser-only startup and image loading live in `testing/testing.js`; Plasma
startup and image loading live in `main.qml`. Both entry points pass their
Field constructor to `configure()` and their loaded images to `saveImage()`.
`wfc.js` and `field.js` contain the shared generator without browser or QML
namespace detection. Change `RULESET` in
`contents/ui/code/testing/testing.js` to preview a different tileset.

The shared generator also has a regression check for a common browser scope
and separate QML-style script scopes:

```sh
node tests/runtime.js
```

This checks initialization, loaded images, generation, restart and an empty
canvas. It does not replace testing inside Plasma.

## Serene Village

Includes static houses, trees, rocks, bushes and flowers placed on suitable
ground during terrain collapse. Larger objects need enough open land.

See [asset credits and licensing](contents/ui/assets/SereneVillage/ATTRIBUTION.md).

For Plasma, choose the tileset by changing `usedTileset` in
`contents/ui/main.qml`: `SereneVillage`, `Landscape`, `Dungeon` or `Roads`.
Some runs may encounter a contradiction and restart.
