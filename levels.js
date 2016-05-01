var level = 0;
// movementArray = [];
var vehicleQueue;
  
function addToQueue(vehicleCount, vehicleType) //repurposing this as a function that just adds the vehicles to a queue that will be iterated in the main interval
{
  vehicleQueue.addVehicleSet(vehicleCount, vehicleType);
}

//dictates what vehicles spawn on what levels
function levelRun()
{ 
  // var bike = makeBike() ;
  // var motorcycle = makeMotorcycle() ;
  // var smartCar = makeSmartCar() ;
  // var sportsCar = makeSportsCar() ;
  // var makeSUV = makemakeSUV() ;
  // var makeTruck = makemakeTruck() ;
  // var garbagemakeTruck = makeGarbagemakeTruck() ;
  
  level++ ;
  
  vehicleQueue = new queuedVehicles();
  
  if(level == 1)
  {
    addToQueue(12, makeBike) ;
  }
  if(level == 2)
  {
    addToQueue(15, makeBike) ;
    addToQueue(1, makeMotorcycle) ;
  }
  if(level == 3)
  {
    addToQueue(5, makeBike) ;
    addToQueue(5, makeMotorcycle) ;
  }
  if(level == 4)
  {
    addToQueue(5, makeBike) ;
    addToQueue(10, makeMotorcycle) ;
  }
  if(level == 5)
  {
    addToQueue(5, makeBike) ;
    addToQueue(5, makeMotorcycle) ;
    addToQueue(1, makeSmartCar) ;
  }
  if(level == 6)
  {
    addToQueue(5, makeBike) ;
    addToQueue(5, makeMotorcycle) ;
    addToQueue(5, makeSmartCar) ;
  }
  if(level == 7)
  {
    addToQueue(10, makeMotorcycle) ;
    addToQueue(5, makeSmartCar) ;
  }
  if(level == 8)
  {
    addToQueue(10, makeMotorcycle) ;
    addToQueue(10, makeSmartCar) ;
  }
  if(level == 9)
  {
    addToQueue(5, makeMotorcycle) ;
    addToQueue(20, makeSmartCar) ;
  }
  if(level == 10)
  {
    addToQueue(25, makeSmartCar) ;
  }
  if(level == 11)
  {
    addToQueue(20, makeSmartCar) ;
    addToQueue(1, makeSportsCar) ;
  }
  if(level == 12)
  {
    addToQueue(15, makeSmartCar) ;
    addToQueue(5, makeSportsCar) ;
  }
  if(level == 13)
  {
    addToQueue(10, makeSmartCar) ;
    addToQueue(10, makeSportsCar) ;
  }
  if(level == 14)
  {
    addToQueue(10, makeMotorcycle) ;
    addToQueue(5, makeSmartCar) ;
    addToQueue(15, makeSportsCar) ;
  }
  if(level == 15)
  {
    addToQueue(20, makeSportsCar) ;
  }
  if(level == 16)
  {
    addToQueue(25, makeSportsCar) ;
  }
  if(level == 17)
  {
    addToQueue(10, makeSportsCar) ;
    addToQueue(1, makeSUV) ;
  }
  if(level == 18)
  {
    addToQueue(5, makeSportsCar) ;
    addToQueue(5, makeSUV);
  }
  if(level == 19)
  {
    addToQueue(10, makeSmartCar) ;
    addToQueue(10, makeSUV);
  }
  if(level == 20)
  {
    addToQueue(10, makeSmartCar) ;
    addToQueue(5, makeSportsCar);
    addToQueue(15, makeSUV);
  }
  if(level == 21)
  {
    addToQueue(5, makeSmartCar) ;
    addToQueue(10, makeSportsCar);
    addToQueue(15, makeSUV);
  }
  if(level == 22)
  {
    addToQueue(20, makeSUV);
    addToQueue(1, makeTruck);
  }
  if(level == 23)
  {
    addToQueue(20, makeSUV) ;
    addToQueue(5, makeTruck);
  }
  if(level == 24)
  {
    addToQueue(10, makeSportsCar) ;
    addToQueue(5, makeSUV);
    addToQueue(10, makeTruck);
  }
  if(level == 25)
  {
    addToQueue(5, makeBike) ;
    addToQueue(5, makeMotorcycle);
    addToQueue(5, makeSmartCar);
    addToQueue(5, makeSportsCar) ;
    addToQueue(5, makeSUV) ;
    addToQueue(5, makeTruck);
    addToQueue(5, makeGarbageTruck);
  }
  if(level >= 26 )
  {
    var random = Math.random()*(level - 13);
    var random1 = Math.random()*(level - 13);
    var random2 = Math.random()*(level - 13);
    var random3 = Math.random()*(level - 13);
    var random4 = Math.random()*(level - 13);
    var random5 = Math.random()*(level - 13);
    var random6 = Math.random()*(level - 13);

    
    addToQueue(random, makeBike) ;
    addToQueue(random1, makeMotorcycle);
    addToQueue(random2, makeSmartCar);
    addToQueue(random3, makeSportsCar) ;
    addToQueue(random4, makeSUV) ;
    addToQueue(random5, makeTruck);
    addToQueue(random6, makeGarbageTruck);
  }
  //.... garbagemakeTruck will be extremely strong, boss level...
}