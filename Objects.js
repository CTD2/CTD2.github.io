/*global displayHUD checkVehicles PLAYER preLoad cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles gameScreen xPos yPos makeTerrainGrid mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/

//INTERFACE------------------------------------------------------------------------------------------------------------------------------------------

function Menu(name, type)
{
	this.name = name;
	this.element = document.createElement("div");
	
	//menu title
	var title = document.createElement("h2");
	title.innerHTML = name;
	this.element.appendChild(title);
	
	this.display = function()
	{
		//document.getElementById("gridTable").style.display = "none";
		this.element.style.display = "block";
	};
	
	this.hide = function(firstTime)
	{
		if(firstTime)
		{
			this.element.style.display = "none";
			makeTerrainGrid();
		}
		else
		{
			//document.getElementById("gridTable").style.display = "block";
			this.element.style.display = "none";
		}
	};
	
	if(type == "main")
	{
		//setting menus their own class
		var elClass = document.createAttribute("class");
		elClass.value = "menu";
		this.element.setAttributeNode(elClass);
		//menu buttons
		//MAP 1
		var startButton1 = document.createElement("button");
		startButton1.innerHTML = "Map 1";
		var startGame1 = document.createAttribute("onclick");
		startGame1.value = "mainMenu.hide(true);startGame(1);"; //start game function
		startButton1.setAttributeNode(startGame1);
		this.element.appendChild(startButton1);
		//MAP 2
		var startButton2 = document.createElement("button");
		startButton2.innerHTML = "Map 2";
		var startGame2 = document.createAttribute("onclick");
		startGame2.value = "mainMenu.hide(true);startGame(2);"; //start game function
		startButton2.setAttributeNode(startGame2);
		this.element.appendChild(startButton2);
		//MAP 3
		var startButton3 = document.createElement("button");
		startButton3.innerHTML = "Map 3";
		var startGame3 = document.createAttribute("onclick");
		startGame3.value = "mainMenu.hide(true);startGame(3);"; //start game function
		startButton3.setAttributeNode(startGame3);
		this.element.appendChild(startButton3);
		//MAP 4
		var startButton4 = document.createElement("button");
		startButton4.innerHTML = "Map 4";
		var startGame4 = document.createAttribute("onclick");
		startGame4.value = "mainMenu.hide(true);startGame(4);"; //start game function
		startButton4.setAttributeNode(startGame4);
		this.element.appendChild(startButton4);
		gameScreen.appendChild(this.element);
	}
	else if(type == "shop")
	//ADD THE HOVER CONTEXT MENUS FOR THE TOWER OPTIONS SHOWING PRICE AND STATS
	//USE PAST TURNER CLASS EXAMPLE FOR REFERENCE (the forest thing)
	//ALSO ADD LIST OF UPGRADES PER TOWER IN THE SHOPMENU
	{
		var shopId = document.createAttribute("id");
		shopId.value = "shop";
		this.element.setAttributeNode(shopId);
		
		var typeTerrain = document.createElement("h3"); //displays terrain info
		
		var towerStatus = document.createElement("h3"); //displays if tower is already here
		
		var offTowers = document.createElement("h3"); //defensive title
		
		//WHEN YOU HOVER OVER BUTTONS, MAKE SMALL CONTEXT MENU WITH STATS AND PRICING!!!!!!!!!!!
		defenseDropdownContainer = document.createElement("div");
		defenseDropdownContainerClass =document.createAttribute("class");
		defenseDropdownContainerClass.value = "defenseDropdownContainer";
		defenseDropdownContainer.setAttributeNode(defenseDropdownContainerClass);
		
		defenseDropdownBtn = document.createElement("button");
		defenseDropdownBtnClass = document.createAttribute("class");
		defenseDropdownBtnClass.value = "defenseDropdownBtn";
		defenseDropdownBtn.setAttributeNode(defenseDropdownBtnClass);
		defenseDropdownBtn.innerHTML = "Select Defensive Tower";
		dropDefenseTowers = document.createAttribute("onclick");
		dropDefenseTowers.value = "listDTowers();";
		defenseDropdownBtn.setAttributeNode(dropDefenseTowers);
		
		defenseDropdown = document.createElement("div");
		defenseDropdownClass =document.createAttribute("class");
		defenseDropdownClass.value = "dropdownContent";
		defenseDropdown.setAttributeNode(defenseDropdownClass);
		defenseDropdownId =document.createAttribute("id");
		defenseDropdownId.value = "defenseDropdown";
		defenseDropdown.setAttributeNode(defenseDropdownId);
		
		
		t1 = document.createElement("button");
		t1.innerHTML = "Sprinkler v1";
		towerButtClass1 = document.createAttribute("class");
		towerButtClass1.value = "towerButtons";
		t1.setAttributeNode(towerButtClass1);
		placeT1 = document.createAttribute("onclick");
		// showInfoT1 = document.createAttribute("onmouseover") ;
		
		// unShowInfo = document.createAttribute("onmouseout") ;
		
		t2 = document.createElement("button");
		t2.innerHTML = "Sprinkler v2";
		towerButtClass2 = document.createAttribute("class");
		towerButtClass2.value = "towerButtons";
		t2.setAttributeNode(towerButtClass2);
		placeT2 = document.createAttribute("onclick");
		// showInfoT2 = document.createAttribute("onmouseover") ;
		
		t3 = document.createElement("button");
		t3.innerHTML = "Sprinkler v3";
		towerButtClass3 = document.createAttribute("class");
		towerButtClass3.value = "towerButtons";
		t3.setAttributeNode(towerButtClass3);
		placeT3 = document.createAttribute("onclick");
		// showInfoT3 = document.createAttribute("onmouseover") ;
		
		t4 = document.createElement("button");
		t4.innerHTML = "Water Tower v1";
		towerButtClass4 = document.createAttribute("class");
		towerButtClass4.value = "towerButtons";
		t4.setAttributeNode(towerButtClass4);
		placeT4 = document.createAttribute("onclick");
		// showInfoT4 = document.createAttribute("onmouseover") ;
		
		t5 = document.createElement("button");
		t5.innerHTML = "Water Tower v2";
		towerButtClass5 = document.createAttribute("class");
		towerButtClass5.value = "towerButtons";
		t5.setAttributeNode(towerButtClass5);
		placeT5 = document.createAttribute("onclick");
		// showInfoT5 = document.createAttribute("onmouseover") ;
		
		t6 = document.createElement("button");
		t6.innerHTML = "Water Tower v3";
		towerButtClass6 = document.createAttribute("class");
		towerButtClass6.value = "towerButtons";
		t6.setAttributeNode(towerButtClass6);
		placeT6 = document.createAttribute("onclick");
		// showInfoT6 = document.createAttribute("onmouseover") ;
		
		t7 = document.createElement("button");
		t7.innerHTML = "Fire Hydrant v1";
		towerButtClass7 = document.createAttribute("class");
		towerButtClass7.value = "towerButtons";
		t7.setAttributeNode(towerButtClass7);
		placeT7 = document.createAttribute("onclick");
		// showInfoT7 = document.createAttribute("onmouseover") ;
		
		t8 = document.createElement("button");
		t8.innerHTML = "Fire Hydrant v2";
		towerButtClass8 = document.createAttribute("class");
		towerButtClass8.value = "towerButtons";
		t8.setAttributeNode(towerButtClass8);
		placeT8 = document.createAttribute("onclick");
		// showInfoT8 = document.createAttribute("onmouseover") ;
		
		t9 = document.createElement("button");
		t9.innerHTML = "Fire Hydrant v3";
		towerButtClass9 = document.createAttribute("class");
		towerButtClass9.value = "towerButtons";
		t9.setAttributeNode(towerButtClass9);
		placeT9 = document.createAttribute("onclick");
		// showInfoT9 = document.createAttribute("onmouseover") ;
		
		t10 = document.createElement("button");
		t10.innerHTML = "Mech Geyser v1";
		towerButtClass10 = document.createAttribute("class");
		towerButtClass10.value = "towerButtons";
		t10.setAttributeNode(towerButtClass10);
		placeT10 = document.createAttribute("onclick");
		// showInfoT10 = document.createAttribute("onmouseover") ;
		
		t11 = document.createElement("button");
		t11.innerHTML = "Mech Geyser v2";
		towerButtClass11 = document.createAttribute("class");
		towerButtClass11.value = "towerButtons";
		t11.setAttributeNode(towerButtClass11);
		placeT11 = document.createAttribute("onclick");
		// showInfoT11 = document.createAttribute("onmouseover") ;
		
		t12 = document.createElement("button");
		t12.innerHTML = "Mech Geyser v3";
		towerButtClass12 = document.createAttribute("class");
		towerButtClass12.value = "towerButtons";
		t12.setAttributeNode(towerButtClass12);
		placeT12 = document.createAttribute("onclick");
		// showInfoT12 = document.createAttribute("onmouseover") ;
		
		
		var prodTowers = document.createElement("h3"); //production title
		
		productionDropdownContainer = document.createElement("div");
		productionDropdownContainerClass =document.createAttribute("class");
		productionDropdownContainerClass.value = "productionDropdownContainer";
		productionDropdownContainer.setAttributeNode(productionDropdownContainerClass);
		
		productionDropdownBtn = document.createElement("button");
		productionDropdownBtnClass = document.createAttribute("class");
		productionDropdownBtnClass.value = "productionDropdownBtn";
		productionDropdownBtn.setAttributeNode(productionDropdownBtnClass);
		productionDropdownBtn.innerHTML = "Select Production Tower";
		dropProductionTowers = document.createAttribute("onclick");
		dropProductionTowers.value = "listPTowers();";
		productionDropdownBtn.setAttributeNode(dropProductionTowers);
		
		productionDropdown = document.createElement("div");
		productionDropdownClass =document.createAttribute("class");
		productionDropdownClass.value = "dropdownContent";
		productionDropdown.setAttributeNode(productionDropdownClass);
		productionDropdownId =document.createAttribute("id");
		productionDropdownId.value = "productionDropdown";
		productionDropdown.setAttributeNode(productionDropdownId);
		
		
		p1 = document.createElement("button");
		p1.innerHTML = "Hydro Power Plant";
		pTowerButtClass1 = document.createAttribute("class");
		pTowerButtClass1.value = "pTowerButtons";
		p1.setAttributeNode(pTowerButtClass1);
		placeP1 = document.createAttribute("onclick");
		// showInfoP1 = document.createAttribute("onmouseover") ;
		
		p2 = document.createElement("button");
		p2.innerHTML = "Solar Power Plant";
		pTowerButtClass2 = document.createAttribute("class");
		pTowerButtClass2.value = "pTowerButtons";
		p2.setAttributeNode(pTowerButtClass2);
		placeP2 = document.createAttribute("onclick");
		// showInfoP2 = document.createAttribute("onmouseover") ;
		
		p3 = document.createElement("button");
		p3.innerHTML = "Oil Power Plant";
		pTowerButtClass3 = document.createAttribute("class");
		pTowerButtClass3.value = "pTowerButtons";
		p3.setAttributeNode(pTowerButtClass3);
		placeP3 = document.createAttribute("onclick");
		// showInfoP3 = document.createAttribute("onmouseover") ;
		
		p4 = document.createElement("button");
		p4.innerHTML = "Nuclear Power Plant";
		pTowerButtClass4 = document.createAttribute("class");
		pTowerButtClass4.value = "pTowerButtons";
		p4.setAttributeNode(pTowerButtClass4);
		placeP4 = document.createAttribute("onclick");
		// showInfoP4 = document.createAttribute("onmouseover") ;
		
		
		var upgrades = document.createElement("h3"); //upgrades title
		
		upgradesDropdownContainer = document.createElement("div");
		upgradesDropdownContainerClass =document.createAttribute("class");
		upgradesDropdownContainerClass.value = "upgradesDropdownContainer";
		upgradesDropdownContainer.setAttributeNode(upgradesDropdownContainerClass);
		
		upgradesDropdownBtn = document.createElement("button");
		upgradesDropdownBtnClass = document.createAttribute("class");
		upgradesDropdownBtnClass.value = "upgradesDropdownBtn";
		upgradesDropdownBtn.setAttributeNode(upgradesDropdownBtnClass);
		upgradesDropdownBtn.innerHTML = "Select Tower Upgrades";
		dropUpgradesTowers = document.createAttribute("onclick");
		dropUpgradesTowers.value = "listUpgrades();";
		upgradesDropdownBtn.setAttributeNode(dropUpgradesTowers);
		
		upgradesDropdown = document.createElement("div");
		upgradesDropdownClass =document.createAttribute("class");
		upgradesDropdownClass.value = "dropdownContent";
		upgradesDropdown.setAttributeNode(upgradesDropdownClass);
		upgradesDropdownId =document.createAttribute("id");
		upgradesDropdownId.value = "upgradesDropdown";
		upgradesDropdown.setAttributeNode(upgradesDropdownId);
		
		
		u1 = document.createElement("button");
		u1.innerHTML = "Upgrade Damage";
		upgradesButtClass1 = document.createAttribute("class");
		upgradesButtClass1.value = "upgradesButtons";
		u1.setAttributeNode(upgradesButtClass1);
		placeU1 = document.createAttribute("onclick");
		// showInfoU1 = document.createAttribute("onmouseover") ;
		
		u3 = document.createElement("button");
		u3.innerHTML = "Upgrade Range";
		upgradesButtClass3 = document.createAttribute("class");
		upgradesButtClass3.value = "upgradesButtons";
		u3.setAttributeNode(upgradesButtClass3);
		placeU3 = document.createAttribute("onclick");
		// showInfoU3 = document.createAttribute("onmouseover") ;
		
		u4 = document.createElement("button");
		u4.innerHTML = "Upgrade Production";
		upgradesButtClass4 = document.createAttribute("class");
		upgradesButtClass4.value = "upgradesButtons";
		u4.setAttributeNode(upgradesButtClass4);
		placeU4 = document.createAttribute("onclick");
		// showInfoU4 = document.createAttribute("onmouseover") ;
		
		sellT = document.createElement("button");
		sellT.innerHTML = "Sell Tower";
		sellTButtClass = document.createAttribute("class");
		sellTButtClass.value = "sellTowerButt";
		sellT.setAttributeNode(sellTButtClass);
		placeSellT = document.createAttribute("onclick");
		// showInfoSellT = document.createAttribute("onmouseover") ;
		
		this.element.appendChild(typeTerrain);
		this.element.appendChild(towerStatus);
		
		this.element.appendChild(offTowers);
		this.element.appendChild(defenseDropdownContainer);
		defenseDropdownContainer.appendChild(defenseDropdownBtn);
		defenseDropdownContainer.appendChild(defenseDropdown);
		defenseDropdown.appendChild(t1);
		defenseDropdown.appendChild(t2);
		defenseDropdown.appendChild(t3);
		defenseDropdown.appendChild(t4);
		defenseDropdown.appendChild(t5);
		defenseDropdown.appendChild(t6);
		defenseDropdown.appendChild(t7);
		defenseDropdown.appendChild(t8);
		defenseDropdown.appendChild(t9);
		defenseDropdown.appendChild(t10);
		defenseDropdown.appendChild(t11);
		defenseDropdown.appendChild(t12);
		
		this.element.appendChild(prodTowers);
		this.element.appendChild(productionDropdownContainer);
		productionDropdownContainer.appendChild(productionDropdownBtn);
		productionDropdownContainer.appendChild(productionDropdown);
		productionDropdown.appendChild(p1);
		productionDropdown.appendChild(p2);
		productionDropdown.appendChild(p3);
		productionDropdown.appendChild(p4);
		
		this.element.appendChild(upgrades);
		this.element.appendChild(upgradesDropdownContainer);
		upgradesDropdownContainer.appendChild(upgradesDropdownBtn);
		upgradesDropdownContainer.appendChild(upgradesDropdown);
		upgradesDropdown.appendChild(u1);
		upgradesDropdown.appendChild(u3);
		upgradesDropdown.appendChild(u4);
		
		this.element.appendChild(sellT);
		
		this.hide(false);
		
		this.reloadShop = function(terrainObject, x, y)
		{
			this.display();
			
			typeTerrain.innerHTML = "Coords: [<span>"+x+"</span>, <span>"+y+"</span>]" + "<br/>Type of block: <br/><span>" + terrainObject.type.charAt(0).toUpperCase() + terrainObject.type.slice(1) + "</span>";
			
			if(terrainObject.containsTower)
			{
				for(i = 0; i < PLAYER.towerArray.length; i++)
				{
					if(PLAYER.towerArray[i].coordX == x && PLAYER.towerArray[i].coordY == y)
					{
						towerStatus.innerHTML = "Status: <br>Occupied by <br/>a <span>" + PLAYER.towerArray[i].toString() + "</span>";
						break;
					}
				}
			}
			else if(terrainObject.type == "road")
				towerStatus.innerHTML = "Status: <br/>Blocked by Road";
			else
				towerStatus.innerHTML = "Status: <br/>Unoccupied";
			
			//MAYBE MAKE THIS INTO A DROPDOWN MENU TO MAKE IT NICE AND NEAT AND COMPACT -- YES I'M GONNA DO THAT, IT'LL MAKE THE HARD CODE LESS PAINFUL
			//ALSO INCLUDE PRICE AND STATS -- MAYBE IN A HOVER EVENT OR SOMETHING
			offTowers.innerHTML = "Defensive Towers:"; //ughhhhhhhhh so much hardcode -- this hurt me so much to write
			placeT1.value = "makeSprinklerOne("+x+","+y+")";
			t1.setAttributeNode(placeT1);
			// showInfoT1.value = "hoverTowerInfo("+infoS1+")";
			// t1.setAttributeNode(showInfoT1);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t1.setAttributeNode(unShowInfo);
			placeT2.value = "makeSprinklerTwo("+x+","+y+")";
			t2.setAttributeNode(placeT2);
			// showInfoT2.value = "hoverTowerInfo("+infoS2+")";
			// t2.setAttributeNode(showInfoT2);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t2.setAttributeNode(unShowInfo);
			placeT3.value = "makeSprinklerThree("+x+","+y+")";
			t3.setAttributeNode(placeT3);
			// showInfoT3.value = "hoverTowerInfo("+infoS3+")";
			// t3.setAttributeNode(showInfoT3);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t3.setAttributeNode(unShowInfo);
			placeT4.value = "makeWaterTowerOne("+x+","+y+")";
			t4.setAttributeNode(placeT4);
			// showInfoT4.value = "hoverTowerInfo("+infoW1+")";
			// t4.setAttributeNode(showInfoT4);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t4.setAttributeNode(unShowInfo);
			placeT5.value = "makeWaterTowerTwo("+x+","+y+")";
			t5.setAttributeNode(placeT5);
			// showInfoT5.value = "hoverTowerInfo("+infoW2+")";
			// t5.setAttributeNode(showInfoT5);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t5.setAttributeNode(unShowInfo);
			placeT6.value = "makeWaterTowerThree("+x+","+y+")";
			t6.setAttributeNode(placeT6);
			// showInfoT6.value = "hoverTowerInfo("+infoW3+")";
			// t6.setAttributeNode(showInfoT6);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t6.setAttributeNode(unShowInfo);
			placeT7.value = "makeFireHydrantOne("+x+","+y+")";
			t7.setAttributeNode(placeT7);
			// showInfoT7.value = "hoverTowerInfo("+infoF1+")";
			// t7.setAttributeNode(showInfoT7);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t7.setAttributeNode(unShowInfo);
			placeT8.value = "makeFireHydrantTwo("+x+","+y+")";
			t8.setAttributeNode(placeT8);
			// showInfoT8.value = "hoverTowerInfo("+infoF2+")";
			// t8.setAttributeNode(showInfoT8);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t8.setAttributeNode(unShowInfo);
			placeT9.value = "makeFireHydrantThree("+x+","+y+")";
			t9.setAttributeNode(placeT9);
			// showInfoT9.value = "hoverTowerInfo("+infoF3+")";
			// t9.setAttributeNode(showInfoT9);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t9.setAttributeNode(unShowInfo);
			placeT10.value = "makeMechGeyserOne("+x+","+y+")";
			t10.setAttributeNode(placeT10);
			// showInfoT10.value = "hoverTowerInfo("+infoG1+")";
			// t10.setAttributeNode(showInfoT10);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t10.setAttributeNode(unShowInfo);
			placeT11.value = "makeMechGeyserTwo("+x+","+y+")";
			t11.setAttributeNode(placeT11);
			// showInfoT11.value = "hoverTowerInfo("+infoG2+")";
			// t11.setAttributeNode(showInfoT11);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t11.setAttributeNode(unShowInfo);
			placeT12.value = "makeMechGeyserThree("+x+","+y+")";
			t12.setAttributeNode(placeT12);
			// showInfoT12.value = "hoverTowerInfo("+infoG3+")";
			// t12.setAttributeNode(showInfoT12);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// t12.setAttributeNode(unShowInfo);
			
			prodTowers.innerHTML = "Production Towers:";
			placeP1.value = "makeHydroPower("+x+","+y+")";
			p1.setAttributeNode(placeP1);
			// showInfoP1.value = "hoverTowerInfo("+infoHY+")";
			// p1.setAttributeNode(showInfoP1);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// p1.setAttributeNode(unShowInfo);
			placeP2.value = "makeSolarPower("+x+","+y+")";
			p2.setAttributeNode(placeP2);
			// showInfoP2.value = "hoverTowerInfo("+infoSO+")";
			// p2.setAttributeNode(showInfoP2);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// p2.setAttributeNode(unShowInfo);
			placeP3.value = "makeOilPower("+x+","+y+")";
			p3.setAttributeNode(placeP3);
			// showInfoP3.value = "hoverTowerInfo("+infoOI+")";
			// p3.setAttributeNode(showInfoP3);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// p3.setAttributeNode(unShowInfo);
			placeP4.value = "makeNuclearPower("+x+","+y+")";
			p4.setAttributeNode(placeP4);
			// showInfoP4.value = "hoverTowerInfo("+infoNU+")";
			// p4.setAttributeNode(showInfoP4);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// p4.setAttributeNode(unShowInfo);
			
			upgrades.innerHTML = "Upgrades:";
			placeU1.value = "upgradeDamage("+x+","+y+")";
			u1.setAttributeNode(placeU1);
			// showInfoU1.value = "hoverUpgradeInfo("+x+","+y+", 'damage')";
			// u1.setAttributeNode(showInfoU1);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// u1.setAttributeNode(unShowInfo);
			placeU3.value = "upgradeRange("+x+","+y+")";
			u3.setAttributeNode(placeU3);
			// showInfoU3.value = "hoverUpgradeInfo("+x+","+y+", 'range')";
			// u3.setAttributeNode(showInfoU3);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// u3.setAttributeNode(unShowInfo);
			placeU4.value = "upgradeProduction("+x+","+y+")";
			u4.setAttributeNode(placeU4);
			// showInfoU4.value = "hoverUpgradeInfo("+x+","+y+", 'production')";
			// u4.setAttributeNode(showInfoU4);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// u4.setAttributeNode(unShowInfo);
			
			placeSellT.value = "sellTower("+x+","+y+")";
			sellT.setAttributeNode(placeSellT);
			// showInfoSellT.value = "hoverSellInfo("+x+","+y+")";
			// sellT.setAttributeNode(showInfoSellT);
			// unShowInfo.value = "infoBox.style.display = 'none'";
			// sellT.setAttributeNode(unShowInfo);
		}
		document.body.appendChild(this.element);
		
	}
	
	//appending to gameScreen
}



//GAME-----------------------------------------------------------------------------------------------------------------------------------------------
var SPEEDVH = 250;
var SPEEDPR = 1;

function OffensiveTower(cost, range, damage, rate, efficiency, coordX, coordY, type, terrainType)
{
	this.cost = cost ; //price to make
	this.range = range; //range in num of changeableGrid spaces it can shoot to
	this.damage = damage;//num hp/dirtiness it takes off per hit
	this.rate = rate;//speed at which it fires
	this.efficiency = efficiency;//num energy/water it takes to shoot
	// this.upgrade = upgrade;// cost of upgrade
	this.upgradeType = ""; //type of upgrade ex. increase rangge by x, incrase damage by y, rate, etc.
	this.sell = 0.7*cost; //price to sell, less than cost, ex. *0.7
	this.coordX = coordX; //x coordinate by changeableGrid spaces
	this.coordY = coordY;//y coord
	this.type = type; //type of tower ex. water gun, fire hose etc.
	this.source = "offensiveTowers/" + this.type + ".png"; //image source file
	this.terrainType = terrainType; // type of terrain needed for tower to be placed, ex. hydro mill on river, not grass.
	this.upgrades = 0 ;
	
	var roadArray = [];
	
	this.toString = function()
	{
		if(this.type == "sprinklerI")
			return "Sprinkler v1";
		if(this.type == "sprinklerII")
			return "Sprinkler v2";
		if(this.type == "sprinklerIII")
			return "Sprinkler v3";
		
		if(this.type == "waterTowerI")
			return "Water Tower v1";
		if(this.type == "waterTowerII")
			return "Water Tower v2";
		if(this.type == "waterTowerIII")
			return "Water Tower v3";
		
		if(this.type == "fireHydrantI")
			return "Fire Hydrant v1";
		if(this.type == "fireHydrantII")
			return "Fire Hydrant v2";
		if(this.type == "fireHydrantIII")
			return "Fire Hydrant v3";
		
		if(this.type == "geyserI")
			return "Mech Geyser v1";
		if(this.type == "geyserII")
			return "Mech Geyser v2";
		if(this.type == "geyserIII")
			return "Mech Geyser v3";
	}
	
	this.getLowerLims = function()
	{
		// var array = new Array() ;
		// var x = this.coordX-this.range ;
		// while(x < 0)
		// {
		// 	x++ ;
		// }
		// var y = this.coordY-this.range ;
		// while(y < 0)
		// {
		// 	y++ ;
		// }
		// array[0] = x ;
		// array[1] = y ;
		// return array ;
	};
	this.getUpperLims = function()
	{
		// var array = new Array() ;
		// var x = this.coordX+this.range ;
		// while(x > 9)
		// {
		// 	x-- ;
		// }
		// var y = this.coordY+this.range ;
		// while(y > 9)
		// {
		// 	y-- ;
		// }
		// array[0] = x ;
		// array[1] = y ;
		// return array ;
	};
	
	// this.lowerLims = this.getLowerLims() ;
	// this.upperLims = this.getUpperLims() ;
	
	this.getRoadRange = function()
	{
		// var array = new Array() ;
		// for(var i = this.lowerLims[0] ; i <= this.upperLims[0] ; i++)
		// {
		// 	for(var j = this.lowerLims[1] ;j <= this.upperLims[1] ; j++)
		// 	{
		// 		if(changeableGrid[i][j].type == "road")
		// 		{
		// 			array.push(changeableGrid[i][j]) ;
		// 		}
		// 	}
		// }
		// return array ;
	};
	
	// this.roadInRange = this.getRoadRange() ;

	// this.roadInRange.sort(function(obj1, obj2)
	// {
	// 	return obj2.roadNum-obj1.roadNum ;
	// });
	
	this.shoot = function(vehicleObject)
	{
		//where to aim, and how to shoot (only at hp over 0)
		//this.roadInRange = this.getRoadRange();
		if(vehicleObject.hp > 0)
		{
			vehicleObject.hp -= this.damage;
			PLAYER.energy -= this.efficiency ;
			displayHUD() ;
			
					//SHOOT BY CREATING A PROJECTILE OBJECT IN THE SPACE WHERE THE VEHICLE WAS, TEMPORARILY SO IT CAN "COLLIDE" WITH THE VEHICLE
		}
		vehicleObject.hit();
		return;
	};
}
function ProductionTower(rate, cost, coordX, coordY, type, terrainType)
{
	this.rate = rate; //rate of production of energy/water
	this.cost = cost ;
	// this.upgrade = upgrade;
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
function Vehicles(hp, type, gains, loss, coordX, coordY, cityObject/*, vehicleNum*/)
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
		//get hit by water, therefore take off some hp, if <= 0, source changes to clean version, no longer gets targeted.
		
		if(this.hp <= 0)
		{
			this.condition = "clean" ;
			this.source = this.condition + "/" + this.type + this.angle +".png" ;
		}
		//updateRoad() ;
	};
	this.reachEndClean = function(cityObject)
	{
		//remove object, add money to city.money
		cityObject.money += this.gains;
		
	};
	this.reachEndDirty = function(cityObject)
	{
		//remove object, remove cleanline from city.dirtiness
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