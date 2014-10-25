/*


<script type="text/javascript" src="js/ShaderParticleEmitter.js"></script>
<script type="text/javascript" src="js/ShaderParticleGroup.js"></script>



*/

var stats, stats2, clock;

var emitter;

var particleGroup;

initFire();

function initFire() {

	stats = new Stats();
    clock = new THREE.Clock();
}

function initParticles(pos,sizeOfFB) {
	    particleGroup = new ShaderParticleGroup({
		    texture: THREE.ImageUtils.loadTexture('textures/smokeparticle.png'),
		    maxAge: 3,
		    blending: THREE.AdditiveBlending
	    });



	    emitter = new ShaderParticleEmitter({
		    type: 'sphere',
		    position: pos,
		    radius: 0.004,
		    radiusScale: sizeOfFB,
		    speed: 20,
		    speedSpread: 10,
		    colorStart: new THREE.Color('yellow'),
		    colorEnd: new THREE.Color('red'),
		    opacityStart: 0.1,
		    opacityEnd: 1,
		    size: 50,
		    sizeEnd: 125,
		    particlesPerSecond: 600
	    });

	    particleGroup.addEmitter( emitter );
	    scene.add( particleGroup.mesh );
	}

function animateFire() {

	render( clock.getDelta() );
    stats.update();

    function render( dt ) {

        particleGroup.tick( dt );
    }

}