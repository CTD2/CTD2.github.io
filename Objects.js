function OffensiveTower(cost, range, damage, rate, efficiency, coordX, coordY, type, terrainType)
{
	this.cost = cost ; //price to make
	this.range = range; //range in num of changeableGrid spaces it can shoot to
	this.damage = damage;//num hp/dirtiness it takes off per hit
	this.rate = rate;//speed at which it fires
	this.efficiency = efficiency;//num energy/water it takes to shoot
	this.upgradeType = ""; //type of upgrade ex. increase rangge by x, incrase damage by y, rate, etc.
	this.sell = 0.7*cost; //price to sell, less than cost, ex. *0.7
	this.coordX = coordX; //x coordinate by changeableGrid spaces
	this.coordY = coordY;//y coord
	this.type = type; //type of tower ex. water gun, fire hose etc.
	this.source = "offensiveTowers/" + this.type + ".png"; //image source file
	this.terrainType = terrainType; // type of terrain needed for tower to be placed, ex. hydro mill on river, not grass.
	this.upgrades = 0 ;
	
	// var roadArray = [];
	
	this.shoot = function(vehicleObject)
	{
		if(vehicleObject.hp > 0)
		{
			vehicleObject.hp -= this.damage;
			PLAYER.energy -= this.efficiency ;
			displayHUD() ;
		}
		vehicleObject.hit();
		return;
	};
}
function ProductionTower(rate, cost, coordX, coordY, type, terrainType)
{
	this.rate = rate; //rate of production of energy/water
	this.cost = cost ;
	this.sell =  0.7*cost;
	this.coordX = coordX;
	this.coordY = coordY;
	this.type = type;
	this.source = "productionTowers/" + this.type + ".png";
	this.terrainType = terrainType;
	this.upgrades = 0 ;
	this.placeTower = function()
	{
		cityObject.energyRate += rate ;
	};
	
	this.toString = function()
	{
		if(this.type == "hydro")
			return "Hydro Power Plant";
		if(this.type == "solar")
			return "Solar Power Plant";
		if(this.type == "oil")
			return "Oil Rig Plant";
		if(this.type == "nuclear")
			return "Nuclear Power Plant";
	};
}
function defensiveTowerInfo(cost, range, damage, rate, efficiency)
{
	this.cost = cost;
	this.range = range;
	this.damage = damage;
	this.rate = rate;
	this.efficiency = efficiency;
}
function productionTowerInfo(cost, rate)
{
	this.cost = cost;
	this.rate = rate;
}
function Vehicles(hp, type, gains, loss, coordX, coordY, cityObject)
{
	this.hp = hp;//int value of "dirtiness"
	this.type = type; //type of vehicle, USE TYPE ALSO AS NAME OF IMAGE FILE
	this.gains = gains ; // how much money is gained from clean getting through
	this.loss = loss; //how much cleanliness is lost from city when dirty gets through
	this.coordX = coordX; //locations for collision
	this.coordY = coordY; //locations for collision
	this.condition = "dirty" ;
	this.angle = "" ;
	this.source = this.condition + "/" + this.type + this.angle +".png" ; // image source file
	
	this.hit = function()
	{
		if(this.hp <= 0)
		{
			this.condition = "clean" ;
			this.source = this.condition + "/" + this.type + this.angle +".png" ;
		}
	};
	this.reachEndClean = function(cityObject)
	{
		cityObject.money += this.gains;
		
	};
	this.reachEndDirty = function(cityObject)
	{
		cityObject.cleanliness -= this.loss;
		if(cityObject.cleanliness <= 0)
		{
			alert("GAME OVER");
			quitPrompt(false);
		}
	};

}
function Terrain(type, source, occupied, direction, roadNum)
{
	this.type = type ; //type of terrain
	this.source = "terrain/" + source ; //image source file.
	this.occupied = occupied ; // boolean whether or not the space is taken by road
	this.direction = direction ;
	this.containsVehicle = false;
	this.containsTower = false;
	this.roadNum = roadNum ;
	if(source.indexOf("NE")>-1 || source.indexOf("NW")>-1 || source.indexOf("SE")>-1 || source.indexOf("SW")>-1)
    	this.isCorner = true;
    else
    	this.isCorner = false;
	
}
function City(energy, money) //city stats (display in hud)
{
	this.energy = energy;
	this.money = money;
	this.numTowers = 0;
	this.energyRate = 0;
	this.cleanliness = 100;
	this.vehicleArray = new Array();
	this.towerArray = new Array();
	this.power = function()
	{
		this.energy += this.energyRate ;
		displayHUD() ;
	}
	this.testLevel = 10;
	this.testLevelCount = 0;
	this.spawnRate = 1;
	this.carSpeed = 0;
	this.gameStarted =true;
	this.carMovementSpeed = 500;
}
//NOT USED
function TowerProjectile(damage, pxcoordX, pxcoordY)
{
	this.damage = damage ; //THIS NEEDS TO BE DEFINED BY PASSING IN THE TOWER.DAMAGE AS DAMAGE SO THIS WORKS DYNAMICALLY EVEN AFTER A DAMAGE UPGRADE
	this.pxcoordX = pxcoordX; //locations for collision
	this.pxcoordY = pxcoordY; //locations for collision
}

function queuedVehicles() //for spawning
{
	this.vehicles = [];
	
	this.addVehicleSet = function(howMany, vehicleType)
	{
		for(var i = 0; i < howMany; i++){
			this.vehicles.push(vehicleType());	
		}
	}
}