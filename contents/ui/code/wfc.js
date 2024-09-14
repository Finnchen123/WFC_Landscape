var images = [];

var cell_count_x = 0;
var cell_count_y = 0;

var current_x = 0;
var current_y = 0;

var SIZE = 8;

function initialize(){
    //imageLoad();
}

function imageLoad() {
    var image = new Image();
    image.src = '../assets/Grass.png';
    images.push(image);
}

function paintMatrix(ctx) {
    if(current_x % 2 == 0){
        if(current_y % 2 == 0){
            ctx.fillStyle = 'hsl(189, 255, 130)';
        }
        else{
            ctx.fillStyle = 'hsl(226, 255, 130)';
        }
    }
    else{
        if(current_y % 2 == 0){
            ctx.fillStyle = 'hsl(226, 255, 130)';
        }
        else{
            ctx.fillStyle = 'hsl(189, 255, 130)';
        }
    }

    ctx.fillRect(current_x * SIZE, current_y * SIZE, SIZE,SIZE);

    current_x++;
    if(current_x == cell_count_x){
        current_y++;
        current_x = 0;
    }

    return (current_x == cell_count_x && current_y == cell_count_y);
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