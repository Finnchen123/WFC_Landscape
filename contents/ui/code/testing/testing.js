function startPaintLoop(){
    var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
    dimensionChanged(ctx.canvas.width, ctx.canvas.height)
    loadImages();
    waitForImages(ctx);
}

function waitForImages(ctx){
    if(images.length == RULESET.length){
        initialize();
        doPaintLoop(ctx);
    }
    else{
        setTimeout(function(){
            waitForImages(ctx);
        }, 40);
    }
}

function doPaintLoop(ctx){
    var isFinished = paintMatrix(ctx);
    if(isFinished){
        restart(ctx)
        doPaintLoop(ctx);
    }
    else{
        setTimeout(function(){
            doPaintLoop(ctx);
        }, 5);
    }
}

function loadImages(){
    var obj;
    for(var image of RULESET){
        obj = document.createElement("img");
        obj.setAttribute("imageID", image["id"]);
        obj.onload = function() {
            images[Number(this.getAttribute("imageID"))] = { id: Number(this.getAttribute("imageID")), image: this, neighbours: RULESET[Number(this.getAttribute("imageID"))]["neighbours"], isRoad: RULESET[Number(this.getAttribute("imageID"))]["path"].toLowerCase().includes("road") };
        }
        obj.src = "../../" + image["path"];
    }
    
}