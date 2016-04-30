/*globalplayer preLoad cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles gameScreen mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/

//MAP CHOICES
function generateGrass() {
	mapGrid = [];
	fabricMapGrid = [];
	for (var i = 0; i < TILES_PER_SIDE; i++) {
		mapGrid[i] = [];
		fabricMapGrid[i] = [];
		for (var j = 0; j < TILES_PER_SIDE; j++) {
			mapGrid[i][j] = new Terrain("grass", "grass.png", false, "");
		}
	}
}

function generateWater(column) {
	for (var i = 0; i < TILES_PER_SIDE; i++) {
		mapGrid[column][i] = new Terrain("water", "water.png", false, "");
	}
}

function map1() //GROSS
{
	numRoadEnd = 36;
	Scoordx = 0;
	Scoordy = 0;
	generateGrass();
	generateWater(9);
	//OIL
	mapGrid[4][2] = new Terrain("oil", "oil.png", false, "");
	mapGrid[1][7] = new Terrain("oil", "oil.png", false, "");
	mapGrid[7][9] = new Terrain("oil", "oil.png", false, "");
	//ROAD
	mapGrid[0][0] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[0][1] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[0][2] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[0][3] = new Terrain("road", "roadNE.png", true, 0);
	mapGrid[1][3] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[2][3] = new Terrain("road", "roadSW.png", true, 270);
	mapGrid[2][4] = new Terrain("road", "roadNW.png", true, 180);
	mapGrid[1][4] = new Terrain("road", "roadSE.png", true, 270);
	mapGrid[1][5] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[1][6] = new Terrain("road", "roadNE.png", true, 0);
	mapGrid[2][6] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[3][6] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[4][6] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[5][6] = new Terrain("road", "roadNW.png", true, 90);
	mapGrid[5][5] = new Terrain("road", "roadDown.png", true, 90);
	mapGrid[5][4] = new Terrain("road", "roadDown.png", true, 90);
	mapGrid[5][3] = new Terrain("road", "roadDown.png", true, 90);
	mapGrid[5][2] = new Terrain("road", "roadDown.png", true, 90);
	mapGrid[5][1] = new Terrain("road", "roadSE.png", true, 0);
	mapGrid[6][1] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[7][1] = new Terrain("road", "roadSW.png", true, 270);
	mapGrid[7][2] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[7][3] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[7][4] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[7][5] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[7][6] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[7][7] = new Terrain("road", "roadNE.png", true, 0);
	mapGrid[8][7] = new Terrain("road", "roadSW.png", true, 270);
	mapGrid[8][8] = new Terrain("road", "roadNW.png", true, 180);
	mapGrid[7][8] = new Terrain("road", "roadSide.png", true, 180);
	mapGrid[6][8] = new Terrain("road", "roadSide.png", true, 180);
	mapGrid[5][8] = new Terrain("road", "roadSide.png", true, 180);
	mapGrid[4][8] = new Terrain("road", "roadSide.png", true, 180);
	mapGrid[3][8] = new Terrain("road", "roadSide.png", true, 180);
	mapGrid[2][8] = new Terrain("road", "roadSE.png", true, 270);
	mapGrid[2][9] = new Terrain("road", "roadDown.png", true, 270);
}


function map2() {
	numRoadEnd = 32;
	Scoordx = 1;
	Scoordy = 0;
	generateGrass();
	generateWater(9);
	//OIL
	mapGrid[4][9] = new Terrain("oil", "oil.png", false, "");
	//ROAD
	for (var i = 0; i < 8; i++) {
		mapGrid[1][i] = new Terrain("road", "roadDown.png", true, 270);
	}
	mapGrid[1][8] = new Terrain("road", "roadNE.png", true, 0);
	mapGrid[2][8] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[3][8] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[4][8] = new Terrain("road", "roadNW.png", true, 90);
	for (var i = 7; i > 0; i--) {
		mapGrid[4][i] = new Terrain("road", "roadDown.png", true, 90);
	}
	mapGrid[4][0] = new Terrain("road", "roadSE.png", true, 0);
	mapGrid[5][0] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[6][0] = new Terrain("road", "roadSide.png", true, 0);
	mapGrid[7][0] = new Terrain("road", "roadSW.png", true, 270);
	for (var i = 1; i < 10; i++) {
		mapGrid[7][i] = new Terrain("road", "roadDown.png", true, 270);
	}
}


function map3() {
	numRoadEnd = 26;
	Scoordx = 2;
	Scoordy = 0;
	generateGrass();
	generateWater(9);
	//OIL
	mapGrid[5][0] = new Terrain("oil", "oil.png", false, "");
	mapGrid[5][1] = new Terrain("oil", "oil.png", false, "");
	mapGrid[6][0] = new Terrain("oil", "oil.png", false, "");
	mapGrid[6][1] = new Terrain("oil", "oil.png", false, "");
	//ROAD
	for (var i = 0; i < 4; i++) {
		mapGrid[2][i] = new Terrain("road", "roadDown.png", true, 270);
	}
	mapGrid[2][4] = new Terrain("road", "roadNW.png", true, 180);
	mapGrid[1][4] = new Terrain("road", "roadSide.png", true, 180);
	mapGrid[0][4] = new Terrain("road", "roadSE.png", true, 270);
	mapGrid[0][5] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[0][6] = new Terrain("road", "roadNE.png", true, 0);
	for (var i = 1; i < 8; i++) {
		mapGrid[i][6] = new Terrain("road", "roadSide.png", true, 0);
	}
	mapGrid[8][6] = new Terrain("road", "roadSW.png", true, 270);
	mapGrid[8][7] = new Terrain("road", "roadDown.png", true, 270);
	mapGrid[8][8] = new Terrain("road", "roadNW.png", true, 180);
	for (var i = 7; i > 0; i--) {
		mapGrid[i][8] = new Terrain("road", "roadSide.png", true, 180);
	}
	mapGrid[0][8] = new Terrain("road", "roadSE.png", true, 270);
	mapGrid[0][9] = new Terrain("road", "roadDown.png", true, 270);
}


function map4() {
	numRoadEnd = 17;
	Scoordx = 8;
	Scoordy = 0;
	generateGrass();
	generateWater(0);
	//OIL
	mapGrid[6][3] = new Terrain("oil", "oil.png", false, "");
	mapGrid[3][5] = new Terrain("oil", "oil.png", false, "");
	mapGrid[2][9] = new Terrain("oil", "oil.png", false, "");
	//ROAD
	for (var i = 0; i < 4; i++) {
		mapGrid[8][i] = new Terrain("road", "roadDown.png", true, 270);
	}
	mapGrid[8][4] = new Terrain("road", "roadNW.png", true, 180);
	for (var i = 7; i > 1; i--) {
		mapGrid[i][4] = new Terrain("road", "roadSide.png", true, 180);
	}
	mapGrid[1][4] = new Terrain("road", "roadSE.png", true, 270, 12);
	for (var i = 5; i < 10; i++) {
		mapGrid[1][i] = new Terrain("road", "roadDown.png", true, 270);
	}
}

// function applyNumtoRoad()
// {
// 	var roadNum = 0;
	
// 	for(var i = 0; i < changeableGrid.length; i++)
// 	{
// 		if(changeableGrid[i][0].type == "road")
// 		{
// 			changeableGrid[i][0].roadNum = ++roadNum;
// 			lookforRoad(i, 0, roadNum);
// 			return;
// 		}
// 	}
	
// }
// function lookforRoad(x, y, roadnum)
// {
// 	if(x-1 >= 0)
// 	{
// 		if(changeableGrid[x-1][y].type == "road" && changeableGrid[x-1][y].roadNum == 0)
// 		{
// 			roadnum++;
// 			changeableGrid[x-1][y].roadNum = roadnum;
// 			lookforRoad(x-1, y, roadnum);
// 		}
// 	}
// 	if(x+1 <= 9)
// 	{
// 		if(changeableGrid[x+1][y].type == "road" && changeableGrid[x+1][y].roadNum == 0)
// 		{
// 			roadnum++;
// 			changeableGrid[x+1][y].roadNum = roadnum;
// 			lookforRoad(x+1, y, roadnum);
// 		}
// 	}
// 	if(y-1 >= 0)
// 	{
// 		if(changeableGrid[x][y-1].type == "road" && changeableGrid[x][y-1].roadNum == 0)
// 		{
// 			roadnum++;
// 			changeableGrid[x][y-1].roadNum = roadnum;
// 			lookforRoad(x, y-1, roadnum);
// 		}
// 	}
// 	if(y+1 <= 9)
// 	{
// 		if(changeableGrid[x][y+1].type == "road" && changeableGrid[x][y+1].roadNum == 0)
// 		{
// 			roadnum++;
// 			changeableGrid[x][y+1].roadNum = roadnum;
// 			lookforRoad(x, y+1, roadnum);
// 		}
// 	}
// }
/*function makeMap()
{
	var x = Math.random;
	if(x == 0)
	{
		for(var i = 0; i < 10)
		{
			
		}
	}
}*/
