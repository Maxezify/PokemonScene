
 
window.onkeydown = function(event){
	
	var keyPressed = event.keyCode;
	
	
	
	
	if (keyPressed == 32 && power < maxPower)	// On incremente une variable "Power" qui définira la puissance du lancerd de la pokeball
	{
		power += 10;
		document.getElementById("powerBar").style.width = (power*getPowerUnity)+"px";
	}
	
}

window.onkeyup = function(event){
	
	var keyUp = event.keyCode;
	
	
	
	if (keyUp == 32)	// On créé la pokeball en lui assignant une impulsion en fonction de power
	{
		var pokeball = new Pokeball (camera.position.x,camera.position.y,camera.position.z,power,0);
		pokeballTable.push(pokeball);
		
		power = 0;
		document.getElementById("powerBar").style.width = "0px";
		//on remet power à 0
	}
	
}