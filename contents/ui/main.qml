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
import "code/landscape.js" as Landscape


Canvas {
    id: root
    anchors.fill: parent

    //Neighbours are always the same: North, East, South, West
    function getImages(){
        var usedTileset = "Roads";
        var imageList;
        switch(usedTileset){
            case "Roads":
                imageList = [
                    {id: 0, path: "assets/Roads/A.png", neighbours: 
                        [[0, 2,8,6,7, 12, 13, 14],[0, 11, 10, 5, 8, 12, 13,15],[0, 2, 3, 9, 10, 13, 14,15],[0, 11, 4, 7, 9, 12, 14,15]]},
                    {id: 1, path: "assets/Roads/Road_Center.png", neighbours: 
                        [[1, 3, 4, 5, 9, 10, 11, 15],[1, 2, 3, 4, 6, 7, 9, 14],[1, 4,5,6,7,8,11,12],[1, 2, 3, 5, 6, 8, 10, 13]]},
                    {id: 2, path: "assets/Roads/Road_Horizontal.png", neighbours: 
                        [[0, 2, 6, 7, 8, 12, 13, 14],[1, 2, 3, 4, 6, 7, 9, 14],[0, 2, 3, 9, 10, 13, 14, 15],[1, 2, 3,  5, 6, 8, 10, 13]]},
                    {id: 3, path: "assets/Roads/Road_T_Down.png", neighbours: 
                        [[0, 2, 6, 7, 8, 12, 14, 13],[1, 2, 3, 4, 6, 7, 9, 14],[1, 4,5,6,7,8,11, 12],[1, 2, 3,  5, 6, 8, 10, 13]]},
                    {id: 4, path: "assets/Roads/Road_T_Left.png", neighbours: 
                        [[1, 3, 4, 5, 9, 10, 11, 15],[0, 5, 8, 10, 11, 12, 13, 15],[1, 4,5,6,7,8,11, 12],[1, 2, 3, 5, 6, 8, 10, 13]]},
                    {id: 5, path: "assets/Roads/Road_T_Right.png", neighbours: 
                        [[1, 3, 4, 5, 9, 10, 11, 15],[1, 2, 3, 4, 6, 7, 9, 14],[1, 4,5,6,7,8,11, 12],[0, 4, 7, 9, 11, 12, 14, 15]]},
                    {id: 6, path: "assets/Roads/Road_T_Up.png", neighbours: 
                        [[1, 3, 4, 5, 9, 10, 11, 15],[1, 2, 3, 4, 6, 7, 9, 14],[0, 2, 3, 9, 10, 14, 13, 15],[1, 2, 3, 5, 6, 8, 10, 13]]},
                    {id: 7, path: "assets/Roads/Road_Turn_Down_Left.png", neighbours: 
                        [[1, 3, 4, 5, 9, 10, 11, 15],[0, 5, 8, 10, 11, 12, 13, 15],[0, 2, 3, 9, 10, 14, 13, 15],[1, 2, 3, 5, 6, 8, 10, 13]]},
                    {id: 8, path: "assets/Roads/Road_Turn_Left_Up.png", neighbours: 
                        [[1, 3, 4, 5, 9, 10, 11, 15],[1, 2, 3, 4, 6, 7, 9, 14],[0, 2, 3, 9, 10, 14, 13, 15],[0, 4, 7, 9, 11, 12, 14, 15]]},
                    {id: 9, path: "assets/Roads/Road_Turn_Right_Down.png", neighbours: 
                        [[0, 2, 6, 7, 8, 12, 14, 13],[0, 5, 8, 10, 11, 12, 13, 15],[1, 4,5,6,7,8,11, 12],[1, 2, 3, 5, 6, 8, 10, 13]]},
                    {id: 10, path: "assets/Roads/Road_Turn_Up_Right.png", neighbours: 
                        [[0, 2, 6, 7, 8, 12, 14, 13],[1, 2, 3, 4, 6, 7, 9, 14],[1, 4,5,6,7,8,11, 12],[0, 4, 7, 9, 11, 12, 14, 15]]},
                    {id: 11, path: "assets/Roads/Road_Vertical.png", neighbours: 
                        [[1, 3, 4, 5, 9, 10, 11,15],[0, 5, 8, 10, 11, 12, 13,15],[1, 4,5,6,7,8,11, 12],[0, 4, 7, 9, 11, 12,14,15]]},
                    {id: 12, path: "assets/Roads/Road_End_Down.png", neighbours: 
                        [[1,3,4,5,9,10,11,15],[0,5,8,10,11,12,13,15],[0,2,3,9,10,13,14,15],[0,4,7,9,11,12,14,15]]},
                    {id: 13, path: "assets/Roads/Road_End_Left.png", neighbours: 
                        [[0,2,6,7,8,12,13,14],[1,2,3,4,6,7,9,14],[0,2,3,9,10,13,14,15],[0,4,7,9,11,12,14,15]]},
                    {id: 14, path: "assets/Roads/Road_End_Right.png", neighbours: 
                        [[0,2,6,7,8,12,13,14],[0,5,8,10,11,12,13,15],[0,2,3,9,10,13,14,15],[1, 2, 3, 5, 6, 8, 10, 13]]},
                    {id: 15, path: "assets/Roads/Road_End_Up.png", neighbours: 
                        [[0,2,6,7,8,12,13,14],[0,5,8,10,11,12,13,15],[1, 4,5,6,7,8,11,12],[0,4,7,9,11,12,14,15]]}
                ]
            break;
            case "Landscape":
                imageList = Landscape.getLandscapeRules();
            break;
            default:
                imageList = [
                    {id: 0, path: "assets/Nature/A.png", neighbours: [[0, 4],[0, 2],[0, 6],[0, 8]]},
                    {id: 1, path: "assets/Nature/AB_East_South.png", neighbours: [[9],[9],[2, 5],[3, 4]]},
                    {id: 2, path: "assets/Nature/AB_East.png", neighbours: [[2, 1],[9],[2, 5],[0, 8]]},
                    {id: 3, path: "assets/Nature/AB_North_East.png", neighbours: [[9],[4, 1],[7, 8],[9]]},
                    {id: 4, path: "assets/Nature/AB_North.png", neighbours: [[9],[4, 1],[0, 6],[4, 3]]},
                    {id: 5, path: "assets/Nature/AB_South_West.png", neighbours: [[1, 2],[9],[9],[6, 7]]},
                    {id: 6, path: "assets/Nature/AB_South.png", neighbours: [[0, 4],[6, 5],[9],[4, 7]]},
                    {id: 7, path: "assets/Nature/AB_West_North.png", neighbours: [[3, 8],[5, 6],[9],[9]]},
                    {id: 8, path: "assets/Nature/AB_West.png", neighbours: [[8, 3],[0, 2],[8, 7],[9]]},
                    {id: 9, path: "assets/Nature/B.png", neighbours: [[9, 6],[9, 8],[9, 4],[9, 2]]}
                ]
            break;
        }
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
