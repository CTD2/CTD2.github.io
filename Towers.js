/*global infoS1 infoBox getTower displayHUD OffensiveTower ProductionTower  spawnTower addToQueue vehicleCount PLAYER preLoad InsertTower tower1 OffensiveTower cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles City updateRoad STARTING_ENERGY STARTING_MONEY initializeHUD PLAYER gameScreen mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/

//IMPORTANT CONVERSIONS!!!!
// Sprinkler = FM Radio
// Fire Hydrant = Satellite Dish
// Water Tower = Wifi
// Geyser = AM Radio


//UPGRADE TYPES
function upgradeDamage()
{
  var obj = canvas.getActiveObject();
  var index = towerObjs.indexOf(obj);
	var tower = PLAYER.towerArray[index];
  if(tower.source.indexOf("offensive") >= 0 && PLAYER.money >= parseInt(tower.cost*.25) && tower.upgrades < 3)
  {
    PLAYER.money -= parseInt(tower.cost*0.25);
    tower.cost += parseInt(tower.cost*0.25);
    //maybe increase energy consumption
    tower.damage += Math.ceil(tower.damage*0.15);
    tower.sell += parseInt(tower.sell*0.2);
    displayHUD();
    console.log("Tower Damage Upgraded: "+ tower.damage);
    tower.upgrades++ ;
    updateStatsMenu(tower);
  }
  else if(tower.upgrades >= 3)
    alertUser("Maximum Upgrades Reached!")
    else if(PLAYER.money < parseInt(tower.cost*.25))
      alertUser("Insufficient Funds!");
      else
        alertUser("Invalid Upgrade!");
}

function upgradeFireRate()
{
  var obj = canvas.getActiveObject();
  var index = towerObjs.indexOf(obj);
	var tower = PLAYER.towerArray[index];
  if(tower.source.indexOf("offensive") >= 0 && PLAYER.money >= parseInt(tower.cost*.25) && tower.upgrades < 3)
  {
    PLAYER.money -= parseInt(tower.cost*0.25);
    tower.cost += parseInt(tower.cost*0.25);
    //maybe increase energy consumption
    tower.rate += Math.ceil(tower.damage*0.10);
    tower.sell += parseInt(tower.sell*0.2);
    displayHUD();
    console.log("Tower Rate Upgraded: "+ tower.rate);
    tower.upgrades++ ;
    updateStatsMenu(tower);
  }
  else if(tower.upgrades >= 3)
    alertUser("Maximum Upgrades Reached!")
    else if(PLAYER.money < parseInt(tower.cost*.25))
      alertUser("Insufficient Funds!");
      else
        alertUser("Invalid Upgrade!");
}

function upgradeProduction()
{
  var obj = canvas.getActiveObject();
  var index = towerObjs.indexOf(obj);
	var tower = PLAYER.towerArray[index];
  if(tower.source.indexOf("production") >= 0 && PLAYER.money >= parseInt(tower.cost*.25) && tower.upgrades < 3)
  {
    PLAYER.money -= parseInt(tower.cost*0.25);
    tower.cost += parseInt(tower.cost*0.25);
    //maybe increase energy consumption
    PLAYER.energyRate += tower.rate*0.5;
    tower.rate += tower.rate*0.5;
    tower.sell += parseInt(tower.sell*0.2);
    displayHUD();
    console.log("Tower Production Rate Upgraded: "+ tower.rate);
    tower.upgrades++ ;
    updateStatsMenu(tower);
  }
  else if(tower.upgrades >= 3)
    alertUser("Maximum Upgrades Reached!")
    else if(PLAYER.money < parseInt(tower.cost*.25))
      alertUser("Insufficient Funds!");
      else
        alertUser("Invalid Upgrade!");
}

function upgradeRange(x, y)
{
  var obj = canvas.getActiveObject();
  var index = towerObjs.indexOf(obj);
	var tower = PLAYER.towerArray[index];
  if(tower.source.indexOf("offensive") >= 0 && PLAYER.money >= parseInt(tower.cost*.25) && tower.upgrades < 3)
  {
    PLAYER.money -= parseInt(tower.cost*0.25);
    tower.cost += parseInt(tower.cost*0.25);
    //maybe increase energy consumption
    tower.range += tileWidth*0.25;
    tower.sell += parseInt(tower.sell*0.2);
    displayHUD();
    console.log("Tower Range Upgraded: "+ tower.range);
    tower.upgrades++ ;
    updateStatsMenu(tower);
  }
  else if(tower.upgrades >= 3)
    alertUser("Maximum Upgrades Reached!")
    else if(PLAYER.money < parseInt(tower.cost*.25))
      alertUser("Insufficient Funds!");
      else
        alertUser("Invalid Upgrade!");
}

//PRODUCTION TOWERS
//ProductionTower(rate, cost, sell, coordX, coordY, type, terrainType)

function makeHydroPower(x, y)
{
  var hydro = new ProductionTower(2.5, 2000, selectedXIdx, selectedYIdx, "hydro", "water");
  if(mapGrid[selectedXIdx][selectedYIdx].type == "water" && PLAYER.money >= parseInt(hydro.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    PLAYER.energyRate += hydro.rate;
    spawnTower(hydro);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= hydro.cost;
    displayHUD();
    updateStatsMenu(hydro);
  }
  else if(PLAYER.money < parseInt(hydro.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeSolarPower(x, y)
{
  var solar = new ProductionTower(1.5, 1750, selectedXIdx, selectedYIdx, "solar", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(solar.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    PLAYER.energyRate += solar.rate;
    spawnTower(solar);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= solar.cost;
    displayHUD();
    updateStatsMenu(solar);
  }
  else if(PLAYER.money < parseInt(solar.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeOilPower(x, y)
{
  var oil = new ProductionTower(7.5, 4500, selectedXIdx, selectedYIdx, "oil", "oil") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "oil" && PLAYER.money >= parseInt(oil.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    PLAYER.energyRate += oil.rate;
    spawnTower(oil);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= oil.cost;
    displayHUD();
    updateStatsMenu(oil);
  }
  else if(PLAYER.money < parseInt(oil.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeNuclearPower(x, y)
{
  var nuclear = new ProductionTower(15, 8500, selectedXIdx, selectedYIdx, "nuclear", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(nuclear.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    PLAYER.energyRate += nuclear.rate;
    spawnTower(nuclear);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= nuclear.cost;
    displayHUD();
    updateStatsMenu(nuclear);
  }
  else if(PLAYER.money < parseInt(nuclear.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}

//DEFENSIVE TOWERS
//ref: (cost, range, damage, rate, efficiency, coordX, coordY, type, terrainType)
function makeSprinklerOne()
{
  var sprinkler = new OffensiveTower(200, tileWidth*1.5, 5, 4, 1, selectedXIdx, selectedYIdx, "sprinklerI", "grass");
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(sprinkler.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(sprinkler);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= sprinkler.cost;
    displayHUD();
    updateStatsMenu(sprinkler);
  }
  else if(PLAYER.money < parseInt(sprinkler.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  //shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeWaterTowerOne()
{
  var waterTower = new OffensiveTower(700, tileWidth*1.5, 20, 3, 3, selectedXIdx, selectedYIdx, "waterTowerI", "grass");
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(waterTower.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(waterTower);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= waterTower.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(waterTower.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeFireHydrantOne()
{
  var fireHydrant = new OffensiveTower(1400, tileWidth*3.5, 50, 2, 8, selectedXIdx, selectedYIdx, "fireHydrantI", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(fireHydrant.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(fireHydrant);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= fireHydrant.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(fireHydrant.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeMechGeyserOne()
{
  var geyser = new OffensiveTower(2200, tileWidth*2.5, 100, 1, 15, selectedXIdx, selectedYIdx, "geyserI", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(geyser.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(geyser);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= geyser.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(geyser.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}

//MAKE STATS BETTER
function makeSprinklerTwo()
{
  var sprinkler = new OffensiveTower(375, tileWidth*1.5, 10, 4, 2, selectedXIdx, selectedYIdx, "sprinklerII", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(sprinkler.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(sprinkler);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= sprinkler.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(sprinkler.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeWaterTowerTwo()
{
  var waterTower = new OffensiveTower(1350, tileWidth*1.5, 35, 3, 4, selectedXIdx, selectedYIdx, "waterTowerII", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(waterTower.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(waterTower);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= waterTower.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(waterTower.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeFireHydrantTwo()
{
  var fireHydrant = new OffensiveTower(2600, tileWidth*3.5, 90, 2, 17, selectedXIdx, selectedYIdx, "fireHydrantII", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(fireHydrant.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(fireHydrant);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= fireHydrant.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(fireHydrant.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeMechGeyserTwo()
{
  var geyser = new OffensiveTower(2400, tileWidth*3.5, 175, 1, 29, selectedXIdx, selectedYIdx, "geyserII", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(geyser.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(geyser);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= geyser.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(geyser.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}

//MAKE STATS EVEN BETTER
function makeSprinklerThree()
{
  var sprinkler = new OffensiveTower(700, tileWidth*1.5, 15, 4, 2, selectedXIdx, selectedYIdx, "sprinklerIII", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(sprinkler.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(sprinkler);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= sprinkler.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(sprinkler.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeWaterTowerThree()
{
  var waterTower = new OffensiveTower(2600, tileWidth*1.5, 65, 3, 8, selectedXIdx, selectedYIdx, "waterTowerIII", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(waterTower.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(waterTower);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= waterTower.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(waterTower.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeFireHydrantThree(x, y)
{
  var fireHydrant = new OffensiveTower(4000, tileWidth*3.5, 160, 2, 29, selectedXIdx, selectedYIdx, "fireHydrantIII", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(fireHydrant.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(fireHydrant);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= fireHydrant.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(fireHydrant.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeMechGeyserThree(x, y)
{
  var geyser = new OffensiveTower(5000, tileWidth*2.5, 350, 1, 55, selectedXIdx, selectedYIdx, "geyserIII", "grass") ;
  if(mapGrid[selectedXIdx][selectedYIdx].type == "grass" && PLAYER.money >= parseInt(geyser.cost) && !mapGrid[selectedXIdx][selectedYIdx].containsTower)
  {
    spawnTower(geyser);
    mapGrid[selectedXIdx][selectedYIdx].containsTower = true;
    PLAYER.money -= geyser.cost;
    displayHUD();
  }
  else if(PLAYER.money < parseInt(geyser.cost)){
      alertUser("Insufficient Funds!");
  }
  else if(mapGrid[selectedXIdx][selectedYIdx].containsTower){
      alertUser("You already have a tower here!");
  }
  else {
      alertUser("Invalid tower placement");
  }
  // shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
//(cost, terrain, range, damage, efficiency)
infoS1 = new defensiveTowerInfo(200, "grass", 1, 5, 1) ;
infoS2 = new defensiveTowerInfo(375, "grass", 1, 10, 2) ;
infoS3 = new defensiveTowerInfo(700, "grass", 1, 15, 3) ;
infoF1 = new defensiveTowerInfo(1400, "grass", 3, 50, 8) ;
infoF2 = new defensiveTowerInfo(2600, "grass", 3, 90, 17) ;
infoF3 = new defensiveTowerInfo(4000, "grass", 3, 160, 29) ;
infoW1 = new defensiveTowerInfo(700, "grass", 1, 20, 3) ;
infoW2 = new defensiveTowerInfo(1350, "grass", 1, 35, 4) ;
infoW3 = new defensiveTowerInfo(2600, "grass", 1, 65, 8) ;
infoG1 = new defensiveTowerInfo(1200, "grass", 2, 100, 15) ;
infoG2 = new defensiveTowerInfo(2400, "grass", 2, 175, 29) ;
infoG3 = new defensiveTowerInfo(5000, "grass", 2, 300, 55) ;


//(cost, terrain, rate)
infoHY = new productionTowerInfo(2000, "water", 5) ;
infoOI = new productionTowerInfo(4500, "oil", 15) ;
infoSO = new productionTowerInfo(1750, "grass", 3) ;
infoNU = new productionTowerInfo(8500, "grass", 30) ;


//NO MORE THIS CRAP
//cost, range, damage, rate, efficiency, coordX, coordY, type, terrainType
//rate, cost, coordX, coordY, type, terrainType
// infoS1 = new defensiveTowerInfo(200, 1, 5, 2, 1, null, null, "sprinklerI", "grass") ;
// infoS2 = new defensiveTowerInfo(375, 1, 10, 2, 2, null, null, "sprinklerII", "grass") ;
// infoS3 = new defensiveTowerInfo(700, 1, 15, 2, 3, null, null, "sprinklerIII", "grass") ;
// infoF1 = new defensiveTowerInfo(1400, 3, 50, 4, 8, null, null, "fireHydrantI", "grass") ;
// infoF2 = new defensiveTowerInfo(2600, 3, 90, 4, 17, null, null, "fireHydrantII", "grass") ;
// infoF3 = new defensiveTowerInfo(4000, 3, 160, 4, 29, null, null, "fireHydrantIII", "grass") ;
// infoW1 = new defensiveTowerInfo(700, 1, 20, 3, 3, null, null, "waterTowerI", "grass") ;
// infoW2 = new defensiveTowerInfo(1350, 1, 35, 3, 4, null, null, "waterTowerII", "grass") ;
// infoW3 = new defensiveTowerInfo(2600, 1, 65, 3, 8, null, null, "waterTowerIII", "grass") ;
// infoG1 = new defensiveTowerInfo(1200, 2, 100, 1, 15, null, null, "geyserI", "grass") ;
// infoG2 = new defensiveTowerInfo(2400, 2, 175, 1, 29, null, null, "geyserII", "grass") ;
// infoG3 = new defensiveTowerInfo(5000, 2, 350, 1, 55, null, null, "geyserIII", "grass") ;
// infoHY = new productionTowerInfo(5, 800, null, null, "hydro", "water") ;
// infoOI = new productionTowerInfo(15, 2000, null, null, "oil", "oil") ;
// infoSO = new productionTowerInfo(3, 700, null, null, "solar", "grass") ;
// infoNU = new productionTowerInfo(30, 3500, null, null, "nuclear", "grass") ;

//infoBox = document.getElementById("infoBox") ;
function hoverTowerInfo(tower)
{
  var info = "Cost: " + tower.cost + "</br>"
  + "Requires Terrain: " + tower.terrainType + "</br>"
  + "Sell Price: " + tower.sell + "</br>" ;
  if(tower.source.indexOf("offensive") >= 0)
  {
    info += "Range: " + tower.range + "</br>"
    + "Damage: " + tower.damage + "</br>"
    + "Energy Usage: " + tower.efficiency ;
  }
  else
  {
    info += "Energy Production: " + tower.rate ;
    if(tower.source.indexOf("oil") >= 0)
    {
      info += "</br>" + "Cleanliness Penalty: 5" ;
    }
  }
  //Have info be diplayed in whatever element I choose as a tooltip
  //infoBox.innerHTML = info ;
  //infoBox.style.display = "block" ;
}
function hoverSellInfo(x, y)
{
  var index = getTower(x, y) ;
  var tower = PLAYER.towerArray[index] ;
  var info = "Sell For: " + tower.sell ;
  //Have info be diplayed in whatever element I choose as a tooltip
  //infoBox.innerHTML = info ;
  //infoBox.style.display = "block" ;
}
function hoverUpgradeInfo(x, y, type)
{
  var index = getTower(x, y) ;
  var tower = PLAYER.towerArray[index] ;
  var cost ;
  var damage ;
  // var fireRate ;
  var range ;
  var production ;
  var upgrade ;
  if(tower != null)
  {
    if(type == "damage")
    {
      cost = parseInt(tower.cost*.25) ;
      damage = parseInt(towert.damage*.15)
      upgrade = "Damage Increase: " + damage ;
    }
    // if(type == "fireRate")
    // {
    //   cost = parseInt(tower.cost*.2) ;
    //   fireRate = parseInt(tower.rate*.15) ;
    //   upgrade = "Firing Rate Increase: " + fireRate ;
    // }
    if(type = "range")
    {
      cost = parseInt(tower.cost*.65) ;
      range = 1 ;
      upgrade = "Range Increase: " + range ;
    }
    if(type = "production")
    {
      cost = parseInt(tower.cost*.75) ;
      production = parseInt(tower.damage*.5) ;
      upgrade = "Production Increase: " + production ;
    }
    var info = "Upgrade Cost: " + cost + "</br>" + upgrade ;
    //Have info be diplayed in whatever element I choose as a tooltip
    //infoBox.innerHTML = info ;
    //infoBox.style.display = "block" ;
  }
}


//Sprinkler
//Water Tower
//Fire Hydrant
//Mechanical Geyser