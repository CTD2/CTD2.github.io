/*global Scoordx Scoordy makeGarbageTruck makeTruck makeSUV makeSportsCar makeSmartCar makeMotorcycle makeBike checkVehicles PLAYER preLoad cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles gameScreen xPos yPos makeTerrainGrid mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/

//IMPORTANT CONVERSIONS!!!!
//Dirty = not connected (to network)
//Clean = connected (to network)

//Vehicles(hp, type, gains, loss, coordX, coordY, cityObject/*, vehicleNum*/)
function makeBike()
{
  return new Vehicles(30, "bike", 50, 1, Scoordx, Scoordy, PLAYER) ;
}
function makeMotorcycle()
{
  return new Vehicles(100, "motorcycle", 100, 2, Scoordx, Scoordy, PLAYER) ;
}
function makeSmartCar()
{
  return new Vehicles(250, "smartCar", 200, 5, Scoordx, Scoordy, PLAYER) ;
}
function makeSportsCar()
{
  return new Vehicles(600, "sportsCar", 300, 10, Scoordx, Scoordy, PLAYER) ;
}
function makeSUV()
{
  return new Vehicles(1500, "SUV", 400, 20, Scoordx, Scoordy, PLAYER) ;
}
function makeTruck()
{
  return new Vehicles(3500, "truck", 500, 40, Scoordx, Scoordy, PLAYER) ;
}
function makeGarbageTruck()
{
  return new Vehicles(10000, "garbageTruck", 1000, 50, Scoordx, Scoordy, PLAYER) ;
}