var uniforms	= {
				time	: { type: "f", value: 1.0 },
			}

var vertexShader	= document.getElementById('vertexShader')
var fragmentShader	= document.getElementById('fragmentShader')
var datMaterial = new THREE.ShaderMaterial( {
	uniforms	: uniforms,
	vertexShader	: vertexShader.textContent,
	fragmentShader	: fragmentShader.textContent
});

var line = [];

var NumberOfLine = 0;

var lineCount = 25;

initBolt();

function initBolt() {

	for (var i = 0; i<lineCount; i++) 
	{
		line.push(lightning());
	}
}

function lightning()
	{
		var a = Math.random()*2;
		var b = Math.random()*(3-a)+a;
		var c = Math.random()*(5-b)+b;
		var d = Math.random()*(6-c)+c;
		var e = Math.random()*(8-d)+d;

		var a2 = Math.random();
		var b2 = Math.random();
		var c2 = Math.random();
		var d2 = Math.random();
		var e2 = Math.random();
		var f2 = Math.random();
		var g2 = Math.random();


		var LineGeometry = new THREE.Geometry();
		LineGeometry.vertices.push(new THREE.Vector3(-4, a2, 0));
		LineGeometry.vertices.push(new THREE.Vector3(a-4, b2, 0));
		LineGeometry.vertices.push(new THREE.Vector3(b-4, c2, 0));
		LineGeometry.vertices.push(new THREE.Vector3(c-4, d2, 0));
		LineGeometry.vertices.push(new THREE.Vector3(d-4, e2, 0));
		LineGeometry.vertices.push(new THREE.Vector3(e-4, f2, 0));
		LineGeometry.vertices.push(new THREE.Vector3(4, g2+0.1, 0));
		LineGeometry.vertices.push(new THREE.Vector3(e-4, f2+0.1, 0));
		LineGeometry.vertices.push(new THREE.Vector3(d-4, e2+0.1, 0));
		LineGeometry.vertices.push(new THREE.Vector3(c-4, d2+0.1, 0));
		LineGeometry.vertices.push(new THREE.Vector3(b-4, c2+0.1, 0));
		LineGeometry.vertices.push(new THREE.Vector3(a-4, b2+0.1, 0));

		LineGeometry.faces.push(new THREE.Face3(0,1,11));
		LineGeometry.faces.push(new THREE.Face3(1,2,11));
		LineGeometry.faces.push(new THREE.Face3(2,10,11));
		LineGeometry.faces.push(new THREE.Face3(2,3,10));
		LineGeometry.faces.push(new THREE.Face3(3,9,10));
		LineGeometry.faces.push(new THREE.Face3(3,4,9));
		LineGeometry.faces.push(new THREE.Face3(4,8,9));
		LineGeometry.faces.push(new THREE.Face3(4,5,8));
		LineGeometry.faces.push(new THREE.Face3(5,7,8));
		LineGeometry.faces.push(new THREE.Face3(5,6,7));

		return (new THREE.Mesh(LineGeometry, datMaterial));
	}

function animateBolt(mesh) {

	for (var i = 0; i<line.length; i++) 
	{
		scene.remove(line[i]);
		line[i] = lightning();
		scene.add(line[i])

		line[i].position.x = mesh.position.x;
		line[i].position.y = mesh.position.y;	
		line[i].rotation.z+=i/2;			
	}

}