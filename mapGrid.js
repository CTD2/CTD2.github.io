var mapGrid;
var roadArray = [];
var pathNodes = [];

function generateRoadArray()
{
    for(var i = 0; i < TILES_PER_SIDE; i++)
        for(var j = 0; j < TILES_PER_SIDE; j++)
            if(mapGrid[i][j].type == "road")
                roadArray.push(mapGrid[i][j]);
};

function sortRoadArray()
{
	applyNumtoRoad();
	var tmp = selectionSort(roadArray).slice(0); //clones the array
	for(var i = 0; i < roadArray.length; i++)
		roadArray[i] = tmp[i];
};

function selectionSort(items)
{
    var len = items.length, min;

    for(var i = 0; i < len; i++)
    {
        min = i;
        for(var j = i + 1; j < len; j++)
            if (items[j].roadNum < items[min].roadNum)
                min = j;
        if (i != min)
            swap(items, i, min);
    }

    return items;
};

function swap(items, firstIndex, secondIndex)
{
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
};

function generatePathNodes()
{
	pathNodes.push(roadArray[0]); //first roadspace is a node
	for(var i = 0; i < roadArray.length; i++){
		if(roadArray[i].isCorner) pathNodes.push(roadArray[i]);
	}
	pathNodes.push(roadArray[roadArray.length-1]); //end roadspace is a node
	fabricPathNodes = new Array(pathNodes.length);
};

function applyNumtoRoad()
{
	var roadNum = 1;
	for(var i = 0; i < mapGrid.length; i++)
	{
		if(mapGrid[i][0].type == "road" && mapGrid[i][0].source.indexOf("S"))
		{
			mapGrid[i][0].roadNum = roadNum;
			lookforRoad(i, 0, roadNum,0,1);
			return;
		}
	}
	
};

function lookforRoad(x, y, roadnum, dx, dy)
{
	roadnum++;
	mapGrid[x+dx][y+dy].roadNum = roadnum;
	//console.log((x+dx)+","+(y+dy)+":"+mapGrid[x+dx][y+dy].source +":"+roadnum);
	if(x > 9 || y > 9 || x < 0 || y < 0 || roadnum == roadArray.length) return;
	if(mapGrid[x+dx][y+dy].source.indexOf("Down")>-1) {
		lookforRoad(x+dx,y+dy,roadnum,dx,dy);
	}
	if(mapGrid[x+dx][y+dy].source.indexOf("Side")>-1){
		lookforRoad(x+dx,y+dy,roadnum,dx,dy);
	}
	if(mapGrid[x+dx][y+dy].source.indexOf("NW")>-1){
		if(dx==1) lookforRoad(x+dx,y+dy,roadnum,0,-1);
		if(dy==1) lookforRoad(x+dx,y+dy,roadnum,-1,0);
		//lookforRoad(x+dx,y+dy,roadnum,-1,0);
	}
	if(mapGrid[x+dx][y+dy].source.indexOf("NE")>-1){
		if(dx==-1) lookforRoad(x+dx,y+dy,roadnum,0,-1);
		if(dy==1) lookforRoad(x+dx,y+dy,roadnum,1,0);
		//lookforRoad(x+dx,y+dy,roadnum,1,0);
	}
	if(mapGrid[x+dx][y+dy].source.indexOf("SW")>-1){
		if(dx==1) lookforRoad(x+dx,y+dy,roadnum,0,1);
		if(dy==-1) lookforRoad(x+dx,y+dy,roadnum,-1,0);
		//lookforRoad(x+dx,y+dy,roadnum,0,1);
	}
	if(mapGrid[x+dx][y+dy].source.indexOf("SE")>-1){
		if(dx==-1) lookforRoad(x+dx,y+dy,roadnum,0,1);
		if(dy==-1) lookforRoad(x+dx,y+dy,roadnum,1,0);
		//lookforRoad(x+dx,y+dy,roadnum,0,1);
	}
	// if(x-1 >= 0)
	// {
	// 	if(mapGrid[x-1][y].type == "road" && mapGrid[x-1][y].roadNum == 0)
	// 	{
	// 		roadnum++;
	// 		mapGrid[x-1][y].roadNum = roadnum;
	// 		lookforRoad(x-1, y, roadnum);
	// 	}
	// }
	// if(x+1 <= 9)
	// {
	// 	if(mapGrid[x+1][y].type == "road" && mapGrid[x+1][y].roadNum == 0)
	// 	{
	// 		roadnum++;
	// 		mapGrid[x+1][y].roadNum = roadnum;
	// 		lookforRoad(x+1, y, roadnum);
	// 	}
	// }
	// if(y-1 >= 0)
	// {
	// 	if(mapGrid[x][y-1].type == "road" && mapGrid[x][y-1].roadNum == 0)
	// 	{
	// 		roadnum++;
	// 		mapGrid[x][y-1].roadNum = roadnum;
	// 		lookforRoad(x, y-1, roadnum);
	// 	}
	// }
	// if(y+1 <= 9)
	// {
	// 	if(mapGrid[x][y+1].type == "road" && mapGrid[x][y+1].roadNum == 0)
	// 	{
	// 		roadnum++;
	// 		mapGrid[x][y+1].roadNum = roadnum;
	// 		lookforRoad(x, y+1, roadnum);
	// 	}
	// }
};