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

//Depth of propagation - Increase at own risk (Higher load) | Default: 1 (TESTED: 10 breaks Plasma)
const DEPTH = 5;

function initialize() {
    map = [];
    for (var i = 0; i < cell_count_x; i++) {
        for (var j = 0; j < cell_count_y; j++) {
            map.push(new Field(i, j));
        }
    }
    var randomStart = Math.round(Math.random() * (map.length - 1));
    if (map.length > 0 && !isFirstIteration) {
        map[randomStart].generateRandomType();
        propagateMap(randomStart, 1);
    }
}

function propagateMap(mapIndex, currentDepth) {
    var collapsedX = map[mapIndex].x;
    var collapsedY = map[mapIndex].y;
    var possibleTypes = map[mapIndex].possibleTypes;
    var propagateCount = 0;

    for (var field of map) {
        if (field.collapsed) continue;
        if (field.x == collapsedX - 1 && field.y == collapsedY) { //West to collapsed
            field.propagateWest(possibleTypes);
            propagateCount++;
            if(currentDepth <= DEPTH){
                propagateMap(map.indexOf(field), currentDepth+1);
            }
        }
        if (field.x == collapsedX + 1 && field.y == collapsedY) { //East to collapsed
            field.propagateEast(possibleTypes);
            propagateCount++;
            if(currentDepth <= DEPTH){
                propagateMap(map.indexOf(field), currentDepth+1);
            }
        }
        if (field.y == collapsedY - 1 && field.x == collapsedX) { //North to collapsed
            field.propagateNorth(possibleTypes);
            propagateCount++;
            if(currentDepth <= DEPTH){
                propagateMap(map.indexOf(field), currentDepth+1);
            }
        }
        if (field.y == collapsedY + 1 && field.X == collapsedX) { //South to collapsed
            field.propagateSouth(possibleTypes);
            propagateCount++;
            if(currentDepth <= DEPTH){
                propagateMap(map.indexOf(field), currentDepth+1);
            }
        }
        if(propagateCount >= 4){
            break;
        }
    }
}

function paintMatrix(ctx) {
    //Declare necessary variables
    var leastOptions = null;
    var availableCollapse = [];
    var counterCollapsed = 0;

    //Check if everything is properly initialized
    if (isFirstIteration) {
        initialize();
        isFirstIteration = false;
        return false;
    }

    //Draw already collapsed fields
    for (var field of map) {
        if (field.collapsed) {
            field.paint(ctx);
            counterCollapsed++;
        }
    }

    //Main logic - Find collapsable fields
    
    for (var field of map) {
        if(field.collapsed) continue;
        if (leastOptions == null) {
            leastOptions = field;
            availableCollapse.push(field);
        }
        else {
            if (leastOptions.possibleTypes.length > field.possibleTypes.length) {
                leastOptions = field;
                availableCollapse = [];
                availableCollapse.push(field);
            }
            else if (leastOptions.possibleTypes.length == field.possibleTypes.length) {
                availableCollapse.push(field);
            }
        }
    }

    //Main logic - Collapse one random field if possibilities > 1, else collapse all fields with possibilities = 1

    if (availableCollapse.length > 0) {
        if(leastOptions.possibleTypes.length === 1){
            for(var toCollapse of availableCollapse){
                map[map.indexOf(toCollapse)].generateRandomType();
                propagateMap(map.indexOf(toCollapse), 1);
            }
        }
        else{
            var collapse = availableCollapse[Math.round(Math.random() * (availableCollapse.length - 1))];
            map[map.indexOf(collapse)].generateRandomType();
            propagateMap(map.indexOf(collapse), 1);
        }
    }

    return counterCollapsed == map.length || availableCollapse.length <= 0;
}

function saveImage(image, ctx) {
    var imageData = ctx.createImageData(image["path"]);
    images[image["id"]] = { id: image["id"], image: imageData, neighbours: image["neighbours"] };
}

function restart(ctx) {
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
            this.possibleTypes.push(i);
        }
    }

    generateRandomType() {
        this.type = this.possibleTypes[Math.round(Math.random() * (this.possibleTypes.length - 1))];
        this.possibleTypes = [];
        this.possibleTypes.push(this.type);
        this.collapsed = true;
    }

    paint(ctx) {
        if (!this.painted) {
            if (this.type) {
                ctx.drawImage(images[this.type]["image"], this.x * SIZE, this.y * SIZE);
                this.painted = true;
            }
        }
    }

    propagateWest(possibleTypes) {
        var possibilities = this.generateNeighbourList(possibleTypes, 3);
        this.possibleTypes = this.possibleTypes.filter(element => possibilities.includes(element));
    }

    propagateEast(possibleTypes) {
        var possibilities = this.generateNeighbourList(possibleTypes, 1);
        this.possibleTypes = this.possibleTypes.filter(element => possibilities.includes(element));
    }

    propagateNorth(possibleTypes) {
        var possibilities = this.generateNeighbourList(possibleTypes, 0);
        this.possibleTypes = this.possibleTypes.filter(element => possibilities.includes(element));
    }

    propagateSouth(possibleTypes) {
        var possibilities = this.generateNeighbourList(possibleTypes, 2);
        this.possibleTypes = this.possibleTypes.filter(element => possibilities.includes(element));
    }

    generateNeighbourList(possibleTypes, direction){
        var result = [];
        for(var possible of possibleTypes){
            result = result.concat(images[possible]["neighbours"][direction]);
        }
        return result;
    }

    changePossibleTypes(collapsedType) {
        //Get what type was collapsed - int
        //Return new possible types - Array
    }
}