// SPDX-FileCopyrightText: 2026 Finnchen123 <finnchennicola@gmail.com>
// SPDX-License-Identifier: GPL-3.0-only

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

        function getImages() {
            return Ruleset.getRulesForTileset(wallpaper.configuration.Tileset);
        }

        property string loadFailure: ""
        property var requestedImages: ({})
        function failLoading(path) {
            loadFailure = i18n("Wallpaper assets could not be loaded. Change a setting to retry.");
            console.error("WFC asset loading failed:", path);
            stepTimerWave.stop();
            resetTimerWave.stop();
            assetLoadTimeout.stop();
        }
        function assetsReady(rules) {
            var complete = true;
            for (var rule of rules) {
                if (isImageError(rule.path)) {
                    failLoading(rule.path);
                    return false;
                }
                if (!isImageLoaded(rule.path)) {
                    complete = false;
                    if (!requestedImages[rule.path]) {
                        requestedImages[rule.path] = true;
                        loadImage(rule.path);
                    }
                }
            }
            return complete;
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
                assetLoadTimeout.stop();
                for (var path in requestedImages) {
                    if (!isImageLoaded(path)) unloadImage(path);
                }
                requestedImages = ({});
                loadFailure = "";
                tileRules = getImages();
                decorationRules = wallpaper.configuration.ShowDecorations
                    ? Ruleset.getDecorationsForTileset(wallpaper.configuration.Tileset) : [];
                Wave.clearTiles();
                tilesInitialized = false;
                Wave.dimensionChanged(width, height);
                Wave.restart(ctx);
                stepTimerWave.start();
                console.debug("WFC generation restarted:", wallpaper.configuration.Tileset,
                    wallpaper.configuration.StepInterval, wallpaper.configuration.RestartDelay);
            }
            if (loadFailure.length) return;
            if (!tilesInitialized) {
                var terrainReady = assetsReady(tileRules);
                var decorationReady = !loadFailure.length && assetsReady(decorationRules);
                if (loadFailure.length) return;
                if (!terrainReady || !decorationReady) {
                    if (!assetLoadTimeout.running) assetLoadTimeout.start();
                    return;
                }
                assetLoadTimeout.stop();
                for (var tile of tileRules) {
                    Wave.saveImage(tile, ctx.createImageData(tile.path));
                }
                for (var decoration of decorationRules) {
                    Wave.saveDecoration(decoration, ctx.createImageData(decoration.path));
                }
                Wave.initialize();
                tilesInitialized = true;
            }
            var isFinished = Wave.paintMatrix(ctx);

            if(isFinished) {
                stepTimerWave.stop();
                if (wallpaper.configuration.AutoRestart) resetTimerWave.start();
            };
        }

        onWidthChanged: scheduleRestart()
        onHeightChanged: scheduleRestart()

        Timer {
            id: assetLoadTimeout
            interval: 15000
            onTriggered: root.failLoading("timeout");
        }

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

    Text {
        anchors.centerIn: parent
        width: Math.min(parent.width - 32, 600)
        visible: root.loadFailure.length > 0
        text: root.loadFailure
        color: "white"
        style: Text.Outline
        styleColor: "black"
        wrapMode: Text.WordWrap
        horizontalAlignment: Text.AlignHCenter
    }
}
