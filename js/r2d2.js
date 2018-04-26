var camera, scene, renderer;
var r2d2;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 140;
    camera.position.y = 60;

    scene = new THREE.Scene();

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath('obj/');
    mtlLoader.setPath('obj/');
    mtlLoader.load('r2-d2.mtl', function (materials) {
        materials.preload();
		var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
		objLoader.load('obj/r2-d2.obj', function ( object ) {
				r2d2 = object;
				scene.add( object );
			},
		);
    });

    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
     
    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);
     
    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();
     
    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame(animate);

	r2d2.rotation.y += 0.01;

    renderer.render(scene, camera);
}