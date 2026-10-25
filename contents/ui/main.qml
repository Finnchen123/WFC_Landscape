/*
 * Copyright (C) %{CURRENT_YEAR} by %{AUTHOR} <%{EMAIL}>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Library General Public License as
 * published by the Free Software Foundation; either version 2 or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this program; if not, write to the
 * Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import QtQuick
import org.kde.plasma.plasmoid

import "code/wfc.js" as Wave
import "code/ruleset.js" as Ruleset
import "code/field.js" as Field


WallpaperItem {
    id: wallpaper

    Canvas {
        id: root
        anchors.fill: parent

        property bool ready: false
        Component.onCompleted: {
            Wave.configure(Field.Field);
            ready = true;
            observedSettingsKey = settingsKey;
            observedAutoRestart = autoRestart;
            scheduleRestart();
        }

        property bool restartRequested: false
        function scheduleRestart() {
            if (!ready) return;
            restartRequested = true;
            stepTimerWave.stop();
            resetTimerWave.stop();
            if (available) requestPaint();
        }
        onAvailableChanged: scheduleRestart()

        property string usedTileset: wallpaper.configuration.Tileset
        property bool showDecorations: wallpaper.configuration.ShowDecorations
        // Remember applied values: KConfig can emit valueChanged for unchanged keys.
        property bool autoRestart: wallpaper.configuration.AutoRestart
        property string observedSettingsKey: ""
        property bool observedAutoRestart: true
        function configurationKey() {
            return JSON.stringify([
                wallpaper.configuration.Tileset,
                wallpaper.configuration.StepInterval,
                wallpaper.configuration.RestartDelay,
                wallpaper.configuration.ShowDecorations
            ]);
        }
        property string settingsKey: configurationKey()
        onSettingsKeyChanged: applyConfigurationChange()
        onAutoRestartChanged: applyConfigurationChange()

        function applyConfigurationChange() {
            if (!ready) return;
            var key = configurationKey();
            var enabled = wallpaper.configuration.AutoRestart;
            var otherChanged = key !== observedSettingsKey;
            var restartEnabled = enabled && !observedAutoRestart;
            observedSettingsKey = key;
            observedAutoRestart = enabled;
            if (!enabled) resetTimerWave.stop();
            if (otherChanged || restartEnabled) scheduleRestart();
        }

        Connections {
            target: wallpaper.configuration
            function onValueChanged(key, value) {
                root.applyConfigurationChange();
            }
        }

        //Neighbours are always the same: North, East, South, West
        function getImages(){
            var imageList;
            switch(wallpaper.configuration.Tileset){
                case "SereneVillage":
                    imageList = Ruleset.getSereneVillageRules();
                break;
                case "Roads":
                    imageList = Ruleset.getRoadRules();
                break;
                case "Landscape":
                    imageList = Ruleset.getLandscapeRules();
                break;
                case "Dungeon":
                    imageList = Ruleset.getDungeonRules();
                break;
                default:
                    imageList = Ruleset.getLandscapeRules();
                break;
            }
            return imageList;
        }

        property bool tilesInitialized: false
        property var tileRules: []
        property var decorationRules: []

        onPaint: {
            if (!ready) return;
            var ctx = getContext("2d");
            // Consume configuration changes at the drawing boundary, even if
            // generation had finished and the step timer was stopped.
            if (restartRequested) {
                restartRequested = false;
                tileRules = getImages();
                decorationRules = wallpaper.configuration.Tileset === "SereneVillage" && wallpaper.configuration.ShowDecorations
                    ? Ruleset.getSereneVillageDecorations() : [];
                Wave.clearTiles();
                tilesInitialized = false;
                Wave.dimensionChanged(width, height);
                Wave.restart(ctx);
                stepTimerWave.start();
                console.debug("WFC generation restarted:", wallpaper.configuration.Tileset,
                    wallpaper.configuration.StepInterval, wallpaper.configuration.RestartDelay);
            }
            var images = tileRules;
            var canPaint = true;
            var isFinished = false;
            for(var i = 0; i < images.length; i++){
                if(!isImageLoaded(images[i]["path"])){
                    canPaint = false;
                    loadImage(images[i]["path"]);
                }
                else{
                    Wave.saveImage(images[i], ctx.createImageData(images[i]["path"]));
                }
            }

            for (var j = 0; j < decorationRules.length; j++) {
                var decoration = decorationRules[j];
                if (!isImageLoaded(decoration.path)) {
                    canPaint = false;
                    loadImage(decoration.path);
                } else {
                    Wave.saveDecoration(decoration, ctx.createImageData(decoration.path));
                }
            }

            if(canPaint){
                if (!tilesInitialized) {
                    Wave.initialize();
                    tilesInitialized = true;
                }
                isFinished = Wave.paintMatrix(ctx);
            }

            if(isFinished) {
                stepTimerWave.stop();
                if (wallpaper.configuration.AutoRestart) resetTimerWave.start();
            };
        }

        onWidthChanged: scheduleRestart()
        onHeightChanged: scheduleRestart()

        Timer {
            id: stepTimerWave
            interval: Math.max(10, Math.min(1000, wallpaper.configuration.StepInterval))
            repeat: true
            running: false
            triggeredOnStart: true

            onTriggered: {
                root.requestPaint();
            }

        }
        
        Timer {
            id: resetTimerWave
            interval: Math.max(1, Math.min(3600, wallpaper.configuration.RestartDelay)) * 1000
            repeat: false
            running: false
            triggeredOnStart: false
            onTriggered: {
                Wave.restart(root.getContext("2d"));
                stepTimerWave.start();
            }
        }
    }

}
