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

import QtQuick 2.1

import QtQuick.Layouts 1.1

import org.kde.plasma.core 2.0
import org.kde.plasma.components 2.0 as PlasmaComponents
import org.kde.plasma.extras 2.0 as PlasmaExtras

//We need units from it
import org.kde.plasma.core 2.0 as Plasmacore

import "code/wfc.js" as Wave


Canvas {
    id: root
    anchors.fill: parent

    //Neighbours are always the same: North, East, South, West
    function getImages(){
        var imageList = [
            {id: 0, path: "assets/A.png", neighbours: [[0, 4],[0, 2],[0, 6],[0, 8]]},
            {id: 1, path: "assets/AB_East_South.png", neighbours: [[9],[9],[2, 5],[3, 4]]},
            {id: 2, path: "assets/AB_East.png", neighbours: [[2, 1],[9],[2, 5],[0, 8]]},
            {id: 3, path: "assets/AB_North_East.png", neighbours: [[9],[4, 1],[7, 8],[9]]},
            {id: 4, path: "assets/AB_North.png", neighbours: [[9],[4, 1],[0, 6],[4, 3]]},
            {id: 5, path: "assets/AB_South_West.png", neighbours: [[1, 2],[9],[9],[6, 7]]},
            {id: 6, path: "assets/AB_South.png", neighbours: [[0, 4],[6, 5],[9],[4, 7]]},
            {id: 7, path: "assets/AB_West_North.png", neighbours: [[3, 8],[5, 6],[9],[9]]},
            {id: 8, path: "assets/AB_West.png", neighbours: [[8, 3],[0, 2],[8, 7],[9]]},
            {id: 9, path: "assets/B.png", neighbours: [[9, 6],[9, 8],[9, 4],[9, 2]]}
        ]
        return imageList;
    }

    onPaint: {
        var ctx = getContext("2d");
        var images = getImages();
        var canPaint = true;
        var isFinished = false;
        for(var i = 0; i < images.length; i++){
            if(!isImageLoaded(images[i]["path"])){
                canPaint = false;
                loadImage(images[i]["path"]);
            }
            else{
                Wave.saveImage(images[i], ctx);
            }
        }

        if(canPaint){
            isFinished = Wave.paintMatrix(ctx);
        }

        if(isFinished) {
            stepTimerWave.stop();
            resetTimerWave.start();
        };
    }

    onWidthChanged: {
        stepTimerWave.stop();
        Wave.dimensionChanged(width,height);
        stepTimerWave.start();
    }
    onHeightChanged: {
        stepTimerWave.stop();
        Wave.dimensionChanged(width,height);
        stepTimerWave.start();
    }

    Timer {
        id: stepTimerWave
        interval: 40
        repeat: true
        running: true
        triggeredOnStart: true

        onTriggered: {
            root.requestPaint();
        }

    }
    
    Timer {
        id: resetTimerWave
        interval: 5000
        repeat: false
        running: false
        triggeredOnStart: false
        onTriggered: {
            Wave.restart(getContext("2d"));
            stepTimerWave.start();
        }
    }
}
