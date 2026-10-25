// BEGIN SERENE VILLAGE RULES
// North, East, South, West. Shore corners require a straight segment between them.
function getSereneVillageRules() {
    var rules = [
        { id: 0, path: "assets/SereneVillage/grass.png", neighbours: [[0,3,11],[0,6,14],[0,8,16],[0,5,13]] },
        { id: 1, path: "assets/SereneVillage/dirt.png", neighbours: [[1,7,8,9],[1,2,5,7],[1,2,3,4],[1,4,6,9]] },
        { id: 2, path: "assets/SereneVillage/grass_dirt_nw.png", neighbours: [[1,7,8,9],[3,4],[5,7],[1,4,6,9]] },
        { id: 3, path: "assets/SereneVillage/grass_dirt_n.png", neighbours: [[1,7,8,9],[3,4],[0,8,16],[2,3]] },
        { id: 4, path: "assets/SereneVillage/grass_dirt_ne.png", neighbours: [[1,7,8,9],[1,2,5,7],[6,9],[2,3]] },
        { id: 5, path: "assets/SereneVillage/grass_dirt_w.png", neighbours: [[2,5],[0,6,14],[5,7],[1,4,6,9]] },
        { id: 6, path: "assets/SereneVillage/grass_dirt_e.png", neighbours: [[4,6],[1,2,5,7],[6,9],[0,5,13]] },
        { id: 7, path: "assets/SereneVillage/grass_dirt_sw.png", neighbours: [[2,5],[8,9],[1,2,3,4],[1,4,6,9]] },
        { id: 8, path: "assets/SereneVillage/grass_dirt_s.png", neighbours: [[0,3,11],[8,9],[1,2,3,4],[7,8]] },
        { id: 9, path: "assets/SereneVillage/grass_dirt_se.png", neighbours: [[4,6],[1,2,5,7],[1,2,3,4],[7,8]] },
        { id: 10, path: "assets/SereneVillage/grass_water_nw.png", neighbours: [[15,16,17,18],[11],[13],[12,14,17,18]] },
        { id: 11, path: "assets/SereneVillage/grass_water_n.png", neighbours: [[15,16,17,18],[11,12],[0,8],[10,11]] },
        { id: 12, path: "assets/SereneVillage/grass_water_ne.png", neighbours: [[15,16,17,18],[10,13,15,18],[14],[11]] },
        { id: 13, path: "assets/SereneVillage/grass_water_w.png", neighbours: [[10,13],[0,6],[13,15],[12,14,17,18]] },
        { id: 14, path: "assets/SereneVillage/grass_water_e.png", neighbours: [[12,14],[10,13,15,18],[14,17],[0,5]] },
        { id: 15, path: "assets/SereneVillage/grass_water_sw.png", neighbours: [[13],[16],[10,11,12,18],[12,14,17,18]] },
        { id: 16, path: "assets/SereneVillage/grass_water_s.png", neighbours: [[0,3],[16,17],[10,11,12,18],[15,16]] },
        { id: 17, path: "assets/SereneVillage/grass_water_se.png", neighbours: [[14],[10,13,15,18],[10,11,12,18],[16]] },
        { id: 18, path: "assets/SereneVillage/water.png", neighbours: [[15,16,17,18],[10,13,15,18],[10,11,12,18],[12,14,17,18]] }
    ]

    return rules;
}
// END SERENE VILLAGE RULES


// Complete sprites placed during terrain collapse; dimensions are in grid cells.
function getSereneVillageDecorations() {
    return [
        {"id": 0, "path": "assets/SereneVillage/house_red.png", "width": 3, "height": 4, "kind": "house", "chance": 0.10, "terrainIds": [0, 1]},
        {"id": 1, "path": "assets/SereneVillage/house_gable.png", "width": 4, "height": 4, "kind": "house", "chance": 0.08, "terrainIds": [0, 1]},
        {"id": 2, "path": "assets/SereneVillage/tree_green.png", "width": 2, "height": 3, "kind": "tree", "chance": 0.18, "terrainIds": [0, 1]},
        {"id": 3, "path": "assets/SereneVillage/tree_blue.png", "width": 2, "height": 3, "kind": "tree", "chance": 0.12, "terrainIds": [0, 1]},
        {"id": 4, "path": "assets/SereneVillage/tree_small.png", "width": 2, "height": 3, "kind": "tree", "chance": 0.15, "terrainIds": [0, 1]},
        {"id": 5, "path": "assets/SereneVillage/rock.png", "width": 1, "height": 1, "kind": "rock", "chance": 0.1, "terrainIds": [0, 1]},
        {"id": 6, "path": "assets/SereneVillage/bush.png", "width": 1, "height": 1, "kind": "plant", "chance": 0.06, "terrainIds": [0, 1]},
        {"id": 7, "path": "assets/SereneVillage/flowers_red.png", "width": 1, "height": 1, "kind": "plant", "chance": 0.05, "terrainIds": [0, 1]},
        {"id": 8, "path": "assets/SereneVillage/flowers_blue.png", "width": 1, "height": 1, "kind": "plant", "chance": 0.05, "terrainIds": [0, 1]},
        {"id": 9, "path": "assets/SereneVillage/flowers_yellow.png", "width": 1, "height": 1, "kind": "plant", "chance": 0.05, "terrainIds": [0, 1]},
        {"id": 10, "path": "assets/SereneVillage/daisies.png", "width": 1, "height": 2, "kind": "plant", "chance": 0.04, "terrainIds": [0, 1]}
    ];
}

function getMiniWorldRules() {
    return [
        {"id": 0, "path": "assets/MiniWorld/grass.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]},
        {"id": 1, "path": "assets/MiniWorld/water.png", "neighbours": [[1, 13, 14, 15], [1, 8, 11, 13], [1, 8, 9, 10], [1, 10, 12, 15]]},
        {"id": 2, "path": "assets/MiniWorld/grass_texture_0_0.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]},
        {"id": 3, "path": "assets/MiniWorld/grass_texture_1_0.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]},
        {"id": 4, "path": "assets/MiniWorld/grass_texture_2_0.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]},
        {"id": 5, "path": "assets/MiniWorld/grass_texture_0_1.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]},
        {"id": 6, "path": "assets/MiniWorld/grass_texture_1_1.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]},
        {"id": 7, "path": "assets/MiniWorld/grass_texture_2_1.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]},
        {"id": 8, "path": "assets/MiniWorld/coast_nw.png", "neighbours": [[1, 13, 14, 15], [9, 16], [11, 16], [1, 10, 12, 15]]},
        {"id": 9, "path": "assets/MiniWorld/coast_n.png", "neighbours": [[1, 13, 14, 15], [9, 10, 16], [0, 2, 3, 4, 5, 6, 7, 18, 19], [8, 9, 17]]},
        {"id": 10, "path": "assets/MiniWorld/coast_ne.png", "neighbours": [[1, 13, 14, 15], [1, 8, 11, 13], [12, 17], [9, 17]]},
        {"id": 11, "path": "assets/MiniWorld/coast_w.png", "neighbours": [[8, 11, 18], [0, 2, 3, 4, 5, 6, 7, 17, 19], [11, 13, 16], [1, 10, 12, 15]]},
        {"id": 12, "path": "assets/MiniWorld/coast_e.png", "neighbours": [[10, 12, 19], [1, 8, 11, 13], [12, 15, 17], [0, 2, 3, 4, 5, 6, 7, 16, 18]]},
        {"id": 13, "path": "assets/MiniWorld/coast_sw.png", "neighbours": [[11, 18], [14, 18], [1, 8, 9, 10], [1, 10, 12, 15]]},
        {"id": 14, "path": "assets/MiniWorld/coast_s.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 16, 17], [14, 15, 18], [1, 8, 9, 10], [13, 14, 19]]},
        {"id": 15, "path": "assets/MiniWorld/coast_se.png", "neighbours": [[12, 19], [1, 8, 11, 13], [1, 8, 9, 10], [14, 19]]},
        {"id": 16, "path": "assets/MiniWorld/coast_inner_nw.png", "neighbours": [[8, 11, 18], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [8, 9, 17]]},
        {"id": 17, "path": "assets/MiniWorld/coast_inner_ne.png", "neighbours": [[10, 12, 19], [9, 10, 16], [0, 2, 3, 4, 5, 6, 7, 14, 18, 19], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]},
        {"id": 18, "path": "assets/MiniWorld/coast_inner_sw.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [0, 2, 3, 4, 5, 6, 7, 12, 17, 19], [11, 13, 16], [13, 14, 19]]},
        {"id": 19, "path": "assets/MiniWorld/coast_inner_se.png", "neighbours": [[0, 2, 3, 4, 5, 6, 7, 9, 16, 17], [14, 15, 18], [12, 15, 17], [0, 2, 3, 4, 5, 6, 7, 11, 16, 18]]}
    ];
}

function getMiniWorldDecorations() {
    return [
        {"id": 0, "path": "assets/MiniWorld/house_red.png", "width": 1, "height": 1, "kind": "house", "chance": 0.12, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 1, "path": "assets/MiniWorld/house_tall.png", "width": 1, "height": 1, "kind": "house", "chance": 0.1, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 2, "path": "assets/MiniWorld/hut.png", "width": 1, "height": 1, "kind": "house", "chance": 0.08, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 3, "path": "assets/MiniWorld/tower.png", "width": 1, "height": 1, "kind": "house", "chance": 0.06, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 4, "path": "assets/MiniWorld/tree_round.png", "width": 1, "height": 1, "kind": "tree", "chance": 0.18, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 5, "path": "assets/MiniWorld/tree_pine.png", "width": 1, "height": 1, "kind": "tree", "chance": 0.12, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 6, "path": "assets/MiniWorld/rock.png", "width": 1, "height": 1, "kind": "rock", "chance": 0.08, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 7, "path": "assets/MiniWorld/keep.png", "width": 3, "height": 2, "kind": "house", "chance": 0.12, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 8, "path": "assets/MiniWorld/chapel.png", "width": 1, "height": 1, "kind": "house", "chance": 0.04, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 9, "path": "assets/MiniWorld/market.png", "width": 1, "height": 1, "kind": "house", "chance": 0.04, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 10, "path": "assets/MiniWorld/wheat.png", "width": 1, "height": 1, "kind": "plant", "chance": 0.08, "terrainIds": [0, 2, 3, 4, 5, 6, 7]},
        {"id": 11, "path": "assets/MiniWorld/palm.png", "width": 1, "height": 1, "kind": "tree", "chance": 0.05, "terrainIds": [0, 2, 3, 4, 5, 6, 7]}
    ];
}

// Room borders: bits North=1, East=2, South=4, West=8; -1 is solid rock.
function getDungeonIIRules() {
    return [
        {"id": 0, "path": "assets/DungeonII/floor_1.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 0},
        {"id": 1, "path": "assets/DungeonII/floor_2.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 0},
        {"id": 2, "path": "assets/DungeonII/floor_3.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 0},
        {"id": 3, "path": "assets/DungeonII/floor_4.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 0},
        {"id": 4, "path": "assets/DungeonII/floor_5.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 0},
        {"id": 5, "path": "assets/DungeonII/floor_6.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 0},
        {"id": 6, "path": "assets/DungeonII/floor_7.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 0},
        {"id": 7, "path": "assets/DungeonII/floor_8.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 0},
        {"id": 8, "path": "assets/DungeonII/void.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [8, 16, 17, 18, 19, 20, 21, 22, 23], [8, 9, 11, 13, 15, 17, 19, 21, 23], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": -1},
        {"id": 9, "path": "assets/DungeonII/room_border_1.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 1},
        {"id": 10, "path": "assets/DungeonII/room_border_2.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [8, 16, 17, 18, 19, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 2},
        {"id": 11, "path": "assets/DungeonII/room_border_3.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [8, 16, 17, 18, 19, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 3},
        {"id": 12, "path": "assets/DungeonII/room_border_4.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [8, 9, 11, 13, 15, 17, 19, 21, 23], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 4},
        {"id": 13, "path": "assets/DungeonII/room_border_5.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [8, 9, 11, 13, 15, 17, 19, 21, 23], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 5},
        {"id": 14, "path": "assets/DungeonII/room_border_6.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [8, 16, 17, 18, 19, 20, 21, 22, 23], [8, 9, 11, 13, 15, 17, 19, 21, 23], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 6},
        {"id": 15, "path": "assets/DungeonII/room_border_7.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [8, 16, 17, 18, 19, 20, 21, 22, 23], [8, 9, 11, 13, 15, 17, 19, 21, 23], [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 13, 16, 17, 20, 21]], "generation": "dungeon", "borderMask": 7},
        {"id": 16, "path": "assets/DungeonII/room_border_8.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": 8},
        {"id": 17, "path": "assets/DungeonII/room_border_9.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": 9},
        {"id": 18, "path": "assets/DungeonII/room_border_10.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [8, 16, 17, 18, 19, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": 10},
        {"id": 19, "path": "assets/DungeonII/room_border_11.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [8, 16, 17, 18, 19, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 20, 22], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": 11},
        {"id": 20, "path": "assets/DungeonII/room_border_12.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [8, 9, 11, 13, 15, 17, 19, 21, 23], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": 12},
        {"id": 21, "path": "assets/DungeonII/room_border_13.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15], [8, 9, 11, 13, 15, 17, 19, 21, 23], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": 13},
        {"id": 22, "path": "assets/DungeonII/room_border_14.png", "neighbours": [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 16, 17, 18, 19], [8, 16, 17, 18, 19, 20, 21, 22, 23], [8, 9, 11, 13, 15, 17, 19, 21, 23], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": 14},
        {"id": 23, "path": "assets/DungeonII/room_border_15.png", "neighbours": [[8, 12, 13, 14, 15, 20, 21, 22, 23], [8, 16, 17, 18, 19, 20, 21, 22, 23], [8, 9, 11, 13, 15, 17, 19, 21, 23], [8, 10, 11, 14, 15, 18, 19, 22, 23]], "generation": "dungeon", "borderMask": 15}
    ];
}

function getDungeonIIDecorations() {
    return [
        {"id": 0, "path": "assets/DungeonII/chest.png", "width": 1, "height": 1, "kind": "house", "chance": 0.06, "terrainIds": [0, 1, 2, 3, 4, 5, 6, 7]},
        {"id": 1, "path": "assets/DungeonII/crate.png", "width": 1, "height": 2, "kind": "rock", "chance": 0.05, "terrainIds": [0, 1, 2, 3, 4, 5, 6, 7]},
        {"id": 2, "path": "assets/DungeonII/column.png", "width": 1, "height": 3, "kind": "tree", "chance": 0.04, "terrainIds": [0, 1, 2, 3, 4, 5, 6, 7]},
        {"id": 3, "path": "assets/DungeonII/skull.png", "width": 1, "height": 1, "kind": "plant", "chance": 0.025, "terrainIds": [0, 1, 2, 3, 4, 5, 6, 7]},
        {"id": 4, "path": "assets/DungeonII/flask_red.png", "width": 1, "height": 1, "kind": "plant", "chance": 0.025, "terrainIds": [0, 1, 2, 3, 4, 5, 6, 7]},
        {"id": 5, "path": "assets/DungeonII/flask_blue.png", "width": 1, "height": 1, "kind": "plant", "chance": 0.025, "terrainIds": [0, 1, 2, 3, 4, 5, 6, 7]}
    ];
}

// Shared entry points for the Plasma settings and browser preview.
function getRulesForTileset(tileset) {
    switch (tileset) {
        case "MiniWorld": return getMiniWorldRules();
        case "DungeonII": return getDungeonIIRules();
        default: return getSereneVillageRules();
    }
}

function getDecorationsForTileset(tileset) {
    switch (tileset) {
        case "MiniWorld": return getMiniWorldDecorations();
        case "DungeonII": return getDungeonIIDecorations();
        default: return getSereneVillageDecorations();
    }
}
