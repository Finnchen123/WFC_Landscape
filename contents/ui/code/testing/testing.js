// Choose SereneVillage, MiniWorld or DungeonII for the browser preview.
const TILESET = "DungeonII";
const RULESET = getRulesForTileset(TILESET);
const DECORATIONS = getDecorationsForTileset(TILESET);
async function startPaintLoop() {
    var status = document.getElementById("status");
    status.hidden = true;
    configure(Field);
    clearTiles();
    var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
    try {
        await Promise.all([loadImages(), loadDecorations()]);
        dimensionChanged(ctx.canvas.width, ctx.canvas.height);
        doPaintLoop(ctx);
    } catch (error) {
        console.error(error);
        status.textContent = error.message + " Reload the page to retry.";
        status.hidden = false;
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

function loadAssets(rules, register) {
    return Promise.all(rules.map(function(rule) {
        return new Promise(function(resolve, reject) {
            var image = document.createElement("img");
            var url = "../../" + rule.path;
            var timeout = setTimeout(function() {
                reject(new Error("Timed out loading " + url));
            }, 15000);
            image.onload = function() {
                clearTimeout(timeout);
                register(rule, image);
                resolve();
            };
            image.onerror = function() {
                clearTimeout(timeout);
                reject(new Error("Could not load " + url));
            };
            image.src = url;
        });
    }));
}

function loadImages() {
    return loadAssets(RULESET, saveImage);
}

function loadDecorations() {
    return loadAssets(DECORATIONS, saveDecoration);
}
