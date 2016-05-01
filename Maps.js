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

function mapRand()
{
	generateGrass() ;
	var side = parseInt(Math.random()*2) ;
	if(side == 1)
		side = 9 ;
	generateWater(side) ;
	if(side == 9)
		upperThresh = 8 ;
	else
		upperThresh = 9 ;
	if(side == 0)
		lowerThresh = 1 ;
	else
		lowerThresh = 0 ;
	
	//GENERATE RANDOM ROAD HERE
	var Xcoord = parseInt(Math.random()*(TILES_PER_SIDE-1)) ;
	var Ycoord = 0 ;
	if(side == 0)
		Xcoord += 1;
	Scoordx = Xcoord;
	Scoordy = 0;
	
	roads = 1 ;
	var begin = 270 ;
	mapGrid[Xcoord][0] = new Terrain("road", "roadDown.png", true, begin);
	placeRoad(Xcoord, Ycoord+1, begin) ;
	
	numRoadEnd = roads ;
	
	var numOil = parseInt(Math.random()*5)+1;
	for(var i = 0 ; i < numOil ; i++)
	{
		var XRand = parseInt(Math.random()*TILES_PER_SIDE);
		var YRand = parseInt(Math.random()*TILES_PER_SIDE);
		if(mapGrid[XRand][YRand].type == "road" || mapGrid[XRand][YRand].type == "water" || mapGrid[XRand][YRand].type == "oil")
			i--
		else
		{
			mapGrid[XRand][YRand] = new Terrain("oil", "oil.png", false, "");
		}
	}
}

function placeRoad(x, y, prevDir)
{
	if(y < 9)
	{
		var dir = getDirection(3,0);
		if(dir == 0 && x+1 > upperThresh)
		{
			dir = getDirection(2,1);
		}
		if(dir == 180 && x-1 < lowerThresh)
		{
			dir = getDirection(2,0);
		}
		if(prevDir == 270 && dir == 270)
		{
			mapGrid[x][y] = new Terrain("road", "roadDown.png", true, dir);
			roads++ ;
			placeRoad(x, y+1, dir) ;
		}
		if(prevDir == 270 && dir == 0)
		{
			mapGrid[x][y] = new Terrain("road", "roadNE.png", true, dir);
			roads++ ;
			placeRoad(x+1, y, dir) ;
		}
		if(prevDir == 270 && dir == 180)
		{
			mapGrid[x][y] = new Terrain("road", "roadNW.png", true, dir);
			roads++ ;
			placeRoad(x-1, y, dir) ;
		}
		if(prevDir == 0 && dir == 0)
		{
			mapGrid[x][y] = new Terrain("road", "roadSide.png", true, dir);
			roads++ ;
			placeRoad(x+1, y, dir) ;
		}
		if(prevDir == 0 && dir == 270)
		{
			mapGrid[x][y] = new Terrain("road", "roadSW.png", true, dir);
			roads++ ;
			placeRoad(x, y+1, dir) ;
		}
		if(prevDir == 180 && dir == 180)
		{
			mapGrid[x][y] = new Terrain("road", "roadSide.png", true, dir);
			roads++ ;
			placeRoad(x-1, y, dir) ;
		}
		if(prevDir == 180 && dir == 270)
		{
			mapGrid[x][y] = new Terrain("road", "roadSE.png", true, dir);
			roads++ ;
			placeRoad(x, y+1, dir) ;
		}
		
		if(prevDir == 0 && dir == 180)
		{
			placeRoad(x, y, prevDir) ;
		}
		if(prevDir == 180 && dir == 0)
		{
			placeRoad(x, y, prevDir) ;
		}
	}
	else
	{
		mapGrid[x][y] = new Terrain("road", "roadDown.png", true, 270);
		roads++ ;
	}
}
function getDirection(n, a)
{
	var nextRoad = parseInt(Math.random()*n)+a;
	if(nextRoad == 0)
		return 0 ;
	if(nextRoad == 1)
		return 270 ;
	if(nextRoad == 2)
		return 180 ;
}