
//Holds all loaded images and neighbour lists
var images = [];

//Image/Tile size -> CHANGE THIS IF YOU HAVE OTHER IMAGE-SIZE
const SIZE = 32;

//Amount of different cells on the screen
var cell_count_x = 0;
var cell_count_y = 0;

//Holds all different cells
var map = [];

// Dungeon II uses a connected floor plan; other tilesets use unconstrained WFC.
var dungeonPlan = null;

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
    dungeonPlan = null;
    if (!fieldConstructor) return;
    for (var i = 0; i < cell_count_x; i++) {
        map[i] = [];
        for (var j = 0; j < cell_count_y; j++) {
            map[i][j] = new fieldConstructor(i, j, { images: images, map: map, SIZE: SIZE, DEPTH: DEPTH });
        }
    }
    if (images.length && images[0].generation === "dungeon") {
        initializeDungeonPlan();
    }
}

function paintMatrix(ctx) {
    if (map.length === 0 || map[0].length === 0) return false;

    //Declare necessary variables
    var leastOptions = null;
    var availableCollapse = [];

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

    // Grow a contiguous reveal frontier instead of picking unrelated cells.
    // Prefer cells touching more of the revealed region to fill gaps naturally.
    if (dungeonPlan) {
        availableCollapse = [];
        var bestContact = 0;
        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[x].length; y++) {
                if (map[x][y].collapsed) continue;
                var contact = (x > 0 && map[x - 1][y].collapsed ? 1 : 0) +
                              (x + 1 < map.length && map[x + 1][y].collapsed ? 1 : 0) +
                              (y > 0 && map[x][y - 1].collapsed ? 1 : 0) +
                              (y + 1 < map[x].length && map[x][y + 1].collapsed ? 1 : 0);
                if (contact > bestContact) {
                    bestContact = contact;
                    availableCollapse = [];
                }
                if (contact === bestContact && (contact > 0 || dungeonPlan.floors[x][y])) {
                    availableCollapse.push(map[x][y]);
                }
            }
        }
        // Tiny canvases can contain only rock; they still need to finish.
        if (!availableCollapse.length) {
            for (var x = 0; x < map.length; x++) {
                for (var y = 0; y < map[x].length; y++) {
                    if (!map[x][y].collapsed) availableCollapse.push(map[x][y]);
                }
            }
        }
    }

    // Collapse one selected cell per animation step.

    if (availableCollapse.length > 0) {
        //Exit condition -> WFC implementation is currently not 100% correct. If possibleTypes.length == 0, exit current run
        if(leastOptions.possibleTypes.length == 0){
            return true;
        }
        var collapse = availableCollapse[Math.floor(Math.random() * availableCollapse.length)];
        collapse.generateRandomType(ctx);
        if (!dungeonPlan) collapse.propagate(0);
        paintDecorations(ctx, collapse);
    }

    return availableCollapse.length === 0;
}

// Image loading belongs to main.qml / testing.js, not to the WFC algorithm.
function saveImage(image, imageData) {
    images[image["id"]] = { id: image["id"], image: imageData, neighbours: image["neighbours"], generation: image.generation, borderMask: image.borderMask };
}

function restart(ctx) {
    if (typeof ctx.reset === "function") ctx.reset();
    ctx.clearRect(0, 0, cell_count_x * SIZE, cell_count_y * SIZE);
    initialize();
}

function dimensionChanged(width, height) {
    cell_count_x = Math.max(0, Math.ceil(width / SIZE));
    cell_count_y = Math.max(0, Math.ceil(height / SIZE));
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
                var displaced = [];
                var priority = decorationPriority(rule);
                for (var dx = 0; dx < rule.width && fits; dx++) {
                    for (var dy = 0; dy < rule.height; dy++) {
                        var field = map[x + dx][y + dy];
                        var occupant = decorationOccupied[(x + dx) + "," + (y + dy)];
                        if (!field.collapsed || !field.painted ||
                            (occupant && decorationPriority(occupant.item.rule) >= priority) ||
                            rule.terrainIds.indexOf(field.type) === -1) {
                            fits = false;
                            break;
                        }
                        if (occupant && displaced.indexOf(occupant) === -1) displaced.push(occupant);
                    }
                }
                if (!fits) continue;
                // Roll once when the entire footprint has collapsed, not every frame.
                decorationAttempts[attempt] = true;
                if (Math.random() >= rule.chance) continue;
                // Small details must not permanently block a later house/tree.
                // Restore the full displaced sprite, including cells outside this footprint.
                for (var old of displaced) {
                    for (var ox = old.x; ox < old.x + old.item.rule.width; ox++) {
                        for (var oy = old.y; oy < old.y + old.item.rule.height; oy++) {
                            delete decorationOccupied[ox + "," + oy];
                            ctx.drawImage(images[map[ox][oy].type].image, ox * SIZE, oy * SIZE);
                        }
                    }
                    decorationPlacements.splice(decorationPlacements.indexOf(old), 1);
                }
                var placement = { item: item, x: x, y: y };
                for (var dx = 0; dx < rule.width; dx++) {
                    for (var dy = 0; dy < rule.height; dy++) {
                        decorationOccupied[(x + dx) + "," + (y + dy)] = placement;
                    }
                }
                decorationPlacements.push(placement);
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


function decorationPriority(rule) {
    if (rule.kind === "house") return 3;
    if (rule.kind === "tree") return 2;
    return 1;
}


// Plan rooms before tile collapse, so locally valid wall fragments cannot seal
// off a corridor or cause a late WFC contradiction. No recursion/backtracking.
function initializeDungeonPlan() {
    var width = cell_count_x;
    var height = cell_count_y;
    var floors = [];
    for (var x = 0; x < width; x++) {
        floors[x] = [];
        for (var y = 0; y < height; y++) floors[x][y] = false;
    }
    dungeonPlan = { floors: floors, rooms: [], connections: [] };
    if (!width || !height) return;

    function carve(x, y) {
        if (x >= 1 && y >= 1 && x < width - 1 && y < height - 1) floors[x][y] = true;
    }
    function randomInt(low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
    }
    function corridor(a, b) {
        var x = a.x, y = a.y;
        var horizontalFirst = Math.random() < 0.5;
        var breadth = Math.random() < 0.25 ? 3 : 2;
        function stamp(x, y, horizontal) {
            for (var offset = 0; offset < breadth; offset++) {
                carve(x + (horizontal ? 0 : offset), y + (horizontal ? offset : 0));
            }
        }
        function horizontal() {
            while (x !== b.x) { stamp(x, y, true); x += x < b.x ? 1 : -1; }
            stamp(x, y, true);
        }
        function vertical() {
            while (y !== b.y) { stamp(x, y, false); y += y < b.y ? 1 : -1; }
            stamp(x, y, false);
        }
        if (horizontalFirst) { horizontal(); vertical(); }
        else { vertical(); horizontal(); }
    }

    var rooms = dungeonPlan.rooms;
    var target = Math.max(1, Math.min(40, Math.round(width * height / randomInt(75, 150))));
    var maxWidth = Math.max(1, Math.min(14, width - 2));
    var maxHeight = Math.max(1, Math.min(12, height - 2));
    for (var attempt = 0; attempt < target * 40 && rooms.length < target; attempt++) {
        if (width < 3 || height < 3) break;
        var roomWidth = randomInt(Math.min(4, maxWidth), maxWidth);
        var roomHeight = randomInt(Math.min(4, maxHeight), maxHeight);
        var rx = randomInt(1, width - roomWidth - 1);
        var ry = randomInt(1, height - roomHeight - 1);
        var overlaps = false;
        for (var existing of rooms) {
            if (rx < existing.x + existing.width + 2 && rx + roomWidth + 2 > existing.x &&
                ry < existing.y + existing.height + 2 && ry + roomHeight + 2 > existing.y) {
                overlaps = true;
                break;
            }
        }
        if (overlaps) continue;
        var choice = Math.random();
        var shape = choice < 0.18 ? "rounded" : choice < 0.42 ? "alcove" : "rectangle";
        var corner = randomInt(0, 3);
        for (var dx = 0; dx < roomWidth; dx++) {
            for (var dy = 0; dy < roomHeight; dy++) {
                if (shape === "rounded") {
                    var nx = (dx - (roomWidth - 1) / 2) / (roomWidth / 2);
                    var ny = (dy - (roomHeight - 1) / 2) / (roomHeight / 2);
                    if (nx * nx + ny * ny > 1) continue;
                }
                if (shape === "alcove") {
                    var cx = corner & 1 ? roomWidth - 1 - dx : dx;
                    var cy = corner & 2 ? roomHeight - 1 - dy : dy;
                    if (cx < Math.floor(roomWidth / 3) && cy < Math.floor(roomHeight / 3)) continue;
                }
                carve(rx + dx, ry + dy);
            }
        }
        rooms.push({ x: rx, y: ry, width: roomWidth, height: roomHeight, shape: shape,
                     center: { x: rx + Math.floor(roomWidth / 2), y: ry + Math.floor(roomHeight / 2) } });
    }

    // Randomized spanning tree: every room is reachable, with no fixed traversal.
    var edges = [];
    for (var i = 0; i < rooms.length; i++) {
        for (var j = i + 1; j < rooms.length; j++) {
            var a = rooms[i].center, b = rooms[j].center;
            var distance = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
            edges.push({ a: i, b: j, cost: distance * (0.7 + Math.random() * 0.6) });
        }
    }
    edges.sort(function(a, b) { return a.cost - b.cost; });
    var connected = {};
    if (rooms.length) connected[randomInt(0, rooms.length - 1)] = true;
    var usedEdges = {};
    function connect(edge) {
        corridor(rooms[edge.a].center, rooms[edge.b].center);
        dungeonPlan.connections.push({ a: edge.a, b: edge.b });
        usedEdges[edge.a + "," + edge.b] = true;
        connected[edge.a] = true;
        connected[edge.b] = true;
    }
    for (var count = 1; count < rooms.length; count++) {
        for (var edge of edges) {
            if (!!connected[edge.a] !== !!connected[edge.b]) {
                connect(edge);
                break;
            }
        }
    }
    // Some runs have loops; others retain branches and dead-end chambers.
    var loops = randomInt(0, Math.floor(rooms.length / 3));
    for (var edge of edges) {
        if (!loops) break;
        if (!usedEdges[edge.a + "," + edge.b] && Math.random() < 0.35) {
            connect(edge);
            loops--;
        }
    }

    function isFloor(x, y) {
        return x >= 0 && y >= 0 && x < width && y < height && floors[x][y];
    }
    var borders = {};
    var floorTypes = [];
    var voidType;
    for (var tile of images) {
        if (tile.borderMask === 0) floorTypes.push(tile.id);
        else if (tile.borderMask === -1) voidType = tile.id;
        else borders[tile.borderMask] = tile.id;
    }
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var types;
            if (!floors[x][y]) types = [voidType];
            else {
                var mask = (isFloor(x, y - 1) ? 0 : 1) |
                           (isFloor(x + 1, y) ? 0 : 2) |
                           (isFloor(x, y + 1) ? 0 : 4) |
                           (isFloor(x - 1, y) ? 0 : 8);
                types = mask ? [borders[mask]] : floorTypes.slice();
            }
            map[x][y].possibleTypes = types;
        }
    }
}
