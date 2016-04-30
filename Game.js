//RUN GAME
var SHOP_OPEN = false;
var roundIsOver = false;

var STARTING_ENERGY = 100;
var STARTING_MONEY = 2000;

var MENU_OPEN = false;
var purchasedTower;
var selectedXIdx;
var selectedYIdx;
var audio = new Audio('Shoot.wav');


var projectiles = [];

function startGame(mapNum)
{
	//initializing the city
	PLAYER = new City(STARTING_ENERGY, STARTING_MONEY);
	
	//sequential loading
    populateMap(mapNum);
    load(generateRoadArray, 25);
    load(sortRoadArray, 50);
    load(generatePathNodes, 75);
    load(drawMap, 100);
    
    setTimeout(function(){canvas.renderAll();}, 250);
	
	initializeHUD();
	
	levelCountBox = document.getElementById("levelCounter");
	levelNum = document.getElementById("levelNumber");
	startBtn = document.getElementById("startBtn");
	
	$("#startBtn").removeClass("disabled");
}

function alertUser(message)
{
    infoBox.style.display = "block";
    infoBoxContent.innerHTML = message;
}

function dismissMessage()
{
    infoBox.style.display = "none";
    infoBoxContent.innerHTML = "";
}

// function spawnVehicle(num, vehicle)
// {
// 	num--;
	
// 	if(num >= 0)
// 	{
// 		var VehicleNew;
// 		if(vehicle.type == "bike")
// 			VehicleNew = makeBike() ;
// 		if(vehicle.type == "motorcycle")
// 			VehicleNew = makeMotorcycle() ;
// 		if(vehicle.type == "smartCar")
// 			VehicleNew = makeSmartCar() ;
// 		if(vehicle.type == "sportsCar")
// 			VehicleNew = makeSportsCar() ;
// 		if(vehicle.type == "SUV")
// 			VehicleNew = makeSUV() ;
// 		if(vehicle.type == "truck")
// 			VehicleNew = makeTruck() ;
// 		if(vehicle.type == "garbageTruck")
// 			VehicleNew = makeGarbageTruck() ;
		
// 		PLAYER.vehicleArray.push(VehicleNew);
// 		updateRoad();
// 	}
// }

function spawnTower(tower)
{
	PLAYER.towerArray.push(tower);
	drawTower(fabricMapGrid[selectedXIdx][selectedYIdx], tower.source);
}

function sellTower()
{
	var index = towerObjs.indexOf(canvas.getActiveObject());
	var tower = PLAYER.towerArray[index];
	mapGrid[tower.coordX][tower.coordY].containsTower = false;
	canvas.setActiveObject(fabricMapGrid[tower.coordX][tower.coordY]);
	toggleMenu(tower.coordX, tower.coordY);
	PLAYER.towerArray.splice(index, 1);
	canvas.remove(towerObjs[index]);
	towerObjs.splice(index,1);
	PLAYER.money += tower.sell;
	if(tower.source.indexOf("production") > -1)
	{
		PLAYER.energyRate -= tower.rate ;
	}
	displayHUD();
	canvas.renderAll();
}

function start()
{
	//startBtn.disabled = true;
	$("#startBtn").addClass("disabled"); //using JQuery to disable and reenable buttons bc we're using the pretty bootstrap buttons
	//$("#quitBtn").addClass("disabled");
	$("#pauseBtn").removeClass("disabled");
	//levelCountBox.style.display = "block" ;
	levelRun();
	spawnEnemies();
	levelNum.innerHTML = level;
	var interval = setInterval(
		function()
		{
			PLAYER.power();
			
			if(roundIsOver)
			{
				//console.log("end of interval is running before");
				//vehicleQueue.shift();
				clearInterval(interval);
				//startBtn.disabled = false;
				$("#startBtn").removeClass("disabled");
				//$("#quitBtn").removeClass("disabled");
				$("#pauseBtn").addClass("disabled");
				roundIsOver = false;
				
				//maybe delay this or something to make it more obvious that it's a end-level bonus
				PLAYER.money+=(150 + level*20); //can change this around if desired
				displayHUD();
				//console.log("end of interval is running after");
			}
				
		}, 500);//SPEEDVH); 
		
}
function shootVehicle()
{
fabric.Image.fromURL("/projectiles/binary.png", (img)=>{
	for(var i =0; i < towerObjs.length;i++)
	{
		for(var j = 0; j < carObjs.length; j++)
		{
			if(PLAYER.vehicleArray[j].condition == "dirty" && PLAYER.towerArray[i].source.indexOf("offensiveTowers") >= 0 && PLAYER.energy >= PLAYER.towerArray[i].efficiency)
			{
				var temp = PLAYER.towerArray[i];
				var oriX = towerObjs[i].getCenterPoint().x;
				var oriY = towerObjs[i].getCenterPoint().y;
				var carX = carObjs[j].getCenterPoint().x;
				var carY = carObjs[j].getCenterPoint().y;
				var xLength = carX - oriX;
				var yLength = carY - oriY;
				
				if(Math.abs(xLength) <= temp.range && Math.abs(yLength) <= temp.range)
				{
					var hyLength = Math.sqrt((xLength*xLength)+(yLength*yLength));
					var anglePOne = parseInt(Math.acos(xLength/hyLength)*180/Math.PI);
					var anglePTwo = parseInt(Math.asin(yLength/hyLength)*180/Math.PI);
					var angleRealDeg = (Math.abs(anglePTwo)/anglePTwo) * anglePOne;
			        	 img.width = Math.abs(hyLength); 
			        	 img.height = 5;
			        	 img.angle=angleRealDeg;
			        	 img.originX = 'center';
			        	 img.originY = 'center';
			        	 img.selectable = false;
			        	 img.left = oriX + (xLength/2);
			        	 img.top = oriY + (yLength/2);
			        	 projectiles.push(img);
			        	 canvas.add(img);
			        	 canvas.renderAll.bind(canvas);
			        	 setTimeout(function(){canvas.remove(projectiles[0]);projectiles.shift();},towerObjs[i].fireRate*5);
			          	 //setTimeout(function(img){canvas.remove(img)},100);
			        audio.play();
					console.log("Vehicle:"+PLAYER.vehicleArray[j].hp+ " Angle shot: "+angleRealDeg);
					PLAYER.towerArray[i].shoot(PLAYER.vehicleArray[j]);
					carObjs[j]._element.src = PLAYER.vehicleArray[j].source;
					break;
				}
			}
		}
	}
});
}

//this doesn't actually stop the game
//the way we've written the game thus far, we'd either just have to refresh the page
//or build in a way for us to get rid of all vehicles and towers and all that
function quitPrompt(confirmQuit)
{
	if(confirmQuit)
		var quit = confirm("Are you sure you want to quit?") ;
	else
		var quit = true;

	if(quit)
	{
		PLAYER.vehicleArray.splice(0,PLAYER.vehicleArray.length);
		carObjs.splice(0,carObjs.length);
		PLAYER.towerArray.splice(0,PLAYER.towerArray.length);
		towerObjs.splice(0,towerObjs.length);
		roadArray.splice(0,roadArray.length);
		fabricPath.splice(0,fabricPath.length);
		pathNodes.splice(0,pathNodes.length);
		fabricPathNodes.splice(0,fabricPathNodes.length);
		fabricMapGrid.splice(0,fabricMapGrid.length);
		container.removeChild(document.getElementById("HUD_CONTAINER"));
		level = 0 ;
		hideElements();
		mainMenu.style.display = "block";
		vehicleQueue = null;
	}
}


//for dropdown menus
// function listDTowers()
// {
// 	document.getElementById("defenseDropdown").classList.toggle("show");
	
// 	window.onclick = function(event) 
// 	{
// 		if (!event.target.matches('.defenseDropdownBtn')) 
// 		{
// 			var dropdowns = document.getElementsByClassName("dropdownContent");
// 			for (var i = 0; i < dropdowns.length; i++) 
// 			{
// 				var openDropdown = dropdowns[i];
//   				if (openDropdown.classList.contains('show')) 
//   					openDropdown.classList.remove('show');
//   			}
//   		}
// 	}
// }
// function listPTowers()
// {
// 	document.getElementById("productionDropdown").classList.toggle("show");
	
// 	window.onclick = function(event) 
// 	{
// 		if (!event.target.matches('.productionDropdownBtn')) 
// 		{
// 			var dropdowns = document.getElementsByClassName("dropdownContent");
// 			for (var i = 0; i < dropdowns.length; i++) 
// 			{
// 				var openDropdown = dropdowns[i];
//   				if (openDropdown.classList.contains('show')) 
//   					openDropdown.classList.remove('show');
//   			}
//   		}
// 	}
// }
// function listUpgrades()
// {
// 	document.getElementById("upgradesDropdown").classList.toggle("show");
	
// 	window.onclick = function(event) 
// 	{
// 		if (!event.target.matches('.upgradesDropdownBtn')) 
// 		{
// 			var dropdowns = document.getElementsByClassName("dropdownContent");
// 			for (var i = 0; i < dropdowns.length; i++) 
// 			{
// 				var openDropdown = dropdowns[i];
//   				if (openDropdown.classList.contains('show')) 
//   					openDropdown.classList.remove('show');
//   			}
//   		}
// 	}
// }