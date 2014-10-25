/*
<script src="js/shaders/CopyShader.js"></script>

<script src="js/postprocessing/EffectComposer.js"></script>
<script src="js/postprocessing/RenderPass.js"></script>
<script src="js/postprocessing/MaskPass.js"></script>
<script src="js/postprocessing/ShaderPass.js"></script>

animateVideo()


*/

var video = document.getElementById( 'video' );
var textureVideo = new THREE.Texture( video );

var videoMaterial;

function animateVideo()
{
	if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
		if ( textureVideo )
		{
			textureVideo.needsUpdate = true;
		}
	}
}

function createArena(x,y,z,width, length, height){
		
		var map = THREE.ImageUtils.loadTexture("textures/metal.png");
		map.wrapS = map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 16;
		var map2 = THREE.ImageUtils.loadTexture("textures/arenaGround.png");
		map2.wrapS = map2.wrapT = THREE.RepeatWrapping;
		map2.anisotropy = 16;
		var map3 = THREE.ImageUtils.loadTexture("textures/wood.png");
		map3.wrapS = map3.wrapT = THREE.RepeatWrapping;
		map3.anisotropy = 16;
		
		var widthWallGeometry = new THREE.BoxGeometry(width+height, height, height);
		var material = new THREE.MeshLambertMaterial({ambient : 0xbbbbbb, map : map3, side: THREE.DoubleSide});
		var leftWallMesh	 = new Physijs.BoxMesh( widthWallGeometry, material, 0);
		leftWallMesh.rotation.y = Math.PI/2;
        leftWallMesh.position.x = length/2+x;
		leftWallMesh.position.z = z;
		leftWallMesh.position.y = y;
		scene.add(leftWallMesh);
		

		var rightWallMesh	 = new Physijs.BoxMesh(widthWallGeometry, material, 0);
		rightWallMesh.rotation.y = Math.PI/2;
        rightWallMesh.position.x = -1*(length/2)+x;
		rightWallMesh.position.z = z;
		rightWallMesh.position.y = y;
		scene.add(rightWallMesh);
		
		var lengthWallGeometry = new THREE.BoxGeometry(length-height, height, height);
		var frontWallMesh	 = new Physijs.BoxMesh( lengthWallGeometry, material, 0);
		frontWallMesh.rotation.y = 0;
        frontWallMesh.position.x = x;
		frontWallMesh.position.z = -1*(width/2);
		frontWallMesh.position.y = y;
		scene.add(frontWallMesh);
		
		var frontWallMesh	 = new Physijs.BoxMesh( lengthWallGeometry, material, 0);
		frontWallMesh.rotation.y = 0;
        frontWallMesh.position.x = x;
		frontWallMesh.position.z = width/2;
		frontWallMesh.position.y = y;
		scene.add(frontWallMesh);

		var groundGeometry = new THREE.BoxGeometry(length, 0.5, width);
		var material2 = new THREE.MeshLambertMaterial({ambient : 0xbbbbbb, map : map2, side: THREE.DoubleSide},1,1);
		var groundMaterial = Physijs.createMaterial(material2, 1, 0);
		var groundMesh	 = new Physijs.BoxMesh( groundGeometry, groundMaterial, 0);
		groundMesh.rotation.y = 0;
        groundMesh.position.x = x;
		groundMesh.position.z = z;
		groundMesh.position.y = z-1*(height/2);
		scene.add(groundMesh);
		
		////// instanciation pile de blocs////////
		var decalY = y;
		var decalXLine = x - 20;
		var decalXColumn = 0;
		var blockScale = 2;
		var baseBlockCount = 12;
		for(j=baseBlockCount; j>=0; j--) // chaque étage
		{
			decalY += blockScale;
			decalXColumn += blockScale/2;
			decalXLine = x -(baseBlockCount/2*blockScale);
			for(i=0; i<=j; i++)
			{
				var blockGeometry = new THREE.BoxGeometry(blockScale, blockScale, blockScale);
				var material2 = new THREE.MeshLambertMaterial({ambient : 0xbbbbbb, map : map, side: THREE.DoubleSide});
				var blockMaterial = Physijs.createMaterial(material2, 1, 0);
				var blockMesh	 = new Physijs.BoxMesh( blockGeometry, blockMaterial, 1);

				
				blockMesh.position.x = decalXLine + decalXColumn;
				blockMesh.position.z = z+width/3;
				blockMesh.position.y = decalY;
				decalXLine+= blockScale;
				blockMesh.castShadow = true;
				blockMesh.receiveShadow = true;
				scene.add(blockMesh);
			}
		}
		///////// Instanciation ecran \\\\\\\\\\\\\\\\\\\\\\\\/
		var ecranWidth = length/2;
		var ecranHeight = ecranWidth/2;
		
		var ecranVerticalGeometry = new THREE.BoxGeometry(height, ecranHeight, height);
		var ecranHorizontalGeometry = new THREE.BoxGeometry(ecranWidth+height, height, height);
		var ecranMaterial = new THREE.MeshLambertMaterial({ambient : 0xbbbbbb, map : map3, side: THREE.DoubleSide});
		
		var ecranLeftMesh	 = new Physijs.BoxMesh( ecranVerticalGeometry, ecranMaterial, 0);
		ecranLeftMesh.position.x = x-ecranWidth/2;
		ecranLeftMesh.position.y = y+ecranHeight/2+height/2;
		ecranLeftMesh.position.z = z+width/2;
		scene.add(ecranLeftMesh);
		
		var ecranRightMesh	 = new Physijs.BoxMesh( ecranVerticalGeometry, ecranMaterial, 0);
		ecranRightMesh.position.x = x+ecranWidth/2;
		ecranRightMesh.position.y = y+ecranHeight/2+height/2;
		ecranRightMesh.position.z = z+width/2;
		scene.add(ecranRightMesh);
		
		var ecranTopMesh	 = new Physijs.BoxMesh( ecranHorizontalGeometry, ecranMaterial, 0);
		ecranTopMesh.position.x = x;
		ecranTopMesh.position.y = y+ecranHeight+height;
		ecranTopMesh.position.z = z+width/2;
		scene.add(ecranTopMesh);
		
	////// Creation video texture /////////////////////	
	var parameters = { color: 0xffffff, map: textureVideo },
     material_base = new THREE.MeshLambertMaterial( parameters );
	videoMaterial = new THREE.MeshLambertMaterial( parameters );
	
	var ecranVideoGeometry = new THREE.BoxGeometry(ecranWidth-height, ecranHeight, height/2);
	var ecranVideoMesh	 = new Physijs.BoxMesh( ecranVideoGeometry, videoMaterial, 0);
		ecranVideoMesh.position.x = x;
		ecranVideoMesh.position.y = y+ecranHeight/2+height/2;
		ecranVideoMesh.position.z = z+width/2;
		scene.add(ecranVideoMesh);


}