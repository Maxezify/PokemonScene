function createCityBlock(startX, Y, startZ, widthX, lineNumber)
{
	var maxBuildingWidth = 12;
	var minBuildingWidth = 7;
	var maxBuildingLength = 12;
	var minBuildingLength = 7;
	var maxBuildingHeight = 25;
	var minBuildingHeight = 10;
	var decalZ = startZ;
	var map1 = THREE.ImageUtils.loadTexture("textures/building1.png");
		map1.wrapS = map1.wrapT = THREE.RepeatWrapping;
		//map1.anisotropy = 16;
	var map2 = THREE.ImageUtils.loadTexture("textures/building2.png");
		map2.wrapS = map2.wrapT = THREE.RepeatWrapping;
		//map2.anisotropy = 16;
	var map3 = THREE.ImageUtils.loadTexture("textures/building3.png");
		map3.wrapS = map3.wrapT = THREE.RepeatWrapping;
		//map3.anisotropy = 16;
	var map4 = THREE.ImageUtils.loadTexture("textures/building4.png");
		map4.wrapS = map4.wrapT = THREE.RepeatWrapping;
		//map4.anisotropy = 16;
	var map5 = THREE.ImageUtils.loadTexture("textures/building5.png");
		map5.wrapS = map5.wrapT = THREE.RepeatWrapping;
		//map5.anisotropy = 16;
		
	var textureTable = [map1, map2, map3, map4, map5];
	for(j=0; j < lineNumber; j ++)
	{
		if(j>0)
		{
			decalZ += maxBuildingLength+0.5;
		}
		for(i=0; i<widthX;i++)
		{
			var buildingWidth = Math.floor(Math.random() * maxBuildingWidth) + minBuildingWidth;
			var texture = textureTable[Math.floor(Math.random() * textureTable.length)];
			createBuilding(buildingWidth,i, texture, decalZ);
			i+= buildingWidth;
			
			
			// j'incremente i de cette width
			// j'envoie la fonction qui va creer le batiment avec cette width et son decalage en i + un decalage entre batiment random
		}
	}
	function createBuilding(width, x, texture, z)
	{
		
		
		var spaceBetweenBuildings = Math.random() * 2;
		var buildingLength =  Math.floor(Math.random() * maxBuildingLength) + minBuildingLength;
		var buildingHeight =  Math.floor(Math.random() * maxBuildingHeight) + minBuildingHeight;
		
		var buildingMaterial = new THREE.MeshLambertMaterial({ambient : 0xbbbbbb, map : texture, side: THREE.DoubleSide});
		
		var buildingGeometry = new THREE.BoxGeometry(width, buildingHeight , buildingLength);
		var buildingMesh	= new Physijs.BoxMesh( buildingGeometry, buildingMaterial, 0);
		
        buildingMesh.position.x = width/2+startX+spaceBetweenBuildings+x;
		buildingMesh.position.z = z;
		buildingMesh.position.y = Y+(buildingHeight/2);
		buildingMesh.receiveShadow = true;
		buildingMesh.castshadow = true;
		
		scene.add(buildingMesh);
		
	}


}