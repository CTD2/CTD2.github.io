//CONSTANTS
var PLAYER;
var CONTENT_WIDTH = 800, CONTENT_HEIGHT = 800;
var TILES_PER_SIDE = 10;
var tileWidth = CONTENT_WIDTH/TILES_PER_SIDE;
var SPAWNING = false; // used for the changing tab warning added at the bottom of this page -- ignore for now
var GAMESTART = true;
var TURN =true;
var VELOCITY = 2;
var TOWER_RPM = 25;
var render;
//Game Data
var fabricMapGrid; // Front-end representations of all terrain obj's
var fabricPath = []; // Front-end representations of all road obj's
var fabricPathNodes; // Front-end representations of all path nodes
var degChange = [];
var towerRanges = [];
var carCounter = 0;
var carObjs = [];
var towerObjs = [];
var numRemovedCars = 0;
var carSpeed = 5.5;
var carDirection = 1;
var staticDuration = 0;

var prevActiveObj;
var tmpActiveObj = null;

window.cancelRequestAnimFrame = (function(){
    return  window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout
})();
// Canvas initialization  
// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c', {renderOnAddRemove: false}, {stateful: false});
fabric.Group.prototype.hasControls = false;
canvas.selection = false;

canvas.observe('mouse:over', function (e) {
    if (fabricPath.indexOf(e.target) > -1) { //if hovering over road obj
        e.target.hoverCursor = 'not-allowed';
    } 
    else {
        var isRangeObj = towerRanges.indexOf(e.target) > -1;
        var isTowerObj = towerObjs.indexOf(e.target) > -1;
        if(!isRangeObj && !isTowerObj) { //if hovering over grass/oil/water obj
            e.target.hoverCursor = 'pointer';
            e.target.filters.push(hoverFilter);
            e.target.applyFilters(canvas.renderAll.bind(canvas));
        }
        else {
            if(isTowerObj) { //if hovering over tower obj
                e.target.hoverCursor = 'pointer';
                var x = PLAYER.towerArray[towerObjs.indexOf(e.target)].coordX;
                var y = PLAYER.towerArray[towerObjs.indexOf(e.target)].coordY;
                fabricMapGrid[x][y].filters.push(hoverFilter);
                fabricMapGrid[x][y].applyFilters(canvas.renderAll.bind(canvas));
            }
        }
    }
});

canvas.observe('mouse:out', function (e) {
    var isRangeObj = towerRanges.indexOf(e.target) > -1;
    var isTowerObj = towerObjs.indexOf(e.target) > -1;
    if (e.target != undefined && !isRangeObj && e.target.filters.length > 0 && fabricPath.indexOf(e.target) < 0) {
        e.target.filters.splice(e.target.filters.indexOf(hoverFilter),1);
        e.target.applyFilters(canvas.renderAll.bind(canvas));
    }
    else if(isTowerObj) { 
        var x = PLAYER.towerArray[towerObjs.indexOf(e.target)].coordX;
        var y = PLAYER.towerArray[towerObjs.indexOf(e.target)].coordY;
        fabricMapGrid[x][y].filters.splice(e.target.filters.indexOf(hoverFilter),1);
        fabricMapGrid[x][y].applyFilters(canvas.renderAll.bind(canvas));
    }
    
});

// FOR TESTING PURPOSES --- DIFFERENTIATES NODES
var filter = new fabric.Image.filters.Tint({
  color: 'rgba(255, 0, 0, 0.5)'
});

// TEMP FILTER FOR GRID HOVERING
var hoverFilter = new fabric.Image.filters.Tint({
  color: 'rgba(0, 0, 0, 0.2)'
});

var selectedFilter = new fabric.Image.filters.Tint({
  color: 'rgba(0, 0, 0, 0.5)'
});

function displayNodes()
{
    if(towerRanges.length == 0)
        for(var i = 0; i < towerObjs.length; i++) {
            if(PLAYER.towerArray[i] instanceof OffensiveTower) { //if this tower is an offensive tower
                drawTowerRange(towerObjs[i], PLAYER.towerArray[i].range);
            }
        canvas.renderAll();
        }
    else {
        for(var i = 0; i < towerRanges.length; i++) {
            canvas.remove(towerRanges[i]);
        }
        towerRanges.splice(0,towerRanges.length);
        canvas.renderAll();
    }
}

function spawnEnemies()
{
    SPAWNING = true;
    if(level%10 == 0){
        PLAYER.cleanliness+=((100-PLAYER.cleanliness)/2);
        displayHUD();
    }
    SPAWNING = true;
    var i = 0;
    carCounter = 0;
    animateCars();
    function loop () {
       setTimeout(function () {
          if(vehicleQueue != null) {
             drawCar(i, vehicleQueue.vehicles[i]);
          }
          i++;
          if(vehicleQueue != null && i < vehicleQueue.vehicles.length) {
             loop();
          } else {
              SPAWNING = false;
          }
       }, 1000)
    }
    loop();
}

function drawMap()
{
    for(var i = 0; i < TILES_PER_SIDE; i++)
        for(var j = 0; j < TILES_PER_SIDE; j++)
            drawImage(mapGrid,i,j);
    lookforRoadDeg();
}

function drawImage(arrayContainer, x, y) //general method to draw an image that is stored in a 2d array with x and y
{
    if(x !== null && y !== undefined)
        fabric.Image.fromURL(arrayContainer[x][y].source, (img)=>{
                    edit(img, "terrain", x, y);
                    canvas.add(img);
                });
    else if (x !== null) 
        fabric.Image.fromURL(arrayContainer[x].source, (img)=>{
                    edit(img, "", x, y); 
                    canvas.add(img);
                });
}

 //creating new image object in fabric from the image file

function drawCar(idx, vehicle) // index within carObjs
{
    PLAYER.vehicleArray.push(vehicle);
    fabric.Image.fromURL(vehicle.source, (img)=>{
        edit(img, "car");
        img.previousNode = 0;
        img.nextNode = 1;
        img.direction = 1;
        img.turnNumber = 0;
        img.turn = true;
        canvas.add(img);
    });
}

function drawTower(terrainObj, towerSource)
{
    fabric.Image.fromURL(towerSource, (img)=>{
        img.frameDelay = 0;
        edit(img, "tower", undefined, undefined, terrainObj);
        canvas.add(img);
        canvas.renderAll();
    });
}

function drawTowerRange(towerObj, range) // FOR TESTING
{
    circle = new fabric.Circle({
        left: towerObj.left,
        top: towerObj.top,
        radius: range,
        strokeWidth: 1,
        stroke: 'black',
        fill: 'rgba(255,0,0,0.2)',
        selectable: false,
        originX: 'center', 
        originY: 'center'
    });
    towerRanges.push(circle);
    canvas.add(circle);
}

function animateCars()
{
    window.cancelRequestAnimFrame(render);
    var i = 0;
    while(i < carObjs.length)
    {
        var car = carObjs[i];
        if(car.nextNode < fabricPathNodes.length){
            var displacement = translation(car, car.nextNode);
            var dx = displacement.dx;
            var dy = displacement.dy;
            var vx = car.vx;
            var vy = car.vy;
            
            if(vx == 0 && vy == 0){ // starting point I think
                vy = VELOCITY;
            } else if(Math.abs(dx) <= 1){
                vx = 0;
                vy = VELOCITY * car.direction;
            } else if(Math.abs(dy) <= 1){
                vy = 0;
                vx = VELOCITY * car.direction;
            }
            if(Math.abs(dy)+Math.abs(dx)<=40&&carObjs[i].turn){
                carObjs[i].turn =false;
                rotation(carObjs[i],carObjs[i].turnNumber);
                carObjs[i].turnNumber++;
            }
            if(Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && car.nextNode+1 <= fabricPathNodes.length){ // for turning on corners, checking next pair of nodes
                vx = 0;
                vy = 0;
                
                car.direction = degChange[car.previousNode]/-90;
                
                car.previousNode++;
                car.nextNode++;
                displacement = translation(car, car.nextNode);
                dx = displacement.dx;
                dy = displacement.dy;
                if(Math.abs(dx)>Math.abs(dy)){
                    if(dx<0){
                        car.direction = 1;
                    }else{
                        car.direction = -1;
                    }
                    vx = VELOCITY * car.direction;
                    vy = 0;
                }else{
                    if(dy<0){
                        car.direction =1;
                    }else{
                        car.direction =-1;
                    }
                    vy = VELOCITY * car.direction;
                    vx = 0;
                }
                carObjs[i].turn = true;
            }
            
            var carPos = car.getCenterPoint();
            var x = carPos.x + vx;
            var y = carPos.y + vy;
            
            car.set('left', x);
            car.set('top', y);
            car.setCoords();
            
            car.vx = vx;
            car.vy = vy;
            
            i++;
        } 
        else {
            var backendCar = PLAYER.vehicleArray[carObjs.indexOf(car)];
            if(backendCar.condition == "clean") {
                backendCar.reachEndClean(PLAYER);
            } else
                backendCar.reachEndDirty(PLAYER);
            
            canvas.remove(car);
            carObjs.shift();
            PLAYER.vehicleArray.shift();
            
            if(carObjs.length == 0) {
                roundIsOver = true;
            }
        }
        displayHUD();
    }
    
    for(var j = 0; j < towerObjs.length; j++) {
        if(towerObjs[j].frameDelay == towerObjs[j].fireRate) {
            shootVehicle();
            towerObjs[j].frameDelay = 0;
        }
        else
            towerObjs[j].frameDelay++;
    }
    
    render = fabric.util.requestAnimFrame(animateCars, canvas.getElement());
	canvas.renderAll();	
}

function translation(car, idx)//returns distance
{
    if(idx<fabricPathNodes.length){
        var dx = car.getCenterPoint().x-fabricPathNodes[idx].getCenterPoint().x;
        var dy = car.getCenterPoint().y-fabricPathNodes[idx].getCenterPoint().y;
    }else{
        dx = 0;
        dy = 0;
    }
    
     
     var displacement = {
         dx: dx,
         dy: dy
     }
     
     return displacement;
}

function rotation(car, idx)
{
        setTimeout(function(){car.animate('angle', car.angle + degChange[idx], {
            onChange: canvas.renderAll.bind(canvas),
            duration: 300 //how fast it turns
        });},0); //where it turns
    
}

function populateMap(mapNum) //determines which map to load
{
    if(mapNum == 1)
		map1();
	else if(mapNum == 2)
		map2();
	else if(mapNum == 3)
		map3();
	else if(mapNum == 4)
		map4();
	else
	    mapRand();
}

function load(fn, delay, optionalParameter)
{
    setTimeout(function(){fn(optionalParameter)}, delay);
}

function toggleMenu(x,y,fabricTowerObj)
{
    if(x != undefined && y != undefined)
    {
        selectedXIdx = x;
        selectedYIdx = y;
        shopMenu.style.display = "block";
    }
    
    if(fabricTowerObj != undefined) 
    {
        $('.buy').addClass('disabled');
        upgradeMenu.style.display = 'initial';
        var tower = PLAYER.towerArray[towerObjs.indexOf(fabricTowerObj)];
        updateStatsMenu(tower);
        if(tower.source.indexOf("offensive") > -1)
        {
            $('.production').addClass('disabled');
            $('.offensive').removeClass('disabled');
        }
        else
        {
            $('.production').removeClass('disabled');
            $('.offensive').addClass('disabled');
        }
    } 
    else 
    {
        $('.buy').removeClass('disabled');
        if(upgradeMenu.style.display != "none")
        {
            upgradeMenu.style.display = 'none';
        }
    }
}

function edit(obj, type, x, y, selectedObj) 
{
    obj.set('hasControls', false);
    if(type == "terrain")
    { 
        obj.set({width: tileWidth, height: tileWidth, left: x*tileWidth, top: y*tileWidth, angle:0});
        obj.set('selectable', true);
        // obj.set('hasControls', false);//unabling resizing
        obj.set('lockMovementY',true);
        obj.set('lockMovementX',true);
        
        fabricMapGrid[x][y] = obj;
        
        if(pathNodes.indexOf(mapGrid[x][y]) > -1) {
            fabricPathNodes.splice(pathNodes.indexOf(mapGrid[x][y]), 1, obj);
        }
        
        if(mapGrid[x][y].type == "road") {
            fabricPath.splice(roadArray.indexOf(mapGrid[x][y]),0,obj);
            obj.on('mousemove', function() {
                obj.set('cursor', 'not-allowed');
            });
        } else { 
            obj.on('mousedown', function() {
                canvas.setActiveObject(obj);
                toggleMenu(x,y);
                if(tmpActiveObj != obj) {
                    if(tmpActiveObj != null) {
                        tmpActiveObj.filters.splice(tmpActiveObj.filters.indexOf(selectedFilter),1);
                        tmpActiveObj.applyFilters(canvas.renderAll.bind(canvas));
                    }
                    tmpActiveObj = obj;
                    obj.filters.push(selectedFilter);
                    obj.applyFilters(canvas.renderAll.bind(canvas));
                }
            });
        }
    }
    
    if(type == "car")
    {
        obj.set({width: tileWidth, height: tileWidth, left: Scoordx * tileWidth + tileWidth/2, top: Scoordy * tileWidth + tileWidth/2});
        obj.set('selectable', false);
        obj.set('originX', 'center');
        obj.set('originY', 'center');
        obj.set('vx', 0);
        obj.set('vy', 0);
        carObjs.push(obj);
    }
    
    if(type == "tower")
    {
        obj.set({width: tileWidth, height: tileWidth, left: selectedObj.getCenterPoint().x, top: selectedObj.getCenterPoint().y});
        obj.set('selectable', false);
        obj.set('originX', 'center');
        obj.set('originY', 'center');
        
        obj.on('mousedown', function() {
            canvas.setActiveObject(obj);
            var xBackend = PLAYER.towerArray[towerObjs.indexOf(obj)].coordX;
            var yBackend = PLAYER.towerArray[towerObjs.indexOf(obj)].coordY;
            toggleMenu(x,y,obj);
            
            if(tmpActiveObj != fabricMapGrid[xBackend][yBackend]) {
                if(tmpActiveObj != null) {
                    tmpActiveObj.filters.splice(tmpActiveObj.filters.indexOf(selectedFilter),1);
                    tmpActiveObj.applyFilters(canvas.renderAll.bind(canvas));
                }
                tmpActiveObj = fabricMapGrid[xBackend][yBackend];
                fabricMapGrid[xBackend][yBackend].filters.push(selectedFilter);
                fabricMapGrid[xBackend][yBackend].applyFilters(canvas.renderAll.bind(canvas));
            }
        });
        
        obj.fireRate = Math.ceil(64/(PLAYER.towerArray[towerObjs.length].rate));
        
        towerObjs.push(obj);
    }
}

function lookforRoadDeg()
{
    for(var i=0;i<roadArray.length;i++){
        if(roadArray[i].isCorner){
            if (roadArray[i-1].direction - roadArray[i].direction == -90 || roadArray[i-1].direction - roadArray[i].direction > 90)
                degChange.push(-90);
            else 
                degChange.push(90);
        }
    }
}
