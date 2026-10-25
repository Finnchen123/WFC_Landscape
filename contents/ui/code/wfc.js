
//Holds all loaded images and neighbour lists
var images = [];

//Image/Tile size -> CHANGE THIS IF YOU HAVE OTHER IMAGE-SIZE
const SIZE = 32;

//Amount of different cells on the screen
var cell_count_x = 0;
var cell_count_y = 0;

//Holds all different cells
var map = [];

//Depth of propagation - Increase at own risk (Higher load) | Default: 2 (TESTED: 5 works but is slow, 10 breaks Plasma)
const DEPTH = 2;

// Each entry point supplies its Field constructor once.
var fieldConstructor = null;

function configure(createField) {
    fieldConstructor = createField;
    initialize();
}

function initialize() {
    map = [];
    if (!fieldConstructor) return;
    for (var i = 0; i < cell_count_x; i++) {
        map[i] = [];
        for (var j = 0; j < cell_count_y; j++) {
            map[i][j] = new fieldConstructor(i, j, { images: images, map: map, SIZE: SIZE, DEPTH: DEPTH });
        }
    }
}

function paintMatrix(ctx) {
    if (map.length === 0 || map[0].length === 0) return false;

    //Declare necessary variables
    var leastOptions = null;
    var availableCollapse = [];
    var counterCollapsed = 0;

    //Main logic - Find collapsable fields

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
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
        //Exit condition -> WFC implementation is currently not 100% correct. If possibleTypes.length == 0, exit current run
        if(leastOptions.possibleTypes.length == 0){
            return true;
        }
        var collapse = availableCollapse[Math.round(Math.random() * (availableCollapse.length - 1))];
        collapse.generateRandomType(ctx);
        collapse.propagate(0);
    }

    return counterCollapsed == map.length * map[0].length || availableCollapse.length <= 0;
}

// Image loading belongs to main.qml / testing.js, not to the WFC algorithm.
function saveImage(image, imageData) {
    images[image["id"]] = { id: image["id"], image: imageData, neighbours: image["neighbours"], isRoad: image["path"].toLowerCase().includes("road") };
}

function restart(ctx) {
    if (typeof ctx.reset === "function") ctx.reset();
    else ctx.clearRect(0, 0, cell_count_x * SIZE, cell_count_y * SIZE);
    initialize();
}

function dimensionChanged(width, height) {
    cell_count_x = Math.round(width / SIZE);
    cell_count_y = Math.round(height / SIZE);
    initialize();
}