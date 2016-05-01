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
    tower.rate++;
    towerObjs[index].fireRate=Math.ceil(64/tower.rate);
    towerObjs[index].frameDelay = 0;
    
    tower.sell += parseInt(tower.sell*0.2);
    displayHUD();
    console.log("Tower Rate Upgraded: "+ tower.rate + ", Front-end fire rate: " + towerObjs[index].fireRate);
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
}

//DEFENSIVE TOWERS
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
}

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
}

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
}