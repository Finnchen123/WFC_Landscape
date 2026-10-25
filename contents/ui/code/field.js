class Field {
    constructor(x, y, state) {
        this.state = state;
        var images = state.images;
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

    generateRandomType(ctx) {
        var collapsedType = this.getNeighbourType();
        var shouldConnect = Math.random() <= 0.6;
        var index = Math.floor(Math.random() * this.possibleTypes.length);
        this.type = (collapsedType == undefined) ? this.possibleTypes[index] : (shouldConnect) ? collapsedType : this.possibleTypes[index];
        this.possibleTypes = [];
        this.possibleTypes.push(this.type)
        this.collapsed = true;
        this.paint(ctx)
    }

    getNeighbourType() {
        var map = this.state.map;
        var resultList = [];

        if (this.x > 0) {
            if (map[this.x - 1][this.y].possibleTypes.length == 1) {
                resultList.push(map[this.x - 1][this.y].possibleTypes[0]);
            }
        }

        if (this.x < map.length - 1) {
            if (map[this.x + 1][this.y].possibleTypes.length == 1) {
                resultList.push(map[this.x + 1][this.y].possibleTypes[0]);
            }
        }

        if (this.y > 0) {
            if (map[this.x][this.y - 1].possibleTypes.length == 1) {
                resultList.push(map[this.x][this.y - 1].possibleTypes[0]);
            }
        }

        if (this.y < map[this.x].length - 1) {
            if (map[this.x][this.y + 1].possibleTypes.length == 1) {
                resultList.push(map[this.x][this.y + 1].possibleTypes[0]);
            }
        }

        resultList = [...new Set(resultList)];

        var temp = [];
        for (var result of resultList) {
            if (this.possibleTypes.includes(result)) {
                temp.push(result)
            }
        }

        return temp[Math.floor(Math.random() * temp.length)];
    }

    paint(ctx) {
        var images = this.state.images;
        var SIZE = this.state.SIZE;
        if (!this.painted) {
            ctx.drawImage(images[this.type]["image"], this.x * SIZE, this.y * SIZE);
            this.painted = true;
        }
    }

    propagate(currentDepth) {
        var map = this.state.map;
        var images = this.state.images;
        var DEPTH = this.state.DEPTH;
        var nextPropagation = [];
        var availableDirections = [];

        //Check for next fields to propagate
        if (this.x > 0) {
            nextPropagation.push(map[this.x - 1][this.y]);
            availableDirections.push([1, map[this.x - 1][this.y].possibleTypes]);
        }

        if (this.x < map.length - 1) {
            nextPropagation.push(map[this.x + 1][this.y]);
            
            availableDirections.push([3, map[this.x + 1][this.y].possibleTypes]);
        }

        if (this.y > 0) {
            nextPropagation.push(map[this.x][this.y - 1]);
            
            availableDirections.push([2, map[this.x][this.y - 1].possibleTypes]);
        }

        if (this.y < map[this.x].length - 1) {
            nextPropagation.push(map[this.x][this.y + 1]);
            
            availableDirections.push([0, map[this.x][this.y + 1].possibleTypes]);
        }

        //Main logic - Propagate this field
        if (!this.collapsed) {
            var temp = [];
            var checker;

            availableDirections.sort((a, b) => a[1].length - b[1].length);
            for (var direction of availableDirections) {
                for (var possibilities of direction[1]) {
                    checker = images[possibilities]["neighbours"][direction[0]];
                    for (var possible of this.possibleTypes) {
                        if (checker.includes(possible)) {
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
        if (currentDepth <= DEPTH) {
            for (var field of nextPropagation) {
                field.propagate(currentDepth + 1);
            }
        }
    }
}