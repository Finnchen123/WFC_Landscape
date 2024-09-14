var images = [];

var isDefaultSize = true;
var size_width = 16;
var size_height = 16;

var cell_count_x = 0;
var cell_count_y = 0;

var map = [];

var isFirstIteration = true;

var nextChoices = [];

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
        propagateMap(randomStart);
    }
}

function propagateMap(mapIndex) {
    var collapsedX = map[mapIndex].x;
    var collapsedY = map[mapIndex].y;
    var collapsedType = map[mapIndex].type;

    nextChoices = [];

    for (var field of map) {
        if (field.collapsed) continue;
        if (field.x == collapsedX - 1 && field.y == collapsedY) { //West to collapsed
            field.propagateWest(collapsedType);
            nextChoices.push(field);
        }
        if (field.x == collapsedX + 1 && field.y == collapsedY) { //East to collapsed
            field.propagateEast(collapsedType);
            nextChoices.push(field);
        }
        if (field.y == collapsedY - 1 && field.x == collapsedX) { //North to collapsed
            field.propagateNorth(collapsedType);
            nextChoices.push(field);
        }
        if (field.y == collapsedY + 1 && field.X == collapsedX) { //South to collapsed
            field.propagateSouth(collapsedType);
            nextChoices.push(field);
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
    var toCheck = (nextChoices.length > 0) ? nextChoices : map;
    for (var field of toCheck) {
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
                propagateMap(map.indexOf(toCollapse));
            }
        }
        else{
            var collapse = availableCollapse[Math.round(Math.random() * (availableCollapse.length - 1))];
            map[map.indexOf(collapse)].generateRandomType();
            propagateMap(map.indexOf(collapse));
        }
    }

    return counterCollapsed == map.length || availableCollapse.length <= 0;


    /*ctx.drawImage(images[1]["image"], 0, 0);
    console.log(images[0]["id"] + "/" + images[0].neighbours);*/


    //TEST Image pixel detection
    //STATE -> Pixel detection works but order of pixels seem not correct

    /*var indexFirst = 0; //First in order on the axis: Example for x => North
    var indexSecond = 0; //Second in order on the axis: Example for x => South
    var borderPixel = [{pixels: []},{pixels: []},{pixels: []},{pixels: []}];

    for(var x = 0; x < images[1]["image"].width * 4; x = x + 4){
        indexFirst = x;
        indexSecond = x + images[1]["image"].height * (images[1]["image"].width - 1)
        borderPixel[0].pixels.push(images[1]["image"].data[indexFirst]);
        borderPixel[2].pixels.push(images[1]["image"].data[indexSecond]);
    }

    for(var y = 0; y < images[1]["image"].height * 4; y = y + 4){
        indexFirst = images[1]["image"].width - 1 + y * images[1]["image"].width;
        indexSecond = 0 + y * images[1]["image"].width;
        borderPixel[1].pixels.push(images[1]["image"].data[indexFirst]);
        borderPixel[3].pixels.push(images[1]["image"].data[indexSecond]);
    }
    console.log(borderPixel[2]["pixels"]);*/
    return true;
}

function saveImage(image, ctx) {
    var imageData = ctx.createImageData(image["path"]);
    images.push({ id: image["id"], image: imageData, neighbours: image["neighbours"] });
    if (isDefaultSize) {
        size_width = imageData.width;
        size_height = imageData.height;
        isDefaultSize = false;
    }
}

function restart(ctx) {
    ctx.reset();
    initialize();
}

function dimensionChanged(width, height) {
    cell_count_x = Math.round(width / size_width);
    cell_count_y = Math.round(height / size_height);
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
        this.collapsed = true;
    }

    paint(ctx) {
        if (!this.painted) {
            if (this.type) {
                ctx.drawImage(images[this.type]["image"], this.x * size_width, this.y * size_height);
                this.painted = true;
            }
        }
    }

    propagateWest(collapsedType) {
        var possibilities = images[collapsedType]["neighbours"][3];
        this.possibleTypes = this.possibleTypes.filter(element => possibilities.includes(element));
    }

    propagateEast(collapsedType) {
        var possibilities = images[collapsedType]["neighbours"][1];
        this.possibleTypes = this.possibleTypes.filter(element => possibilities.includes(element));
    }

    propagateNorth(collapsedType) {
        var possibilities = images[collapsedType]["neighbours"][0];
        this.possibleTypes = this.possibleTypes.filter(element => possibilities.includes(element));
    }

    propagateSouth(collapsedType) {
        var possibilities = images[collapsedType]["neighbours"][2];
        this.possibleTypes = this.possibleTypes.filter(element => possibilities.includes(element));
    }

    changePossibleTypes(collapsedType) {
        //Get what type was collapsed - int
        //Return new possible types - Array
    }
}