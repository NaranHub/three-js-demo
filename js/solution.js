var camera, scene, renderer;
var cube, sphere, torusKnot, textureCube, airPlane;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 5;

    scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial();
    //var material = new THREE.MeshLambertMaterial({color:0xFFBA00});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    geometry = new THREE.SphereGeometry(1, 10, 10);
    // material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    material = new THREE.MeshLambertMaterial({color:0xFF0000, wireframe: true});
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = 2;
    scene.add(sphere);
    
    geometry = new THREE.TorusKnotGeometry(0.5, 0.2);
	material = new THREE.MeshStandardMaterial({color: 0xf4a460});
	torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.position.x = -2;
	scene.add(torusKnot);
    
    geometry = new THREE.BoxGeometry(5, 1, 1);
    var loader = new THREE.TextureLoader();
	var texture = loader.load('obj/pavement.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 3, 1 );
        texture.needsUpdate = true;
        
        material = new THREE.MeshBasicMaterial({map: texture});
        textureCube = new THREE.Mesh(geometry, material);
        textureCube.position.y = -2;
        scene.add(textureCube);
    });
    
    var loader = new THREE.OBJLoader();
    loader.load(
        'obj/airplane.obj',

        // called when resource is loaded
        function ( object ) {
            object.scale.set(0.1,0.1,0.1);
            object.position.y = 2;
            airPlane = object;
            scene.add( object );
        },

        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },

        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );

    const pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.z = 5;
	scene.add(pointLight);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;

	sphere.rotation.x += 0.01;

	torusKnot.rotation.x += 0.01;
	torusKnot.rotation.y += 0.01;
	torusKnot.rotation.z += 0.01;

    textureCube.rotation.x += 0.005;
    
    airPlane.rotation.y += 0.01;

    renderer.render(scene, camera);
}