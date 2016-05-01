function initializeHUD() //MAKE MAIN MENU BUTTON
{
    var hudContainer = document.createElement("div");
    var hudId = document.createAttribute("id");
    hudId.value = "HUD_CONTAINER";
    hudContainer.setAttributeNode(hudId);
    
    var hudClass = document.createAttribute("class");
    hudClass.value = "HUD";
    
    moneyCounter = document.createElement("span");
    moneyCounter.setAttributeNode(hudClass);
    
    energyCounter = document.createElement("span");
    energyCounter.setAttributeNode(hudClass.cloneNode(true));
    
    energyRateCounter = document.createElement("span");
    energyRateCounter.setAttributeNode(hudClass.cloneNode(true));
    
    cleanlinessCounter = document.createElement("span");
    cleanlinessCounter.setAttributeNode(hudClass.cloneNode(true));
    
    hudContainer.appendChild(moneyCounter);
    hudContainer.appendChild(energyCounter);
    hudContainer.appendChild(energyRateCounter);
    hudContainer.appendChild(cleanlinessCounter);
    
    var gameScreenClass = document.createAttribute("class");
    gameScreenClass.value = "gameScreen";
    hudContainer.setAttributeNode(gameScreenClass);
    
    var contentContainer = document.getElementById("container");
    
    contentContainer.appendChild(hudContainer);
    
    displayHUD();
}

function displayHUD()
{
	moneyCounter.innerHTML = "<span class = 'bold'>Money:</span> $" + PLAYER.money;
	energyCounter.innerHTML = "<span class = 'bold'>Energy:</span> " + PLAYER.energy + " units";
	energyRateCounter.innerHTML = "<span class = 'bold'>Energy Rate:</span> " + PLAYER.energyRate*2 + " units/second";
	cleanlinessCounter.innerHTML = "<span class = 'bold'>Connectivity:</span> " + PLAYER.cleanliness + "%";
}

function updateStatsMenu(tower, upgrade)
{
    if((tower instanceof ProductionTower == false || tower instanceof OffensiveTower == false) && tower != undefined)
    {
        upgradeMenu.style.display = 'initial';
        
        if(tower instanceof defensiveTowerInfo)
        {
            tower.source="offensive";
            tower.sell = parseInt(tower.cost);
        }
        else if(tower instanceof productionTowerInfo)
        {
            tower.source="production";
            tower.sell = parseInt(tower.cost);
            tower.rate *= 0.5;
        }
        $('.production').addClass('disabled');
        $('.offensive').addClass('disabled');
    }
    else if(tower == undefined)
    {
        $('.production').removeClass('disabled');
        $('.offensive').removeClass('disabled');
        toggleMenu();
        return;
    }
    
    if(upgrade == undefined)
    {
        $('#sellPrice').html(Math.ceil(tower.sell));
        if(tower.source.indexOf("offensive") > -1)
        {
            $('.offensive').removeClass('disabled');
            $('#production').html('N/A');
            $('#dmg').html(tower.damage);
            $('#range').html(tower.range);
            $('#consumption').html(tower.efficiency);
            
            $('#rate').html(((15/16)*tower.rate).toFixed(2));
        }
        else
        {
            $('.production').removeClass('disabled');
            $('#dmg').html('N/A');
    		$('#range').html('N/A');
    		$('#rate').html('N/A');
    		$('#consumption').html('N/A');
            $('#production').html(tower.rate*2);
        }
    }
    else
    {
        $('#sellPrice').html( parseInt(tower.cost*0.25));
        if(upgrade == "damage")
        {
            $('#dmg').html(tower.damage + "+" + Math.ceil(tower.damage*0.15));
            $('.offensive').removeClass('disabled');
        }
        else if(upgrade == "fireRate")
        {
            $('#rate').html(((15/16)*tower.rate).toFixed(2) + "+" + ((15/16)*Math.ceil(tower.rate*0.10)).toFixed(2));
            $('.offensive').removeClass('disabled');
        }
        else if(upgrade == "range")
        {
            $('#range').html(tower.range + "+" + tileWidth*0.25);
            $('.offensive').removeClass('disabled');
        }
        else if(upgrade == "production")
        {
            
            $('#production').html(tower.rate*2 + "+" + tower.rate*0.5);
            $('.production').removeClass('disabled');
        }
    }
}
