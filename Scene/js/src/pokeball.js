/*

<script src="js/pokeball.js"></script>

<div id="powerBackground" style="border: 2px solid rgb(250,250,250); width: 300px; height: 50px; border-radius: 8px; position: absolute; top: 70px; margin-left:auto;margin-right:auto;"></div>
<div id="powerBar" style="border :2px solid rgb(250,250,250); width: 0px; height: 50px; border-radius: 8px; position: absolute; top: 70px; margin-left:auto;margin-right:auto; background-color:rgb(60,200,20);"></div>

<script src="js/physi.js"></script>
<script src="js/physijs_worker.js"></script>
<script src="js/event.js"></script>
<script src="js/ammo.js"></script>



la camera DOIT s'appeler "camera" lors de l'init dans le main

		scene = new Physijs.Scene();
		scene.setGravity(new THREE.Vector3( 0, -50, 0 ));



		animatePoke(); dans animate
*/

var pokeballTable = [];
var power = 0;
var maxPower = 600;
var getPowerUnity = parseInt(document.getElementById("powerBackground").style.width)/(maxPower);
var material2;
var map;


Physijs.scripts.worker = 'js/physijs_worker.js'
Physijs.scripts.ammo = 'ammo.js';


function animatePoke(){

	scene.simulate();

	for(i=0;i<pokeballTable.length; i++)
	{
		pokeballTable[i].update();
	}
}


var Pokeball = function(popX, popY, popZ, power, selectedPokemon)
{
	
	/*var map = THREE.ImageUtils.loadTexture('textures/tibo.png');
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;*/
	//material2	= new THREE.MeshLambertMaterial({ambient : 0xbbbbbb, map : map, side: THREE.DoubleSide});
	this.popX = popX;
	this.popY = popY;
	this.popZ = popZ;
	this.containedPokemon = selectedPokemon;
	this.friction = 1;
	this.restitution = 0.5;
	
	this.touchedGround = false;
	map = THREE.ImageUtils.loadTexture('textures/pokeballTexture.png');
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	material2	= new THREE.MeshLambertMaterial({ambient : 0xbbbbbb, map : map, side: THREE.DoubleSide});
	this.material = Physijs.createMaterial(material2, this.friction, this.restitution);
	
	/*var pokeFriction = 1;
	var pokeRestitution = 0.5;*/
	//var pokematerial = Physijs.createMaterial(new THREE.MeshNormalMaterial(), pokeFriction, pokeRestitution);
		//var geometry = new THREE.SphereGeometry( 5, 5, 5);
		//loader.load( "models/pokeball.js", function( geometry ) {
		 /*material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("textures/tibo.png") });*/

		this.pokeballObj = new Physijs.SphereMesh(new THREE.SphereGeometry(1, 50, 50), material2,10);
        this.pokeballObj.scale.set( 1, 1, 1 );
        this.pokeballObj.position.x = popX;
		this.pokeballObj.position.y = popY;
		this.pokeballObj.position.z = popZ;
		this.pokeballObj.rotation.x = 0;
		this.pokeballObj.rotation.y = 0;
		this.pokeballObj.rotation.z = 0;
		scene.add(this.pokeballObj);
		//pokeballTable.push(this.pokeballObj);
       
		
		var rotation_matrix = new THREE.Matrix4().extractRotation(this.pokeballObj.matrix);
		
		var pLocal = new THREE.Vector3( 0, 0.2, -1 );
		var pWorld = pLocal.applyMatrix4( camera.matrixWorld );
		var dir = pWorld.sub( camera.position ).normalize();

		dir.x *= (power * 2); 
		dir.y *= (power * 2); 
		dir.z *= (power * 2); 

		var force_vector = dir.applyMatrix4(rotation_matrix);
		this.pokeballObj.applyCentralImpulse(force_vector);
		this.pokeballObj.addEventListener( 'collision', function( box, relative_velocity, relative_rotation, contact_normal ) {
		if(this.touchedGround == false)
			this.touchedGround = true;
		//});
		
		} );

		
		Pokeball.prototype.update = function(){
			if(this.touchedGround == true)
			{
				
				map = new THREE.ImageUtils.loadTexture('textures/white.png');
				material3	= new THREE.MeshLambertMaterial({ color: 'white' });
				console.log(touchedGround)

				// si je veux faire rotater la pokeball, je dois utiliser une matrice de rotation
				
			}

		}
	
	
}