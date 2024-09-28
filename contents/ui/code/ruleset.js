//TODO: REMOVE TYPED ROADS -> ONE SINGLE ROAD TYPE

function getLandscapeRules() {
    var rules = [
        { id: 0, path: "assets/Landscape/Gras.png", neighbours: [[0, 3, 4, 5, 7, 11, 12, 13, 17], [0, 3, 4, 6, 10, 13, 15, 16, 17], [0, 4, 5, 6, 7, 8, 14, 15, 17], [0, 3, 5, 6, 9, 12, 14, 16, 17]] },
        { id: 1, path: "assets/Landscape/Lava.png", neighbours: [[1, 3, 4, 5, 7, 11, 12, 13, 19], [1, 3, 4, 6, 10, 13, 15, 16, 19], [1, 4, 5, 6, 7, 8, 14, 15, 19], [1, 3, 5, 6, 9, 12, 14, 16, 19]] },
        { id: 2, path: "assets/Landscape/Road_Center.png", neighbours: [[6, 8, 9, 10, 14, 15, 16], [5, 7, 8, 9, 11, 12, 14], [3, 9, 10, 11, 12, 13, 16], [4, 7, 8, 10, 11, 13, 15]] },
        { id: 3, path: "assets/Landscape/Road_End_Down.png", neighbours: [[2, 8, 9, 10, 14, 15, 16], [0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20]] },
        { id: 4, path: "assets/Landscape/Road_End_Left.png", neighbours: [[0, 1, 17, 18, 19, 20], [2, 7, 8, 9, 11, 12, 14], [0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20]] },
        { id: 5, path: "assets/Landscape/Road_End_Right.png", neighbours: [[0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20], [2, 7, 8, 10, 11, 13, 15]] },
        { id: 6, path: "assets/Landscape/Road_End_Up.png", neighbours: [[0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20], [2, 9, 10, 11, 12, 13, 16], [0, 1, 17, 18, 19, 20]] },
        { id: 7, path: "assets/Landscape/Road_Horizontal.png", neighbours: [[0, 1, 17, 18, 19, 20], [2, 5, 7, 8, 9, 11, 12, 14], [0, 1, 17, 18, 19, 20], [2, 4, 7, 8, 10, 11, 13, 15]] },
        { id: 8, path: "assets/Landscape/Road_T_Down.png", neighbours: [[0, 1, 17, 18, 19, 20], [2, 5, 7, 8, 9, 11, 12, 14], [2, 3, 9, 10, 12, 13, 16], [2, 4, 7, 8, 10, 11, 13, 15]] },
        { id: 9, path: "assets/Landscape/Road_T_Left.png", neighbours: [[2, 6, 8, 9, 10, 14, 15, 16], [0, 1, 17, 18, 19, 20], [2, 3, 9, 10, 11, 12, 13, 16], [2, 4, 7, 8, 11, 13, 15]] },
        { id: 10, path: "assets/Landscape/Road_T_Right.png", neighbours: [[2, 6, 8, 9, 10, 14, 15, 16], [2, 5, 7, 8, 11, 12, 14], [2, 3, 9, 10, 11, 12, 13, 16], [0, 1, 17, 18, 19, 20]] },
        { id: 11, path: "assets/Landscape/Road_T_Up.png", neighbours: [[2, 6, 9, 10, 14, 15, 16], [2, 5, 7, 8, 9, 11, 12, 14], [0, 1, 17, 18, 19, 20], [2, 4, 7, 8, 10, 11, 13, 15]] },
        { id: 12, path: "assets/Landscape/Road_Turn_Down_Left.png", neighbours: [[2, 6, 8, 9, 10, 14, 15, 16], [0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20], [2, 4, 7, 8, 10, 11, 13, 15]] },
        { id: 13, path: "assets/Landscape/Road_Turn_Left_Up.png", neighbours: [[2, 6, 8, 9, 10, 14, 15, 16], [2, 5, 7, 8, 9, 11, 12, 14], [0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20]] },
        { id: 14, path: "assets/Landscape/Road_Turn_Right_Down.png", neighbours: [[0, 1, 17, 18, 19, 20], [0, 1, 17, 18, 19, 20], [2, 3, 9, 10, 11, 12, 13, 16], [2, 4, 7, 8, 10, 11, 13, 15]] },
        { id: 15, path: "assets/Landscape/Road_Turn_Up_Right.png", neighbours: [[0, 1, 17, 18, 19, 20], [2, 5, 7, 8, 9, 11, 12, 14], [2, 3, 9, 10, 11, 12, 13, 16], [0, 1, 17, 18, 19, 20]] },
        { id: 16, path: "assets/Landscape/Road_Vertical.png", neighbours: [[2, 6, 8, 9, 10, 14, 15, 16], [0, 1, 17, 18, 19, 20], [2, 3, 9, 10, 11, 12, 13, 16], [0, 1, 17, 18, 19, 20]] },
        { id: 17, path: "assets/Landscape/Sand.png", neighbours: [[17, 3, 4, 5, 7, 11, 12, 13, 0, 20], [17, 3, 4, 6, 10, 13, 15, 16, 0, 20], [17, 4, 5, 6, 7, 8, 14, 15, 0, 20], [17, 3, 5, 6, 9, 12, 14, 16, 0, 20]] },
        { id: 18, path: "assets/Landscape/Snow.png", neighbours: [[18, 3, 4, 5, 7, 11, 12, 13, 20, 19], [18, 3, 4, 6, 10, 13, 15, 16, 20, 19], [18, 4, 5, 6, 7, 8, 14, 15, 20, 19], [18, 3, 5, 6, 9, 12, 14, 16, 20, 19]] },
        { id: 19, path: "assets/Landscape/Stone.png", neighbours: [[19, 3, 4, 5, 7, 11, 12, 13, 18, 1], [19, 3, 4, 6, 10, 13, 15, 16, 18, 1], [19, 4, 5, 6, 7, 8, 14, 15, 18, 1], [19, 3, 5, 6, 9, 12, 14, 16, 18, 1]] },
        { id: 20, path: "assets/Landscape/Water.png", neighbours: [[20, 3, 4, 5, 7, 11, 12, 13, 17, 18], [20, 3, 4, 6, 10, 13, 15, 16, 17, 18], [20, 4, 5, 6, 7, 8, 14, 15, 17, 18], [20, 3, 5, 6, 9, 12, 14, 16, 17, 18]] }
    ]
    return rules;
}

function getDungeonRules() {
    var rules = [
        { id: 0, path: "assets/Dungeon/Door_Front.png", neighbours: [[3,13,15,16],[7,10,21,22,14,18,20],[1,2,11,13,14],[8,10,21,22,14,17,19]] },
        { id: 1, path: "assets/Dungeon/Door_South.png", neighbours: [[0,2,10,21,22,14],[5,11,16,19],[3,14,17,18],[6,11,15,20]] },
        { id: 2, path: "assets/Dungeon/Floor.png", neighbours: [[0,2,10,21,22,14],[2,9],[1,2,10,21,22,13],[2,12]] },
        { id: 3, path: "assets/Dungeon/Hallway_Vertical.png", neighbours: [[1,3,7,8,13,15,16,17,18,19,20],[3,4,6,8,12,15,17],[0,3,5,6,14,15,16,17,18,19,20],[3,4,5,7,9,16,18]] },
        { id: 4, path: "assets/Dungeon/Roof.png", neighbours: [[4,5,6,11],[3,4,6,8,12,15,17],[4,7,8,10,21,22],[3,4,5,7,9,16,18]] },
        { id: 5, path: "assets/Dungeon/Wall_Corner_Down_Left.png", neighbours: [[3,7,9,18,20],[3,4,6,8,12,15,17],[4,7,8,10,21,22],[1,6,11,13,15,20]] },
        { id: 6, path: "assets/Dungeon/Wall_Corner_Left_Up.png", neighbours: [[3,8,12,17,19],[1,5,11,13,16,19],[4,7,8,10,21,22],[3,4,5,7,9,16,18]] },
        { id: 7, path: "assets/Dungeon/Wall_Corner_Right_Down.png", neighbours: [[4,5,6,11],[3,4,6,8,12,15,17],[3,5,9,14,16,17,18,19],[0,8,10,21,22,14,17,19]] },
        { id: 8, path: "assets/Dungeon/Wall_Corner_Up_Right.png", neighbours: [[4,5,6,11],[0,7,10,21,22,14,18,20],[3,6,12,14,15,17,18,20],[3,4,5,7,9,16,18]] },
        { id: 9, path: "assets/Dungeon/Wall_East.png", neighbours: [[7,9,18,20],[3,4,6,8,12,15,17],[5,9,16,19],[2,12]] },
        { id: 10, path: "assets/Dungeon/Wall_Front.png", neighbours: [[4,5,6,11],[0,7,10,21,22,14,18,20],[1,2,11,13],[0,8,10,21,22,14,17,19]] },
        { id: 11, path: "assets/Dungeon/Wall_South.png", neighbours: [[0,2,10,21,22,14],[1,5,11,13,16,19],[4,7,8,10,21,22],[1,6,11,13,15,20]] },
        { id: 12, path: "assets/Dungeon/Wall_West.png", neighbours: [[8,12,17,19],[2,9],[6,12,15,20],[3,4,5,7,9,16,18]] },
        { id: 13, path: "assets/Dungeon/Wall_T_Up.png", neighbours: [[0,2,10,21,22,14],[5,11,13,16,19],[0,3,14,17,18],[6,11,13,15,20]] },
        { id: 14, path: "assets/Dungeon/Wall_T_Down.png", neighbours: [[1,3,7,8,13,15,16,17,18,19,20],[0,7,10,21,22,14,18,20],[1,2,11,13],[0,8,10,21,22,14,17,19]] },
        { id: 15, path: "assets/Dungeon/Hallway_Up_Right.png", neighbours: [[3,8,12,17,19],[1,5,11,13,19,16],[0,3,14,17,18],[3,4,5,7,9,18,16]] },
        { id: 16, path: "assets/Dungeon/Hallway_Up_Left.png", neighbours: [[3,7,9,18,20],[3,4,6,8,12,17,15],[0,3,14,17,18],[1,6,11,13,15]] },
        { id: 17, path: "assets/Dungeon/Hallway_Down_Right.png", neighbours: [[1,3,7,8,13,15,16],[0,7,10,21,22,14,18],[3,6,12,14,15,20],[3,4,5,7,9,16,18]] },
        { id: 18, path: "assets/Dungeon/Hallway_Down_Left.png", neighbours: [[1,3,7,8,13,15,16],[3,4,6,8,12,15,17],[3,5,9,14,16,19],[0,8,10,21,22,14,17]] },
        { id: 19, path: "assets/Dungeon/Hallway_S_Reverted.png", neighbours: [[3,7,9,18,20],[0,7,10,21,22,14,20],[3,6,12,14,15,20],[1,6,11,13,15,20]] },
        { id: 20, path: "assets/Dungeon/Hallway_S.png", neighbours: [[3,8,12,17,19],[1,5,11,13,19],[3,5,9,14,16,19],[0,8,10,21,22,14,19]] },
        { id: 21, path: "assets/Dungeon/Wall_Torch.png", neighbours: [[4,5,6,11],[0,7,10,21,22,14,18,20],[1,2,11,13],[0,8,10,21,22,14,17,19]] },
        { id: 22, path: "assets/Dungeon/Wall_Cell.png", neighbours: [[4,5,6,11],[0,7,10,21,22,14,18,20],[1,2,11,13],[0,8,10,21,22,14,17,19]] }
    ]

    return rules;
}

function getRoadRules() {
    var rules = [
        {
            id: 0, path: "assets/Roads/A.png", neighbours:
                [[0, 2, 8, 6, 7, 12, 13, 14], [0, 11, 10, 5, 8, 12, 13, 15], [0, 2, 3, 9, 10, 13, 14, 15], [0, 11, 4, 7, 9, 12, 14, 15]]
        },
        {
            id: 1, path: "assets/Roads/Road_Center.png", neighbours:
                [[1, 3, 4, 5, 9, 10, 11, 15], [1, 2, 3, 4, 6, 7, 9, 14], [1, 4, 5, 6, 7, 8, 11, 12], [1, 2, 3, 5, 6, 8, 10, 13]]
        },
        {
            id: 2, path: "assets/Roads/Road_Horizontal.png", neighbours:
                [[0, 2, 6, 7, 8, 12, 13, 14], [1, 2, 3, 4, 6, 7, 9, 14], [0, 2, 3, 9, 10, 13, 14, 15], [1, 2, 3, 5, 6, 8, 10, 13]]
        },
        {
            id: 3, path: "assets/Roads/Road_T_Down.png", neighbours:
                [[0, 2, 6, 7, 8, 12, 14, 13], [1, 2, 3, 4, 6, 7, 9, 14], [1, 4, 5, 6, 7, 8, 11, 12], [1, 2, 3, 5, 6, 8, 10, 13]]
        },
        {
            id: 4, path: "assets/Roads/Road_T_Left.png", neighbours:
                [[1, 3, 4, 5, 9, 10, 11, 15], [0, 5, 8, 10, 11, 12, 13, 15], [1, 4, 5, 6, 7, 8, 11, 12], [1, 2, 3, 5, 6, 8, 10, 13]]
        },
        {
            id: 5, path: "assets/Roads/Road_T_Right.png", neighbours:
                [[1, 3, 4, 5, 9, 10, 11, 15], [1, 2, 3, 4, 6, 7, 9, 14], [1, 4, 5, 6, 7, 8, 11, 12], [0, 4, 7, 9, 11, 12, 14, 15]]
        },
        {
            id: 6, path: "assets/Roads/Road_T_Up.png", neighbours:
                [[1, 3, 4, 5, 9, 10, 11, 15], [1, 2, 3, 4, 6, 7, 9, 14], [0, 2, 3, 9, 10, 14, 13, 15], [1, 2, 3, 5, 6, 8, 10, 13]]
        },
        {
            id: 7, path: "assets/Roads/Road_Turn_Down_Left.png", neighbours:
                [[1, 3, 4, 5, 9, 10, 11, 15], [0, 5, 8, 10, 11, 12, 13, 15], [0, 2, 3, 9, 10, 14, 13, 15], [1, 2, 3, 5, 6, 8, 10, 13]]
        },
        {
            id: 8, path: "assets/Roads/Road_Turn_Left_Up.png", neighbours:
                [[1, 3, 4, 5, 9, 10, 11, 15], [1, 2, 3, 4, 6, 7, 9, 14], [0, 2, 3, 9, 10, 14, 13, 15], [0, 4, 7, 9, 11, 12, 14, 15]]
        },
        {
            id: 9, path: "assets/Roads/Road_Turn_Right_Down.png", neighbours:
                [[0, 2, 6, 7, 8, 12, 14, 13], [0, 5, 8, 10, 11, 12, 13, 15], [1, 4, 5, 6, 7, 8, 11, 12], [1, 2, 3, 5, 6, 8, 10, 13]]
        },
        {
            id: 10, path: "assets/Roads/Road_Turn_Up_Right.png", neighbours:
                [[0, 2, 6, 7, 8, 12, 14, 13], [1, 2, 3, 4, 6, 7, 9, 14], [1, 4, 5, 6, 7, 8, 11, 12], [0, 4, 7, 9, 11, 12, 14, 15]]
        },
        {
            id: 11, path: "assets/Roads/Road_Vertical.png", neighbours:
                [[1, 3, 4, 5, 9, 10, 11, 15], [0, 5, 8, 10, 11, 12, 13, 15], [1, 4, 5, 6, 7, 8, 11, 12], [0, 4, 7, 9, 11, 12, 14, 15]]
        },
        {
            id: 12, path: "assets/Roads/Road_End_Down.png", neighbours:
                [[1, 3, 4, 5, 9, 10, 11, 15], [0, 5, 8, 10, 11, 12, 13, 15], [0, 2, 3, 9, 10, 13, 14, 15], [0, 4, 7, 9, 11, 12, 14, 15]]
        },
        {
            id: 13, path: "assets/Roads/Road_End_Left.png", neighbours:
                [[0, 2, 6, 7, 8, 12, 13, 14], [1, 2, 3, 4, 6, 7, 9, 14], [0, 2, 3, 9, 10, 13, 14, 15], [0, 4, 7, 9, 11, 12, 14, 15]]
        },
        {
            id: 14, path: "assets/Roads/Road_End_Right.png", neighbours:
                [[0, 2, 6, 7, 8, 12, 13, 14], [0, 5, 8, 10, 11, 12, 13, 15], [0, 2, 3, 9, 10, 13, 14, 15], [1, 2, 3, 5, 6, 8, 10, 13]]
        },
        {
            id: 15, path: "assets/Roads/Road_End_Up.png", neighbours:
                [[0, 2, 6, 7, 8, 12, 13, 14], [0, 5, 8, 10, 11, 12, 13, 15], [1, 4, 5, 6, 7, 8, 11, 12], [0, 4, 7, 9, 11, 12, 14, 15]]
        }
    ]

    return rules;
}