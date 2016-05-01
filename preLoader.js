/*global player preLoad cleanImages images dirtyImages updateBoard SPEEDVH numRoadEnd numVehicles moneyCounter energyCounter energyRateCounter cleanlinessCounter player gameScreen mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/
//preLoad All Images Here
//Call onLoad in html file
function preLoad()
{
			var images = new Array()
			function preload() {
				for (var i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image() ;
					images[i].src = preload.arguments[i] ;
				}
			}
			preload(
				"clean/smartCar.png",
				"clean/sportsCar.png",
				"clean/SUV.png",
				"clean/truck.png",
				"clean/bike.png",
				"clean/motorcycle.png",
				"clean/garbageTruck.png",
				"dirty/smartCar.png",
				"dirty/sportsCar.png",
				"dirty/SUV.png",
				"dirty/truck.png",
				"dirty/bike.png",
				"dirty/motorcycle.png",
				"dirty/garbageTruck.png",
				"terrain/grass.png",
				"terrain/oil.png",
				"terrain/water.png",
				"terrain/roadDown.png",
				"terrain/roadSide.png",
				"terrain/roadNE.png",
				"terrain/roadNW.png",
				"terrain/roadSE.png",
				"terrain/roadSW.png"
			) ;

} 