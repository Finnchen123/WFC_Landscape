//TODO: REMOVE TYPED ROADS -> ONE SINGLE ROAD TYPE

function getLandscapeRules() {
    var rules = /*[
        { id: 0, path: "assets/Landscape/Gras_Water_East.png", neighbours: [[0,1,37],[2,5,7,29,32,34,44],[0,4,39],[7,8,36,38]] },
        { id: 1, path: "assets/Landscape/Gras_Water_North_East.png", neighbours: [[4,5,6,31,32,33,44],[2,5,7,29,32,34,44],[0,4,39],[2,3,39]] },
        { id: 2, path: "assets/Landscape/Gras_Water_North_West.png", neighbours: [[4,5,6,31,32,33,44],[1,3,38],[5,7,38],[0,1,4,5,27,28,31,44]] },
        { id: 3, path: "assets/Landscape/Gras_Water_North.png", neighbours: [[4,5,6,31,32,33,44],[1,3,38],[6,8,36,37],[0,1,4,5,27,28,31,44]] },
        { id: 4, path: "assets/Landscape/Gras_Water_South_East.png", neighbours: [[0,1,37],[2,5,7,29,32,34,44],[1,2,3,28,29,30,44],[5,6,36]] },
        { id: 5, path: "assets/Landscape/Gras_Water_South_West.png", neighbours: [[2,7,38],[4,6,36],[1,2,3,28,29,30,44],[0,1,4,5,27,28,31,44]] },
        { id: 6, path: "assets/Landscape/Gras_Water_South.png", neighbours: [[3,8,38,39],[4,6,36],[1,2,3,28,29,30,44],[5,6,36]] },
        { id: 7, path: "assets/Landscape/Gras_Water_West.png", neighbours: [[2,7,38],[0,8,37,39],[5,7,38],[0,1,4,5,27,28,31,44]] },
        { id: 8, path: "assets/Landscape/Gras.png", neighbours: [[3,8,11,12,13,15,19,20,21,38,39],[0,8,11,12,14,18,21,23,24,37,39],[6,8,12,13,14,15,16,22,23,36,37],[7,8,11,13,14,17,20,22,24,36,38]] },
        { id: 9, path: "assets/Landscape/Lava.png", neighbours: [[9,11,12,13,15,19,20,21],[9,11,12,14,18,21,23,24],[9,12,13,14,15,16,22,23],[9,11,13,14,17,20,22,24]] },
        { id: 10, path: "assets/Landscape/Road_Center.png", neighbours: [[10,14,16,17,18,22,23,24],[10,13,15,16,17,19,20,22],[10,11,17,18,19,20,21,24],[10,12,15,16,18,19,21,23]] },
        { id: 11, path: "assets/Landscape/Road_End_Down.png", neighbours: [[10,16,17,18,22,23,24],[0,2,5,7,8,9,25,26,27,29,32,34,35,37,39,41,43,44],[1,2,3,6,8,9,25,26,28,29,30,33,35,36,37,40,41,44],[0,1,4,7,8,9,25,26,27,28,31,34,35,36,38,40,42,44]] },
        { id: 12, path: "assets/Landscape/Road_End_Left.png", neighbours: [[3,4,5,6,7,8,9,25,26,30,31,32,33,35,38,39,42,43,44],[10,15,16,17,19,20,22],[1,2,3,6,8,9,25,26,28,29,30,33,35,36,37,40,41,44],[0,1,4,7,8,9,25,26,27,28,31,34,35,36,38,40,42,44]] },
        { id: 13, path: "assets/Landscape/Road_End_Right.png", neighbours: [[3,4,5,6,7,8,9,25,26,30,31,32,33,35,38,39,42,43,44],[0,2,5,7,8,9,25,26,27,29,32,34,35,37,39,41,43,44],[1,2,3,6,8,9,25,26,28,29,30,33,35,36,37,40,41,44],[10,15,16,18,19,21,23]] },
        { id: 14, path: "assets/Landscape/Road_End_Up.png", neighbours: [[3,4,5,6,7,8,9,25,26,30,31,32,33,35,38,39,42,43,44],[0,2,5,7,8,9,25,26,27,29,32,34,35,37,39,41,43,44],[10,17,18,19,20,21,24],[0,1,4,7,8,9,25,26,27,28,31,34,35,36,38,40,42,44]] },
        { id: 15, path: "assets/Landscape/Road_Horizontal.png", neighbours: [[3,4,5,6,7,8,9,25,26,30,31,32,33,35,38,39,42,43,44],[10,13,15,16,17,19,20,22],[1,2,3,6,8,9,25,26,28,29,30,33,35,36,37,40,41,44],[10,12,15,16,18,19,21,23]] },
        { id: 16, path: "assets/Landscape/Road_T_Down.png", neighbours: [[3,4,5,6,7,8,9,25,26,30,31,32,33,35,38,39,42,43,44],[10,13,15,16,17,19,20,22],[10,17,18,19,20,21,24],[10,12,15,16,18,19,21,23]] },
        { id: 17, path: "assets/Landscape/Road_T_Left.png", neighbours: [[10,14,16,17,18,22,23,24],[0,2,5,7,8,9,25,26,27,29,32,34,35,37,39,41,43,44],[10,11,17,18,19,20,21,24],[10,12,15,16,18,19,21,23]] },
        { id: 18, path: "assets/Landscape/Road_T_Right.png", neighbours: [[10,14,16,17,18,22,23,24],[10,13,15,16,17,19,20,22],[10,11,17,18,19,20,21,24],[0,1,4,7,8,9,25,26,27,28,31,34,35,36,38,40,42,44]] },
        { id: 19, path: "assets/Landscape/Road_T_Up.png", neighbours: [[10,14,16,17,18,22,23,24],[10,13,15,16,17,19,20,22],[1,2,3,6,8,9,25,26,28,29,30,33,35,36,37,40,41,44],[10,12,15,16,18,19,21,23]] },
        { id: 20, path: "assets/Landscape/Road_Turn_Down_Left.png", neighbours: [[10,14,16,17,18,23,24],[0,2,5,7,8,9,25,26,27,29,32,34,35,37,39,41,43,44],[1,2,3,6,8,9,25,26,28,29,30,33,35,36,37,40,41,44],[10,12,15,16,18,19,23]] },
        { id: 21, path: "assets/Landscape/Road_Turn_Left_Up.png", neighbours: [[10,14,16,17,18,22,24],[10,13,15,16,17,19,22],[1,2,3,6,8,9,25,26,28,29,30,33,35,36,37,40,41,44],[0,1,4,7,8,9,25,26,27,28,31,34,35,36,38,40,42,44]] },
        { id: 22, path: "assets/Landscape/Road_Turn_Right_Down.png", neighbours: [[3,4,5,6,7,8,9,25,26,30,31,32,33,35,38,39,42,43,44],[0,2,5,7,8,9,25,26,27,29,32,34,35,37,39,41,43,44],[10,11,17,18,19,21,24],[10,12,15,16,18,19,21]] },
        { id: 23, path: "assets/Landscape/Road_Turn_Up_Right.png", neighbours: [[3,4,5,6,7,8,9,25,26,30,31,32,33,35,38,39,42,43,44],[10,13,15,16,17,19,20],[10,11,17,18,19,20,24],[0,1,4,7,8,9,25,26,27,28,31,34,35,36,38,40,42,44]] },
        { id: 24, path: "assets/Landscape/Road_Vertical.png", neighbours: [[10,14,16,17,18,22,23,24],[0,2,5,7,8,9,25,26,27,29,32,34,35,37,39,41,43,44],[10,11,17,18,19,20,21,24],[0,1,4,7,8,9,25,26,27,28,31,34,35,36,38,40,42,44]] },
        { id: 25, path: "assets/Landscape/Sand.png", neighbours: [[25,11,12,13,15,19,20,21],[25,11,12,14,18,21,23,24],[25,12,13,14,15,16,22,23],[25,11,13,14,17,20,22,24]] },
        { id: 26, path: "assets/Landscape/Snow.png", neighbours: [[26,11,12,13,15,19,20,21],[26,11,12,14,18,21,23,24],[26,12,13,14,15,16,22,23],[26,11,13,14,17,20,22,24]] },
        { id: 27, path: "assets/Landscape/Stone_Water_East.png", neighbours: [[27,28,41],[2,5,7,29,32,34,44],[27,31,43],[34,35,40,42]] },
        { id: 28, path: "assets/Landscape/Stone_Water_North_East.png", neighbours: [[4,5,6,31,32,33,44],[2,5,7,29,32,34,44],[27,31,43],[29,30,43]] },
        { id: 29, path: "assets/Landscape/Stone_Water_North_West.png", neighbours: [[4,5,6,31,32,33,44],[28,30,42],[32,34,42],[0,1,4,5,27,28,31,44]] },
        { id: 30, path: "assets/Landscape/Stone_Water_North.png", neighbours: [[4,5,6,31,32,33,44],[28,30,42],[33,35,40,41],[29,30,43]] },
        { id: 31, path: "assets/Landscape/Stone_Water_South_East.png", neighbours: [[27,28,41],[2,5,7,29,32,34,44],[1,2,3,28,29,30,44],[32,33,41]] },
        { id: 32, path: "assets/Landscape/Stone_Water_South_West.png", neighbours: [[29,34,40],[31,32,40],[1,2,3,28,29,30,44],[0,1,4,5,27,28,31,44]] },
        { id: 33, path: "assets/Landscape/Stone_Water_South.png", neighbours: [[30,35,42,43],[31,32,40],[1,2,3,28,29,30,44],[32,33,41]] },
        { id: 34, path: "assets/Landscape/Stone_Water_West.png", neighbours: [[29,34,40],[27,35,41,43],[32,34,42],[0,1,4,5,27,28,31,44]] },
        { id: 35, path: "assets/Landscape/Stone.png", neighbours: [[11,12,13,15,19,20,21,30,35,42,43],[11,12,14,18,21,23,24,27,35,41,43],[12,13,14,15,16,22,23,33,35,40,41],[11,13,14,17,20,22,24,34,35,40,42]] },
        { id: 36, path: "assets/Landscape/Water_Gras_North_East.png", neighbours: [[3,8,38,39],[0,8,37,39],[5,7,38],[5,6,36]] },
        { id: 37, path: "assets/Landscape/Water_Gras_North_West.png", neighbours: [[3,8,38,39],[4,6,36],[0,4,39],[7,8,36,38]] },
        { id: 38, path: "assets/Landscape/Water_Gras_South_East.png", neighbours: [[2,7,38],[0,8,37,39],[6,8,36,37],[2,3,39]] },
        { id: 39, path: "assets/Landscape/Water_Gras_South_West.png", neighbours: [[0,1,37],[1,3,38],[6,8,36,37],[7,8,36,38]] },
        { id: 40, path: "assets/Landscape/Water_Stone_North_East.png", neighbours: [[30,35,42,43],[27,35,41,43],[32,34,42],[32,33,41]] },
        { id: 41, path: "assets/Landscape/Water_Stone_North_West.png", neighbours: [[30,35,42,43],[31,32,40],[27,31,43],[34,35,40,42]] },
        { id: 42, path: "assets/Landscape/Water_Stone_South_East.png", neighbours: [[29,34,40],[27,35,41,43],[33,35,40,41],[29,30,43]] },
        { id: 43, path: "assets/Landscape/Water_Stone_South_West.png", neighbours: [[27,28,41],[28,30,42],[33,35,40,41],[34,35,40,42]] },
        { id: 44, path: "assets/Landscape/Water.png", neighbours: [[4,5,6,11,12,13,15,19,20,21,31,32,33,44],[2,5,7,11,12,14,18,21,23,24,29,32,34,44],[1,2,3,12,13,14,15,16,17,23,24,28,29,30,44],[0,1,4,5,11,13,14,17,20,22,24,27,28,31,44]] }
    ]*/
        [
            { id: 0, path: "assets/Landscape/Gras.png", neighbours: [[0,3,4,5,7,11,12,13,17],[0,3,4,6,10,13,15,16,17],[0,4,5,6,7,8,14,15,17],[0,3,5,6,9,12,14,16,17]] },
            { id: 1, path: "assets/Landscape/Lava.png", neighbours: [[1,3,4,5,7,11,12,13,19],[1,3,4,6,10,13,15,16,19],[1,4,5,6,7,8,14,15,19],[1,3,5,6,9,12,14,16,19]] },
            { id: 2, path: "assets/Landscape/Road_Center.png", neighbours: [[6,8,9,10,14,15,16],[5,7,8,9,11,12,14],[3,9,10,11,12,13,16],[4,7,8,10,11,13,15]] },
            { id: 3, path: "assets/Landscape/Road_End_Down.png", neighbours: [[2,8,9,10,14,15,16],[0,1,17,18,19,20],[0,1,17,18,19,20],[0,1,17,18,19,20]] },
            { id: 4, path: "assets/Landscape/Road_End_Left.png", neighbours: [[0,1,17,18,19,20],[2,7,8,9,11,12,14],[0,1,17,18,19,20],[0,1,17,18,19,20]] },
            { id: 5, path: "assets/Landscape/Road_End_Right.png", neighbours: [[0,1,17,18,19,20],[0,1,17,18,19,20],[0,1,17,18,19,20],[2,7,8,10,11,13,15]] },
            { id: 6, path: "assets/Landscape/Road_End_Up.png", neighbours: [[0,1,17,18,19,20],[0,1,17,18,19,20],[2,9,10,11,12,13,16],[0,1,17,18,19,20]] },
            { id: 7, path: "assets/Landscape/Road_Horizontal.png", neighbours: [[0,1,17,18,19,20],[2,5,7,8,9,11,12,14],[0,1,17,18,19,20],[2,4,7,8,10,11,13,15]] },
            { id: 8, path: "assets/Landscape/Road_T_Down.png", neighbours: [[0,1,17,18,19,20],[2,5,7,8,9,11,12,14],[2,3,9,10,12,13,16],[2,4,7,8,10,11,13,15]] },
            { id: 9, path: "assets/Landscape/Road_T_Left.png", neighbours: [[2,6,8,9,10,14,15,16],[0,1,17,18,19,20],[2,3,9,10,11,12,13,16],[2,4,7,8,11,13,15]] },
            { id: 10, path: "assets/Landscape/Road_T_Right.png", neighbours: [[2,6,8,9,10,14,15,16],[2,5,7,8,11,12,14],[2,3,9,10,11,12,13,16],[0,1,17,18,19,20]] },
            { id: 11, path: "assets/Landscape/Road_T_Up.png", neighbours: [[2,6,9,10,14,15,16],[2,5,7,8,9,11,12,14],[0,1,17,18,19,20],[2,4,7,8,10,11,13,15]] },
            { id: 12, path: "assets/Landscape/Road_Turn_Down_Left.png", neighbours: [[2,6,8,9,10,14,15,16],[0,1,17,18,19,20],[0,1,17,18,19,20],[2,4,7,8,10,11,13,15]] },
            { id: 13, path: "assets/Landscape/Road_Turn_Left_Up.png", neighbours: [[2,6,8,9,10,14,15,16],[2,5,7,8,9,11,12,14],[0,1,17,18,19,20],[0,1,17,18,19,20]] },
            { id: 14, path: "assets/Landscape/Road_Turn_Right_Down.png", neighbours: [[0,1,17,18,19,20],[0,1,17,18,19,20],[2,3,9,10,11,12,13,16],[2,4,7,8,10,11,13,15]] },
            { id: 15, path: "assets/Landscape/Road_Turn_Up_Right.png", neighbours: [[0,1,17,18,19,20],[2,5,7,8,9,11,12,14],[2,3,9,10,11,12,13,16],[0,1,17,18,19,20]] },
            { id: 16, path: "assets/Landscape/Road_Vertical.png", neighbours: [[2,6,8,9,10,14,15,16],[0,1,17,18,19,20],[2,3,9,10,11,12,13,16],[0,1,17,18,19,20]] },
            { id: 17, path: "assets/Landscape/Sand.png", neighbours: [[17,3,4,5,7,11,12,13,0,20],[17,3,4,6,10,13,15,16,0,20],[17,4,5,6,7,8,14,15,0,20],[17,3,5,6,9,12,14,16,0,20]] },
            { id: 18, path: "assets/Landscape/Snow.png", neighbours: [[18,3,4,5,7,11,12,13, 20,19],[18,3,4,6,10,13,15,16, 20,19],[18,4,5,6,7,8,14,15, 20,19],[18,3,5,6,9,12,14,16, 20,19]] },
            { id: 19, path: "assets/Landscape/Stone.png", neighbours: [[19,3,4,5,7,11,12,13,18,1],[19,3,4,6,10,13,15,16,18,1],[19,4,5,6,7,8,14,15,18,1],[19,3,5,6,9,12,14,16,18,1]] },
            { id: 20, path: "assets/Landscape/Water.png", neighbours: [[20,3,4,5,7,11,12,13,17,18],[20,3,4,6,10,13,15,16,17,18],[20,4,5,6,7,8,14,15,17,18],[20,3,5,6,9,12,14,16,17,18]] }
        ]
    return rules;
}