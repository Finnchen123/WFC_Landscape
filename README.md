# WFC_Landscape
A random landscape generator based on WFC for Plasma Wallpapers

# Current state
The background is currently working and supports the following tilesets:
- Dungeon
- Landscape
- Roads

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
The uploaded code will always be in a state that works with Plasma. Problem is: Plasma and JS handle separate files differently. If you want to use the testing
code that I implemented you need to do the following (and obviously reverse it if you want it to work with Plasma again):

- Go to `contents/ui/code/wfc.js` and uncomment the line `//const RULESET = getDungeonRules();`
- Replace all occurences of `Wave.` in `contents/ui/code/field.js`
    - If you want to change it back for Plasma you need to put `Wave.` in front of all methods and variables that come from `contents/ui/code/wfc.js`
- Replace all occurences of `Field.` in `contents/ui/code/wfc.js`
    - If you want to change it back for Plasma you need to put `Field.` here `map[i][j] = new Field(i, j);` in front of `Field(i, j);`
