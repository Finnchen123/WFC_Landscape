// Change this function to preview another bundled tileset.
const RULESET = getDungeonRules();
const DECORATIONS = RULESET[0].path.indexOf("assets/SereneVillage/") === 0 ? getSereneVillageDecorations() : [];
var loadedImageCount = 0;

function startPaintLoop(){
    configure(Field);
    clearDecorations();
    var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
    dimensionChanged(ctx.canvas.width, ctx.canvas.height)
    loadImages();
    loadDecorations();
    waitForImages(ctx);
}

function waitForImages(ctx){
    if(loadedImageCount == RULESET.length + DECORATIONS.length){
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
        setTimeout(function() {
            restart(ctx);
            doPaintLoop(ctx);
        }, 1000);
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
        obj.onerror = function() { console.error("Could not load tile:", this.src); };
        obj.onload = function() {
            loadedImageCount++;
            saveImage(RULESET[Number(this.getAttribute("imageID"))], this);
        }
        obj.src = "../../" + image["path"];
    }
    
}

function loadDecorations() {
    for (var rule of DECORATIONS) {
        var image = document.createElement("img");
        image.setAttribute("decorationID", rule.id);
        image.onerror = function() { console.error("Could not load decoration:", this.src); };
        image.onload = function() {
            saveDecoration(DECORATIONS[Number(this.getAttribute("decorationID"))], this);
            loadedImageCount++;
        };
        image.src = "../../" + rule.path;
    }
}
