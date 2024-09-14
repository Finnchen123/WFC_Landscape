var config = [
    {neighbours: [0,2]},
    {neighbours: [1,2]},
    {neighbours: [0,1,2,3]},
    {neighbours: [2,3]}
]

var current_x = 0;
var current_y = 0;

var SIZE = 32;

var cell_count_x = 0;
var cell_count_y = 0;

var map = [];

function getColor(type){
    var hue;
    switch(type){
        case 0: //Water
            hue = 212;
            break;
        case 1: //Grass
            hue = 102;
            break;
        case 2: //Beach
            hue = 60;
            break;
        case 3: //Lava
            hue = 0;
            break;
        default:
            hue = 0;
            break;
    }
    var saturation = 255;
    var lightness = 130;

    return "hsl("+hue+", "+saturation+","+lightness+")";
}

function initialize(){
    map = [];
    for(var i = 0; i < cell_count_x; i++){
        for(var j = 0; j < cell_count_y; j++){
            map.push(new Field(i,j));
        }
    }
    var randomStart = Math.round(Math.random() * (map.length - 1));
    map[randomStart].generateRandomType();
    propagateMap(randomStart);
}

function propagateMap(mapIndex){
    var collapsedX = map[mapIndex].x;
    var collapsedY = map[mapIndex].y;
    var collapsedType = map[mapIndex].type;

    for(var field of map){
        if (field.collapsed) continue;
        if(((field.x == collapsedX - 1 || field.x == collapsedX + 1) && field.y == collapsedY) || ((field.y == collapsedY - 1 || field.y == collapsedY + 1) && field.x == collapsedX)){
            field.changePossibleTypes(collapsedType);
        }
    }
}

function paintMatrix(ctx) {
    var leastOptions = null;
    var availableCollapse = [];
    var counterCollapsed = 0;
    for(var field of map){
        if(field.collapsed){
            field.paint(ctx);
            counterCollapsed++;
        }
        else{
            if(leastOptions == null){
                leastOptions = field;
                availableCollapse.push(field);
            }
            else{
                if(leastOptions.possibleTypes.length > field.possibleTypes.length){
                    leastOptions = field;
                    availableCollapse = [];
                    availableCollapse.push(field);
                }
                else if(leastOptions.possibleTypes.length == field.possibleTypes.length){
                    availableCollapse.push(field);
                }
            }
        }
    }

    if(availableCollapse.length > 0){
        var collapse = availableCollapse[Math.round(Math.random() * (availableCollapse.length - 1))];

        map[map.indexOf(collapse)].generateRandomType();
        propagateMap(map.indexOf(collapse));
    }

    return counterCollapsed == map.length || availableCollapse.length <= 0;
    //return true;
}

function restart(ctx) {
    ctx.reset();
    initialize();
}

function dimensionChanged(width,height) {
    cell_count_x = Math.round(width / SIZE);
    cell_count_y = Math.round(height / SIZE);
    initialize();
}

class Field{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.collapsed = false;
        this.type = null;
        this.possibleTypes = [];
        this.painted = false;
        for(var i = 0; i < config.length; i++){
            this.possibleTypes.push(i);
        }
    }

    setType(type){
        this.type = type;
        this.collapsed = true;
    }

    generateRandomType(){
        this.type = this.possibleTypes[Math.round(Math.random() * (this.possibleTypes.length - 1))];
        this.collapsed = true;
    }

    paint(ctx){
        if(!this.painted){
            ctx.fillStyle = getColor(this.type);
            ctx.fillRect(this.x * SIZE, this.y * SIZE, SIZE,SIZE);
            this.painted = true;
        }
    }

    changePossibleTypes(collapsedType){
        this.possibleTypes = this.possibleTypes.filter(element => config[collapsedType]["neighbours"].includes(element))
        /*var tempList = []
        for(var possibleType of this.possibleTypes){
            if(possibleType in config[collapsedType]["neighbours"]){
                tempList.push(possibleType);
            }
        }
        this.possibleTypes = tempList;*/
    }
}