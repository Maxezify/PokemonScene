var scene, camera, renderer, color, colors = [];
var clock = new THREE.Clock();
var camControls;

    init();
    animate();

    function init() {

        scene = new Physijs.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.0009 );
        scene.setGravity(new THREE.Vector3( 0, -50, 0 ));

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = -20;
        camera.position.y = 10;
        camControls = new THREE.FirstPersonControls(camera);
        camControls.lookSpeed = 0.1;
        camControls.movementSpeed = 0;
        camControls.noFly = true;
        camControls.lookVertical = true;
        camControls.constrainVertical = true;
        camControls.verticalMin = 1.0;
        camControls.verticalMax = 2.0;
        camControls.lon = -150;
        camControls.lat = 20;

        camera.rotation.y = Math.PI*2;

		
		
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(new THREE.Color('lightblue'), 1)

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, -10, 1).normalize();
        scene.add(directionalLight);

        var spotLight = new THREE.DirectionalLight( 0xffffff );
        spotLight.position.set( 0, 0, 5 );
        spotLight.castShadow = true;
        spotLight.shadowDarkness = 0.5;

         scene.add( spotLight );

        var thespotLight = new THREE.DirectionalLight( 0xffffff );
        spotLight.position.set( 0, 0, -5 );
        thespotLight.castShadow = true;
        thespotLight.shadowDarkness = 0.5;

        scene.add( thespotLight );

        var spotLight2 = new THREE.DirectionalLight( 0xffffff );
        spotLight2.position.set( 0, 5, 0 );
        spotLight2.castShadow = true;
        spotLight2.shadowDarkness = 0.5;


        scene.add( spotLight2 );

        var spotLight3 = new THREE.DirectionalLight( 0xffffff );
        spotLight3.position.set( 5, 0, 0 );
        spotLight3.castShadow = true;
        spotLight3.shadowDarkness = 0.5;

        scene.add( spotLight3 );

        var spotLight4 = new THREE.DirectionalLight( 0xffffff );
        spotLight4.position.set( -5, 0, 0 );
        spotLight4.castShadow = true;
        spotLight4.shadowDarkness = 0.5;

        scene.add( spotLight4 );

        document.body.appendChild( renderer.domElement );

        createArena(0,0,0, 100, 50, 2);
		createCityBlock(-100, -5, 70, 200, 3);
		createCityBlock(-100, -5, -120, 200, 3);
		createCityBlock(-100, -5, -80, 30, 100);
		createCityBlock(100, -5, -80, 30, 100);
		
		var planeMaterial = Physijs.createMaterial(
		new THREE.MeshBasicMaterial({ color: 0x888888 }),
		1, 0.5);
	plane = new Physijs.BoxMesh(
            new THREE.BoxGeometry( 300, 1, 300),
            new THREE.MeshBasicMaterial({ color: 0x888888 }),
			0
        );
		plane.position.y = -5;
		plane.rotation.z = 0;
        plane.receiveShadow = true;
        scene.add(plane);

        geometry = new THREE.Geometry();

                sprite = THREE.ImageUtils.loadTexture( "textures/white.png" );

                for ( i = 0; i < 1000; i ++ ) {

                    var vertex = new THREE.Vector3();
                    vertex.x = 2000 * Math.random() - 1000;
                    vertex.y = 2000 * Math.random() - 1000;
                    vertex.z = 2000 * Math.random() - 1000;

                    geometry.vertices.push( vertex );

                    colors[ i ] = new THREE.Color( 0xffffff );
                    colors[ i ].setHSL( ( vertex.x + 1000 ) / 2000, 1, 0.5 );

                }

                geometry.colors = colors;

                material = new THREE.PointCloudMaterial( { size: 85, map: sprite, vertexColors: THREE.VertexColors, transparent: true } );
                material.color.setHSL( 1.0, 0.2, 0.7 );

                particles = new THREE.PointCloud( geometry, material );
                particles.sortParticles = true;

                scene.add( particles );


    }

    function animate() {

        requestAnimationFrame( animate );

        animatePoke();
        animateVideo()

        var delta = clock.getDelta();
        camControls.update(delta);

        renderer.render( scene, camera );
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;



    }

     window.addEventListener( 'resize', function()
    {
        var w = window.innerWidth,
            h = window.innerHeight;

            camera.aspect = w / h;
            camera.updateProjectionMatrix();

            renderer.setSize( w, h );
        }, false );

