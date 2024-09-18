//Holds all loaded images and neighbour lists
var images = [];

//Image/Tile size -> CHANGE THIS IF YOU HAVE OTHER IMAGE-SIZE
const SIZE = 32;

//Amount of different cells on the screen
var cell_count_x = 0;
var cell_count_y = 0;

//Holds all different cells
var map = [];

//Checks if it is the first paint iteration or not | true = reload initialize for correct map generation | false = run normally
var isFirstIteration = true;

//Depth of propagation - Increase at own risk (Higher load) | Default: 2 (TESTED: 5 works but is slow, 10 breaks Plasma)
const DEPTH = 2;

//Variables for measurements
var paintStart;
var paintEnd;
var duration;
var loopNumber;
var highestDuration;
var lowestDuration;
var gotError = false;

function initialize() {
    map = [];
    for (var i = 0; i < cell_count_x; i++) {
        map[i] = [];
        for (var j = 0; j < cell_count_y; j++) {
            map[i][j] = new Field(i,j);
        }
    }
}

function paintMatrix(ctx) {
    //return true;
    paintStart = new Date();
    //Declare necessary variables
    var leastOptions = null;
    var availableCollapse = [];
    var counterCollapsed = 0;

    //Check if everything is properly initialized
    if (isFirstIteration) {
        loopNumber = 0;
        highestDuration = 0;
        lowestDuration = 0;
        initialize();
        isFirstIteration = false;
        return false;
    }

    //Draw already collapsed fields
    for(var i = 0; i < map.length; i++){
        for(var j = 0; j < map[i].length; j++){
            if (map[i][j].collapsed) {
                map[i][j].paint(ctx);
                counterCollapsed++;
            }
        }
    }

    //Main logic - Find collapsable fields

    for(var i = 0; i < map.length; i++){
        for(var j = 0; j < map[i].length; j++){
            if (map[i][j].collapsed) continue;
            if (leastOptions == null) {
                leastOptions = map[i][j];
                availableCollapse.push(map[i][j]);
            }
            else {
                if (leastOptions.possibleTypes.length > map[i][j].possibleTypes.length) {
                    leastOptions = map[i][j];
                    availableCollapse = [];
                    availableCollapse.push(map[i][j]);
                }
                else if (leastOptions.possibleTypes.length == map[i][j].possibleTypes.length) {
                    availableCollapse.push(map[i][j]);
                }
            }
        }
    }

    //Main logic - Collapse one random field if possibilities > 1, else collapse all fields with possibilities = 1

    if (availableCollapse.length > 0) {
        var collapse = availableCollapse[Math.round(Math.random() * (availableCollapse.length - 1))];
        collapse.generateRandomType();
        collapse.propagate(0);
    }
    paintEnd = new Date();
    duration = Math.abs(paintStart - paintEnd);
    highestDuration = (highestDuration > duration) ? highestDuration : duration;
    lowestDuration = (lowestDuration < duration) ? lowestDuration : duration;
    loopNumber++;

    return counterCollapsed == map.length * map[0].length || availableCollapse.length <= 0;
}

function saveImage(image, ctx) {
    var imageData = ctx.createImageData(image["path"]);
    images[image["id"]] = { id: image["id"], image: imageData, neighbours: image["neighbours"] };
}

function restart(ctx) {
    console.log("Highest duration: " + highestDuration + "ms | Lowest duration: " + lowestDuration + "ms");
    console.log("-----------------------");
    gotError = false;
    ctx.reset();
    initialize();
}

function dimensionChanged(width, height) {
    cell_count_x = Math.round(width / SIZE);
    cell_count_y = Math.round(height / SIZE);
    initialize();
}

class Field {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.collapsed = false;
        this.type = null;
        this.possibleTypes = [];
        this.painted = false;
        for (var i = 0; i < images.length; i++) {
            this.possibleTypes[images[i]["id"]] = images[i]["id"];
        }
    }

    generateRandomType() {
        this.type = this.possibleTypes[Math.round(Math.random() * (this.possibleTypes.length - 1))];
        if(!Number.isInteger(this.type)){
            this.type = this.type.split("#")[0]
        }
        this.possibleTypes = [];
        this.possibleTypes.push(this.type);
        this.collapsed = true;
    }

    paint(ctx) {
        if (!this.painted) {
            ctx.drawImage(images[this.type]["image"], this.x * SIZE, this.y * SIZE);
            this.painted = true;
        }
    }

    propagate(currentDepth){
        var nextPropagation = [];
        var availableDirections = [];

        //Check for next fields to propagate
        if(this.x > 0){
            nextPropagation.push(map[this.x-1][this.y]);
            availableDirections.push([1, map[this.x-1][this.y].possibleTypes]);
        }

        if(this.x < map.length - 1){
            nextPropagation.push(map[this.x+1][this.y]);
            availableDirections.push([3, map[this.x+1][this.y].possibleTypes]);
        }

        if(this.y > 0){
            nextPropagation.push(map[this.x][this.y - 1]);
            availableDirections.push([2, map[this.x][this.y-1].possibleTypes]);
        }

        if(this.y < map[this.x].length - 1){
            nextPropagation.push(map[this.x][this.y + 1]);
            availableDirections.push([0, map[this.x][this.y+1].possibleTypes]);
        }

        //Main logic - Propagate this field
        if(!this.collapsed){
            var temp = [];
            var checker;

            availableDirections.sort((a,b) => a[1].length - b[1].length);
            for(var direction of availableDirections){
                for(var possibilities of direction[1]){
                    checker = images[possibilities]["neighbours"][direction[0]];
                    for(var possible of this.possibleTypes){
                        if(checker.includes(possible)){
                            temp.push(possible);
                        }
                    }
                }
                temp = [...new Set(temp)];
                this.possibleTypes = temp;
                temp = [];
            }
        }


        //Start neighbour propagation if DEPTH isn't reached
        if(currentDepth <= DEPTH){
            for(var field of nextPropagation){
                field.propagate(currentDepth+1);
            }
        }
    }
}