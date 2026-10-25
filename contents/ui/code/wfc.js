
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
    decorationPlacements = [];
    decorationOccupied = {};
    decorationAttempts = {};
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
        paintDecorations(ctx, collapse);
    }

    return counterCollapsed == map.length * map[0].length || availableCollapse.length <= 0;
}

// Image loading belongs to main.qml / testing.js, not to the WFC algorithm.
function saveImage(image, imageData) {
    images[image["id"]] = { id: image["id"], image: imageData, neighbours: image["neighbours"], isRoad: image["path"].toLowerCase().includes("road") };
}

function restart(ctx) {
    if (typeof ctx.reset === "function") ctx.reset();
    ctx.clearRect(0, 0, cell_count_x * SIZE, cell_count_y * SIZE);
    initialize();
}

function dimensionChanged(width, height) {
    cell_count_x = Math.round(width / SIZE);
    cell_count_y = Math.round(height / SIZE);
    initialize();
}
// Decoration images are separate from terrain options and never enter WFC.
var decorations = [];
var decorationPlacements = [];
var decorationOccupied = {};
var decorationAttempts = {};

function clearDecorations() {
    decorations = [];
    decorationPlacements = [];
    decorationOccupied = {};
    decorationAttempts = {};
}

function saveDecoration(rule, imageData) {
    decorations[rule.id] = { rule: rule, image: imageData };
}

// Only footprints containing the cell collapsed in this step can become ready.
function paintDecorations(ctx, collapsedField) {
    if (!collapsedField || !collapsedField.collapsed) return;
    var candidates = decorations.slice().sort(function(a, b) {
        return b.rule.width * b.rule.height - a.rule.width * a.rule.height;
    });
    for (var item of candidates) {
        var rule = item.rule;
        var minX = Math.max(0, collapsedField.x - rule.width + 1);
        var minY = Math.max(0, collapsedField.y - rule.height + 1);
        var maxX = Math.min(collapsedField.x, cell_count_x - rule.width);
        var maxY = Math.min(collapsedField.y, cell_count_y - rule.height);
        for (var y = minY; y <= maxY; y++) {
            for (var x = minX; x <= maxX; x++) {
                var attempt = rule.id + ":" + x + "," + y;
                if (decorationAttempts[attempt]) continue;
                var fits = true;
                for (var dx = 0; dx < rule.width && fits; dx++) {
                    for (var dy = 0; dy < rule.height; dy++) {
                        var field = map[x + dx][y + dy];
                        if (!field.collapsed || !field.painted ||
                            decorationOccupied[(x + dx) + "," + (y + dy)] ||
                            rule.terrainIds.indexOf(field.type) === -1) {
                            fits = false;
                            break;
                        }
                    }
                }
                if (!fits) continue;
                // Roll once when the entire footprint has collapsed, not every frame.
                decorationAttempts[attempt] = true;
                if (Math.random() >= rule.chance) continue;
                for (var dx = 0; dx < rule.width; dx++) {
                    for (var dy = 0; dy < rule.height; dy++) {
                        decorationOccupied[(x + dx) + "," + (y + dy)] = true;
                    }
                }
                decorationPlacements.push({ item: item, x: x, y: y });
                // All underlying cells are already painted and never paint again.
                ctx.drawImage(item.image, x * SIZE, y * SIZE);
            }
        }
    }
}


// Tileset changes must discard images with IDs left over from a larger set.
function clearTiles() {
    images = [];
    clearDecorations();
}
