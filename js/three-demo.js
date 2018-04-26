var camera, scene, renderer;
var cube, sphere, torusKnot, textureCube, airPlane;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 5;

    scene = new THREE.Scene();

    // Your code here

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame(animate);

    // Your code here

    renderer.render(scene, camera);
}